# connects the chunking and the storage


import hashlib
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.snapshot import Snapshot

from app.services.chunking import read_file_chunks
from app.services.storage import store_chunk


def process_file_for_snapshot(
    db: Session,
    snapshot_id: int,
    file_path: str | Path,
    relative_path: str,
) -> FileManifest:
    """
    Process one file and attach its chunks to a snapshot.

    Physical chunks are stored in content-addressed storage.
    Metadata and chunk references are saved in SQLite.

    The caller is responsible for committing the transaction.
    """

    file_path = Path(file_path)

    # 1. Validate the source file.
    if not file_path.is_file():
        raise FileNotFoundError(
            f"File not found: {file_path}"
        )

    # 2. Validate the relative file path.
    relative_path_obj = Path(relative_path)

    if (
        relative_path_obj.is_absolute()
        or ".." in relative_path_obj.parts
    ):
        raise ValueError("Invalid relative file path.")

    # 3. Find the snapshot.
    snapshot = db.get(Snapshot, snapshot_id)

    if snapshot is None:
        raise ValueError(
            f"Snapshot not found: {snapshot_id}"
        )

    # 4. Read file metadata.
    file_stat = file_path.stat()

    modified_at = datetime.fromtimestamp(
        file_stat.st_mtime,
        tz=timezone.utc,
    )

    # 5. Create a file-level hash.
    file_hasher = hashlib.sha256()

    file_manifest = FileManifest(
        snapshot_id=snapshot_id,
        relative_path=relative_path,
        file_size=file_stat.st_size,
        file_hash="",
        modified_at=modified_at,
    )

    db.add(file_manifest)
    db.flush()

    # 6. Split the file and process each chunk.
    for chunk_data in read_file_chunks(file_path):

        chunk_hash = chunk_data["hash"]

        # Store the physical chunk.
        stored_chunk = store_chunk(chunk_data["data"])

        # Update the whole-file hash.
        file_hasher.update(chunk_data["data"])

        # 7. Find an existing chunk record.
        chunk_record = (
            db.query(Chunk)
            .filter(Chunk.chunk_hash == chunk_hash)
            .first()
        )

        # 8. Create metadata if this chunk is new.
        if chunk_record is None:
            chunk_record = Chunk(
                chunk_hash=chunk_hash,
                storage_path=stored_chunk["storage_path"],
                size=stored_chunk["size"],
                reference_count=0,
            )

            db.add(chunk_record)
            db.flush()

        # 9. Increase the reference count.
        chunk_record.reference_count += 1

        # 10. Link this chunk to its position in the file.
        manifest_entry = ManifestEntry(
            file_manifest_id=file_manifest.id,
            chunk_id=chunk_record.id,
            position=chunk_data["position"],
        )

        db.add(manifest_entry)

    # 11. Save the complete file hash.
    file_manifest.file_hash = file_hasher.hexdigest()

    db.flush()

    return file_manifest
