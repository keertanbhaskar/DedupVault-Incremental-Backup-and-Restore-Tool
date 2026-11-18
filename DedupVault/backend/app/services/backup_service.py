
import hashlib
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.orm import Session

from app.models.backup import Backup
from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.snapshot import Snapshot
from app.models.user import User

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
        not relative_path
        or relative_path_obj.is_absolute()
        or ".." in relative_path_obj.parts
        or relative_path_obj == Path(".")
    ):
        raise ValueError("Invalid relative file path.")

    # 3. Find the snapshot.
    snapshot = db.get(Snapshot, snapshot_id)

    if snapshot is None:
        raise ValueError(
            f"Snapshot not found: {snapshot_id}"
        )

    # 4. Prevent duplicate paths in the same snapshot.
    existing_manifest = (
        db.query(FileManifest)
        .filter(
            FileManifest.snapshot_id == snapshot_id,
            FileManifest.relative_path == relative_path,
        )
        .first()
    )

    if existing_manifest is not None:
        raise ValueError(
            f"File already exists in snapshot: {relative_path}"
        )

    # 5. Read file metadata.
    file_stat = file_path.stat()

    modified_at = datetime.fromtimestamp(
        file_stat.st_mtime,
        tz=timezone.utc,
    )

    # 6. Create a file-level hash calculator.
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

    # 7. Split the file and process each chunk.
    for chunk_data in read_file_chunks(file_path):

        chunk_hash = chunk_data["hash"]

        # Store the physical chunk.
        stored_chunk = store_chunk(chunk_data["data"])

        # Update the complete file hash.
        file_hasher.update(chunk_data["data"])

        # 8. Find an existing chunk record.
        chunk_record = (
            db.query(Chunk)
            .filter(Chunk.chunk_hash == chunk_hash)
            .first()
        )

        # 9. Create metadata if the chunk is new.
        if chunk_record is None:
            chunk_record = Chunk(
                chunk_hash=chunk_hash,
                storage_path=stored_chunk["storage_path"],
                size=stored_chunk["size"],
                reference_count=0,
            )

            db.add(chunk_record)
            db.flush()

        # 10. Increase the chunk reference count.
        chunk_record.reference_count += 1

        # 11. Link the chunk to its position in the file.
        manifest_entry = ManifestEntry(
            file_manifest_id=file_manifest.id,
            chunk_id=chunk_record.id,
            position=chunk_data["position"],
        )

        db.add(manifest_entry)

    # 12. Save the complete file hash.
    file_manifest.file_hash = file_hasher.hexdigest()

    db.flush()

    return file_manifest


def create_backup(
    db: Session,
    user_id: int,
    backup_name: str,
    source_directory: str | Path,
) -> Backup:
    """
    Create a full backup of a source directory.

    Steps:
    1. Validate the source directory and user.
    2. Create a backup record.
    3. Create a snapshot.
    4. Discover all files.
    5. Process every file and its chunks.
    6. Update backup statistics.
    7. Mark the backup as completed.
    8. Commit the database transaction.
    """

    source_directory = Path(source_directory)

    # 1. Validate the source directory.
    if not source_directory.exists():
        raise FileNotFoundError(
            f"Source directory not found: {source_directory}"
        )

    if not source_directory.is_dir():
        raise NotADirectoryError(
            f"Source path is not a directory: {source_directory}"
        )

    # 2. Validate the user.
    user = db.get(User, user_id)

    if user is None:
        raise ValueError(
            f"User not found: {user_id}"
        )

    try:
        # 3. Create a new backup record.
        backup = Backup(
            user_id=user_id,
            name=backup_name,
            backup_type="full",
            status="in_progress",
            total_files=0,
            total_size=0,
        )

        db.add(backup)
        db.flush()

        # 4. Create a snapshot for this backup.
        snapshot = Snapshot(
            backup_id=backup.id,
            name=f"{backup_name} - Snapshot 1",
            snapshot_type="full",
            manifest_path=None,
            total_files=0,
            total_size=0,
        )

        db.add(snapshot)
        db.flush()

        # 5. Discover all files inside the source directory.
        files = sorted(
            path
            for path in source_directory.rglob("*")
            if path.is_file()
        )

        total_files = 0
        total_size = 0

        # 6. Process every discovered file.
        for file_path in files:

            relative_path = file_path.relative_to(
                source_directory
            ).as_posix()

            process_file_for_snapshot(
                db=db,
                snapshot_id=snapshot.id,
                file_path=file_path,
                relative_path=relative_path,
            )

            total_files += 1
            total_size += file_path.stat().st_size

        # 7. Update backup statistics.
        backup.total_files = total_files
        backup.total_size = total_size

        snapshot.total_files = total_files
        snapshot.total_size = total_size

        # 8. Mark the backup as completed.
        backup.status = "completed"
        backup.completed_at = datetime.now(timezone.utc)

        # 9. Commit all database changes.
        db.commit()

        db.refresh(backup)

        return backup

    except Exception:
        # Roll back database changes if backup processing fails.
        db.rollback()
        raise
