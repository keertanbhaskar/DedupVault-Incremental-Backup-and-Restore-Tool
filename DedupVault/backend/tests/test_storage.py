
import pytest

from app.services import storage


def test_store_new_chunk(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    data = b"DedupVault storage test"

    result = storage.store_chunk(data)

    assert result["already_exists"] is False
    assert result["size"] == len(data)
    assert result["chunk_hash"] == storage.calculate_hash(data)

    stored_file = storage.get_chunk_path(result["chunk_hash"])

    assert stored_file.exists()
    assert stored_file.read_bytes() == data


def test_duplicate_chunk_is_not_stored_again(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    data = b"Same content uploaded twice"

    first_result = storage.store_chunk(data)
    second_result = storage.store_chunk(data)

    assert first_result["chunk_hash"] == second_result["chunk_hash"]
    assert first_result["already_exists"] is False
    assert second_result["already_exists"] is True

    chunk_files = [
        path for path in tmp_path.rglob("*")
        if path.is_file()
    ]

    assert len(chunk_files) == 1


def test_different_chunks_have_different_hashes(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    first_result = storage.store_chunk(b"First chunk")
    second_result = storage.store_chunk(b"Second chunk")

    assert first_result["chunk_hash"] != second_result["chunk_hash"]
    assert first_result["already_exists"] is False
    assert second_result["already_exists"] is False


def test_read_stored_chunk(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    original_data = b"Data that needs to be restored"

    result = storage.store_chunk(original_data)

    restored_data = storage.read_chunk(result["chunk_hash"])

    assert restored_data == original_data


def test_read_missing_chunk_raises_error(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    fake_hash = "a" * 64

    with pytest.raises(FileNotFoundError):
        storage.read_chunk(fake_hash)


def test_corrupted_chunk_is_detected(tmp_path, monkeypatch):
    monkeypatch.setattr(storage, "STORAGE_ROOT", tmp_path)

    original_data = b"Original chunk content"

    result = storage.store_chunk(original_data)

    chunk_path = storage.get_chunk_path(result["chunk_hash"])

    chunk_path.write_bytes(b"Modified chunk content")

    with pytest.raises(RuntimeError, match="integrity verification failed"):
        storage.read_chunk(result["chunk_hash"])


def test_invalid_hash_is_rejected():
    with pytest.raises(ValueError, match="Invalid SHA-256 chunk hash"):
        storage.get_chunk_path("invalid-hash")
