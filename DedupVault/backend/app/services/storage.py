
# content-addressed storage and deduplication

import hashlib
import os

from pathlib import Path


# Project root: DedupVault/
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Physical chunk storage directory
STORAGE_ROOT = PROJECT_ROOT / "storage" / "chunks"


def calculate_hash(data: bytes) -> str:
    """Calculate SHA-256 hash of chunk data."""

    return hashlib.sha256(data).hexdigest()


def get_chunk_path(chunk_hash: str) -> Path:
    """
    Generate a content-addressed storage path.

    Example:
    storage/chunks/ab/cd/abcdef123...
    """

    if (
        len(chunk_hash) != 64
        or any(char not in "0123456789abcdef" for char in chunk_hash)
    ):
        raise ValueError("Invalid SHA-256 chunk hash.")

    return (
        STORAGE_ROOT
        / chunk_hash[:2]
        / chunk_hash[2:4]
        / chunk_hash
    )



def store_chunk(data: bytes) -> dict:
    """
    Store a chunk only if it does not already exist.
    """

    chunk_hash = calculate_hash(data)
    chunk_path = get_chunk_path(chunk_hash)

    chunk_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    # Check whether the chunk already exists.
    if chunk_path.exists():
        existing_data = chunk_path.read_bytes()

        if existing_data != data:
            raise RuntimeError(
                "Hash collision or corrupted chunk detected."
            )

        return {
            "chunk_hash": chunk_hash,
            "storage_path": str(chunk_path),
            "size": len(data),
            "already_exists": True,
        }

    temporary_path = chunk_path.with_name(
        f".{chunk_hash}.{os.getpid()}.tmp"
    )

    # Assume this is a new chunk.
    already_exists = False

    try:
        with temporary_path.open("xb") as file:
            file.write(data)
            file.flush()
            os.fsync(file.fileno())

        try:
            os.link(temporary_path, chunk_path)

        except FileExistsError:
            existing_data = chunk_path.read_bytes()

            if existing_data != data:
                raise RuntimeError(
                    "Hash collision or corrupted chunk detected."
                )

            # Another process stored the same chunk first.
            already_exists = True

        return {
            "chunk_hash": chunk_hash,
            "storage_path": str(chunk_path),
            "size": len(data),
            "already_exists": already_exists,
        }

    finally:
        temporary_path.unlink(missing_ok=True)


def read_chunk(chunk_hash: str) -> bytes:
    """Read a stored chunk using its SHA-256 hash."""

    chunk_path = get_chunk_path(chunk_hash)

    if not chunk_path.is_file():
        raise FileNotFoundError(
            f"Chunk not found: {chunk_hash}"
        )

    data = chunk_path.read_bytes()

    if calculate_hash(data) != chunk_hash:
        raise RuntimeError(
            f"Chunk integrity verification failed: {chunk_hash}"
        )

    return data
