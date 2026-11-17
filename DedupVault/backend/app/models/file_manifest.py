
from datetime import datetime, timezone

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base

# FileManifest tells us which file we're restoring.


class FileManifest(Base):
    __tablename__ = "file_manifests"

    # Unique file manifest identifier
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # Snapshot to which this file belongs
    snapshot_id: Mapped[int] = mapped_column(
        ForeignKey("snapshots.id"),
        nullable=False,
        index=True,
    )

    # Original relative file path
    relative_path: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Original file size in bytes
    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # SHA-256 hash of the complete file
    file_hash: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
    )

    # Original file modification time
    modified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    # Manifest creation time
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationship with Snapshot
    snapshot = relationship(
        "Snapshot",
        back_populates="file_manifests",
    )

    # Relationship with Manifest Entries
    entries = relationship(
        "ManifestEntry",
        back_populates="file_manifest",
        cascade="all, delete-orphan",
    )
    # Prevent duplicate file paths in the same snapshot
    __table_args__ = (
        UniqueConstraint(
            "snapshot_id",
            "relative_path",
            name="uq_snapshot_file_path",
        ),
        CheckConstraint(
            "file_size >= 0",
            name="check_file_size_non_negative",
        ),
    )
