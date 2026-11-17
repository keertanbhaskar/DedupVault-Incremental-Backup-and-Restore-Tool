
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.database import Base

# Import all models
from app.models.user import User
from app.models.backup import Backup
from app.models.snapshot import Snapshot
from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.activity_log import ActivityLog


def test_complete_storage_relationships():

    # Create an isolated in-memory database
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
        # 1. Create a user
        user = User(
            full_name="Test User",
            email="storage-test@example.com",
            hashed_password="test-password-hash",
        )

        db.add(user)
        db.flush()

        # 2. Create a backup
        backup = Backup(
            user_id=user.id,
            name="Documents Backup",
            backup_type="full",
            status="completed",
        )

        db.add(backup)
        db.flush()

        # 3. Create a snapshot
        snapshot = Snapshot(
            backup_id=backup.id,
            name="First Snapshot",
            snapshot_type="full",
        )

        db.add(snapshot)
        db.flush()

        # 4. Create two unique chunks
        chunk1 = Chunk(
            chunk_hash="a" * 64,
            storage_path="chunks/aa/chunk1",
            size=1024,
            reference_count=2,
        )

        chunk2 = Chunk(
            chunk_hash="b" * 64,
            storage_path="chunks/bb/chunk2",
            size=2048,
            reference_count=1,
        )

        db.add_all([chunk1, chunk2])
        db.flush()

        # 5. Create two files
        file1 = FileManifest(
            snapshot_id=snapshot.id,
            relative_path="documents/report.pdf",
            file_size=3072,
            file_hash="c" * 64,
        )

        file2 = FileManifest(
            snapshot_id=snapshot.id,
            relative_path="documents/summary.pdf",
            file_size=1024,
            file_hash="d" * 64,
        )

        db.add_all([file1, file2])
        db.flush()

        # 6. Map files to chunks
        entries = [
            ManifestEntry(
                file_manifest_id=file1.id,
                chunk_id=chunk1.id,
                position=0,
            ),
            ManifestEntry(
                file_manifest_id=file1.id,
                chunk_id=chunk2.id,
                position=1,
            ),
            ManifestEntry(
                file_manifest_id=file2.id,
                chunk_id=chunk1.id,
                position=0,
            ),
        ]

        db.add_all(entries)

        # 7. Record a user activity
        activity = ActivityLog(
            user_id=user.id,
            action="backup_created",
            resource_type="backup",
            resource_id=backup.id,
            description="Created Documents Backup",
        )

        db.add(activity)
        db.commit()

        # Reload records
        db.refresh(user)
        db.refresh(backup)
        db.refresh(snapshot)
        db.refresh(chunk1)
        db.refresh(file1)

        # Verify relationships
        assert len(user.backups) == 1
        assert len(user.activity_logs) == 1

        assert len(backup.snapshots) == 1
        assert len(snapshot.file_manifests) == 2

        assert len(file1.entries) == 2
        assert len(chunk1.manifest_entries) == 2

        assert file1.entries[0].chunk.chunk_hash == "a" * 64

        assert activity.action == "backup_created"

        print("Complete storage relationship test passed!")

    finally:
        db.close()
        Base.metadata.drop_all(bind=test_engine)
        test_engine.dispose()
