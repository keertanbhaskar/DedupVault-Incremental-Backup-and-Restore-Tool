
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.db.database import Base
from app.models.user import User
from app.models.backup import Backup


def test_backup_relationship():
    # Create a separate in-memory database for testing
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

    # Create tables in the temporary database
    Base.metadata.create_all(bind=test_engine)

    db = TestingSessionLocal()

    try:
        # Create a test user
        user = User(
            full_name="Test User",
            email="test@example.com",
            hashed_password="test-password-hash",
        )

        db.add(user)
        db.flush()

        # Create two backups belonging to this user
        backup1 = Backup(
            user_id=user.id,
            name="Documents Backup",
            backup_type="full",
            status="completed",
            total_files=10,
            total_size=102400,
        )

        backup2 = Backup(
            user_id=user.id,
            name="Project Backup",
            backup_type="incremental",
            status="pending",
        )

        db.add_all([backup1, backup2])
        db.commit()

        # Reload the user and verify the relationship
        db.refresh(user)

        assert len(user.backups) == 2
        assert backup1.user.id == user.id
        assert backup2.user.id == user.id
        assert backup1.name == "Documents Backup"
        assert backup2.name == "Project Backup"

        print("Backup relationship test passed!")

    finally:
        db.close()
        Base.metadata.drop_all(bind=test_engine)
        test_engine.dispose()
