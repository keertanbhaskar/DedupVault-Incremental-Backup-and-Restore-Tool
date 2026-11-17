
import hashlib

import pytest

from app.services.chunking import (
    calculate_chunk_hash,
    read_file_chunks,
)


def test_calculate_chunk_hash():
    data = b"DedupVault"

    expected_hash = hashlib.sha256(data).hexdigest()

    actual_hash = calculate_chunk_hash(data)

    assert actual_hash == expected_hash


def test_read_file_chunks(tmp_path):
    file_path = tmp_path / "sample.txt"

    file_path.write_bytes(b"ABCDEFGHIJ")

    chunks = list(
        read_file_chunks(file_path, chunk_size=4)
    )

    assert len(chunks) == 3

    assert chunks[0]["data"] == b"ABCD"
    assert chunks[1]["data"] == b"EFGH"
    assert chunks[2]["data"] == b"IJ"

    assert chunks[0]["position"] == 0
    assert chunks[1]["position"] == 1
    assert chunks[2]["position"] == 2

    assert chunks[0]["size"] == 4
    assert chunks[1]["size"] == 4
    assert chunks[2]["size"] == 2


def test_empty_file_returns_no_chunks(tmp_path):
    file_path = tmp_path / "empty.txt"

    file_path.write_bytes(b"")

    chunks = list(read_file_chunks(file_path))

    assert chunks == []


def test_missing_file_raises_error(tmp_path):
    file_path = tmp_path / "missing.txt"

    with pytest.raises(FileNotFoundError):
        list(read_file_chunks(file_path))


def test_invalid_chunk_size_raises_error(tmp_path):
    file_path = tmp_path / "sample.txt"

    file_path.write_bytes(b"DedupVault")

    with pytest.raises(ValueError):
        list(read_file_chunks(file_path, chunk_size=0))
