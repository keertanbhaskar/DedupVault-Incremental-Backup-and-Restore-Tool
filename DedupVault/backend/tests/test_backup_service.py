
import hashlib

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.database import Base
from app.models.user import User
from app.models.backup import Backup
from app.models.snapshot import Snapshot
from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.activity_log import ActivityLog

from app.services import backup_service, storage
from app.services.chunking import DEFAULT_CHUNK_SIZE

# Pytest decorator used to create reusable setup functions for tests
@pytest.fixture
def db_session():
    """Create an isolated in-memory SQLite database for each test."""

    test_engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    TestingSessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=test_engine,
    )

    Base.metadata.create_all(bind=test_engine)

    db = TestingSessionLocal()

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=test_engine)
        test_engine.dispose()


@pytest.fixture
def test_snapshot(db_session):
    """Create a user, backup and snapshot for testing."""

    user = User(
        full_name="Backup Test User",
        email="backup-test@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    backup = Backup(
        user_id=user.id,
        name="Test Backup",
        backup_type="full",
        status="completed",
    )

    db_session.add(backup)
    db_session.flush()

    snapshot = Snapshot(
        backup_id=backup.id,
        name="Test Snapshot",
        snapshot_type="full",
    )

    db_session.add(snapshot)
    db_session.flush()

    return snapshot


@pytest.fixture
def temporary_chunk_storage(tmp_path, monkeypatch):
    """Keep physical chunks inside pytest's temporary directory."""

    chunk_directory = tmp_path / "chunks"

    monkeypatch.setattr(
        storage,
        "STORAGE_ROOT",
        chunk_directory,
    )

    return chunk_directory


def test_process_file_creates_manifest_and_chunk(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
):
    content = b"DedupVault backup service test"

    source_file = tmp_path / "report.txt"
    source_file.write_bytes(content)

    file_manifest = backup_service.process_file_for_snapshot(
        db=db_session,
        snapshot_id=test_snapshot.id,
        file_path=source_file,
        relative_path="documents/report.txt",
    )

    db_session.commit()

    assert file_manifest.relative_path == "documents/report.txt"
    assert file_manifest.file_size == len(content)
    assert file_manifest.file_hash == hashlib.sha256(content).hexdigest()

    chunks = db_session.query(Chunk).all()
    entries = db_session.query(ManifestEntry).all()

    assert len(chunks) == 1
    assert len(entries) == 1

    assert chunks[0].chunk_hash == hashlib.sha256(content).hexdigest()
    assert chunks[0].reference_count == 1

    assert entries[0].file_manifest_id == file_manifest.id
    assert entries[0].chunk_id == chunks[0].id
    assert entries[0].position == 0


def test_duplicate_chunks_are_stored_only_once(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
):
    one_chunk = b"A" * DEFAULT_CHUNK_SIZE
    content = one_chunk + one_chunk

    source_file = tmp_path / "duplicate.txt"
    source_file.write_bytes(content)

    file_manifest = backup_service.process_file_for_snapshot(
        db=db_session,
        snapshot_id=test_snapshot.id,
        file_path=source_file,
        relative_path="documents/duplicate.txt",
    )

    db_session.commit()

    chunks = db_session.query(Chunk).all()
    entries = (
        db_session.query(ManifestEntry)
        .filter(ManifestEntry.file_manifest_id == file_manifest.id)
        .order_by(ManifestEntry.position)
        .all()
    )

    assert len(chunks) == 1
    assert len(entries) == 2

    assert entries[0].position == 0
    assert entries[1].position == 1

    assert entries[0].chunk_id == entries[1].chunk_id
    assert chunks[0].reference_count == 2


def test_file_hash_is_calculated_correctly(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
):
    content = b"Verify the complete file hash."

    source_file = tmp_path / "hash-test.txt"
    source_file.write_bytes(content)

    file_manifest = backup_service.process_file_for_snapshot(
        db=db_session,
        snapshot_id=test_snapshot.id,
        file_path=source_file,
        relative_path="hash-test.txt",
    )

    expected_hash = hashlib.sha256(content).hexdigest()

    assert file_manifest.file_hash == expected_hash


