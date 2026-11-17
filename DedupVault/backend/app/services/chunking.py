
import hashlib
from pathlib import Path
from typing import Iterator


# Default chunk size: 1 MB
DEFAULT_CHUNK_SIZE = 1024 * 1024


def calculate_chunk_hash(chunk_data: bytes) -> str:
    """
    Generate a SHA-256 hash for a chunk of data.
    """

    return hashlib.sha256(chunk_data).hexdigest()


def read_file_chunks(
    file_path: str | Path,
    chunk_size: int = DEFAULT_CHUNK_SIZE,
) -> Iterator[dict]:
    """
    Read a file in fixed-size chunks.

    Yields each chunk's:
    - position
    - data
    - SHA-256 hash
    - size
    """

    if chunk_size <= 0:
        raise ValueError("Chunk size must be greater than zero.")

    file_path = Path(file_path)

    if not file_path.is_file():
        raise FileNotFoundError(f"File not found: {file_path}")

    with file_path.open("rb") as file:
        position = 0

        while True:
            chunk_data = file.read(chunk_size)

            if not chunk_data:
                break

            yield {
                "position": position,
                "data": chunk_data,
                "hash": calculate_chunk_hash(chunk_data),
                "size": len(chunk_data),
            }

            position += 1