def test_empty_file_is_processed_correctly(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
):
    source_file = tmp_path / "empty.txt"
    source_file.write_bytes(b"")

    file_manifest = backup_service.process_file_for_snapshot(
        db=db_session,
        snapshot_id=test_snapshot.id,
        file_path=source_file,
        relative_path="documents/empty.txt",
    )

    assert file_manifest.file_size == 0
    assert file_manifest.file_hash == hashlib.sha256(b"").hexdigest()

    assert db_session.query(Chunk).count() == 0
    assert db_session.query(ManifestEntry).count() == 0


def test_missing_source_file_is_rejected(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
):
    missing_file = tmp_path / "does-not-exist.txt"

    with pytest.raises(FileNotFoundError):
        backup_service.process_file_for_snapshot(
            db=db_session,
            snapshot_id=test_snapshot.id,
            file_path=missing_file,
            relative_path="missing.txt",
        )


@pytest.mark.parametrize(
    "relative_path",
    [
        "../outside.txt",
        "folder/../../outside.txt",
    ],
)
def test_invalid_relative_path_is_rejected(
    db_session,
    test_snapshot,
    tmp_path,
    temporary_chunk_storage,
    relative_path,
):
    source_file = tmp_path / "valid.txt"
    source_file.write_text("Valid content")

    with pytest.raises(ValueError, match="Invalid relative file path"):
        backup_service.process_file_for_snapshot(
            db=db_session,
            snapshot_id=test_snapshot.id,
            file_path=source_file,
            relative_path=relative_path,
        )


def test_missing_snapshot_is_rejected(
    db_session,
    tmp_path,
    temporary_chunk_storage,
):
    source_file = tmp_path / "valid.txt"
    source_file.write_text("Valid content")

    with pytest.raises(ValueError, match="Snapshot not found"):
        backup_service.process_file_for_snapshot(
            db=db_session,
            snapshot_id=999999,
            file_path=source_file,
            relative_path="valid.txt",
        )

def test_create_backup_with_multiple_files(
    db_session,
    tmp_path,
    temporary_chunk_storage,
):
    # Create a test user.
    user = User(
        full_name="Directory Backup User",
        email="directory-backup@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    # Create a source directory.
    source_directory = tmp_path / "source"
    source_directory.mkdir()

    # Create two files.
    file_one = source_directory / "notes.txt"
    file_two = source_directory / "report.txt"

    file_one.write_text("Hello DedupVault!")
    file_two.write_text("This is a backup test.")

    expected_size = (
        file_one.stat().st_size
        + file_two.stat().st_size
    )

    # Execute the directory backup.
    backup = backup_service.create_backup(
        db=db_session,
        user_id=user.id,
        backup_name="Multiple Files Backup",
        source_directory=source_directory,
    )

    # Verify the backup.
    assert backup.id is not None
    assert backup.name == "Multiple Files Backup"
    assert backup.backup_type == "full"
    assert backup.status == "completed"
    assert backup.total_files == 2
    assert backup.total_size == expected_size
    assert backup.completed_at is not None

    # Verify the snapshot.
    snapshot = (
        db_session.query(Snapshot)
        .filter(Snapshot.backup_id == backup.id)
        .first()
    )

    assert snapshot is not None
    assert snapshot.snapshot_type == "full"
    assert snapshot.total_files == 2
    assert snapshot.total_size == expected_size

    # Verify both file manifests.
    manifests = (
        db_session.query(FileManifest)
        .filter(FileManifest.snapshot_id == snapshot.id)
        .all()
    )

    assert len(manifests) == 2

    relative_paths = {
        manifest.relative_path
        for manifest in manifests
    }

    assert relative_paths == {
        "notes.txt",
        "report.txt",
    }

def test_create_backup_with_empty_directory(
    db_session,
    tmp_path,
    temporary_chunk_storage,
):
    # Create a test user.
    user = User(
        full_name="Empty Backup User",
        email="empty-backup@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    # Create an empty source directory.
    source_directory = tmp_path / "empty_source"
    source_directory.mkdir()

    # Create the backup.
    backup = backup_service.create_backup(
        db=db_session,
        user_id=user.id,
        backup_name="Empty Directory Backup",
        source_directory=source_directory,
    )

    # Verify the backup.
    assert backup.id is not None
    assert backup.status == "completed"
    assert backup.total_files == 0
    assert backup.total_size == 0

    # Verify the snapshot.
    snapshot = (
        db_session.query(Snapshot)
        .filter(Snapshot.backup_id == backup.id)
        .first()
    )

    assert snapshot is not None
    assert snapshot.total_files == 0
    assert snapshot.total_size == 0

    # Verify that no file manifests were created.
    assert (
        db_session.query(FileManifest)
        .filter(FileManifest.snapshot_id == snapshot.id)
        .count()
        == 0
    )

def test_create_backup_deduplicates_content_across_files(
    db_session,
    tmp_path,
    temporary_chunk_storage,
):
    # Create a test user.
    user = User(
        full_name="Deduplication Test User",
        email="dedup-backup@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    # Create a source directory.
    source_directory = tmp_path / "duplicate_source"
    source_directory.mkdir()

    # Create two files with identical content.
    content = b"Same content stored only once."

    file_one = source_directory / "file_one.txt"
    file_two = source_directory / "file_two.txt"

    file_one.write_bytes(content)
    file_two.write_bytes(content)

    # Create the backup.
    backup = backup_service.create_backup(
        db=db_session,
        user_id=user.id,
        backup_name="Duplicate Content Backup",
        source_directory=source_directory,
    )

    # Verify both files were processed.
    assert backup.status == "completed"
    assert backup.total_files == 2

    # Verify only one unique chunk record exists.
    chunks = db_session.query(Chunk).all()

    assert len(chunks) == 1

    # Verify both files have their own manifests.
    manifests = (
        db_session.query(FileManifest)
        .filter(FileManifest.snapshot_id == backup.snapshots[0].id)
        .all()
    )

    assert len(manifests) == 2

    # Verify both manifests reference the same chunk.
    entries = db_session.query(ManifestEntry).all()

    assert len(entries) == 2
    assert entries[0].chunk_id == entries[1].chunk_id

    # The shared chunk has two references.
    assert chunks[0].reference_count == 2


def test_create_backup_rejects_missing_directory(
    db_session,
    tmp_path,
):
    # Create a test user.
    user = User(
        full_name="Missing Directory User",
        email="missing-directory@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    # Define a directory that does not exist.
    missing_directory = tmp_path / "does_not_exist"

    # Verify that backup creation rejects it.
    with pytest.raises(
        FileNotFoundError,
        match="Source directory not found",
    ):
        backup_service.create_backup(
            db=db_session,
            user_id=user.id,
            backup_name="Missing Directory Backup",
            source_directory=missing_directory,
        )

    # No backup should have been created.
    assert db_session.query(Backup).count() == 0

def test_create_backup_rejects_file_as_source_directory(
    db_session,
    tmp_path,
):
    # Create a test user.
    user = User(
        full_name="Invalid Source User",
        email="invalid-source@example.com",
        hashed_password="test-password-hash",
    )

    db_session.add(user)
    db_session.flush()

    # Create a file instead of a directory.
    source_file = tmp_path / "not_a_directory.txt"
    source_file.write_text("This is a file.")

    # Verify that backup creation rejects the file.
    with pytest.raises(
        NotADirectoryError,
        match="Source path is not a directory",
    ):
        backup_service.create_backup(
            db=db_session,
            user_id=user.id,
            backup_name="Invalid Source Backup",
            source_directory=source_file,
        )

    # No backup should have been created.
    assert db_session.query(Backup).count() == 0

def test_create_backup_rejects_invalid_user(
    db_session,
    tmp_path,
):
    # Create a valid source directory.
    source_directory = tmp_path / "source"
    source_directory.mkdir()

    # Use a user ID that does not exist.
    invalid_user_id = 99999

    # Verify that backup creation rejects the invalid user.
    with pytest.raises(
        ValueError,
        match="User not found",
    ):
        backup_service.create_backup(
            db=db_session,
            user_id=invalid_user_id,
            backup_name="Invalid User Backup",
            source_directory=source_directory,
        )

    # No backup should have been created.
    assert db_session.query(Backup).count() == 0
