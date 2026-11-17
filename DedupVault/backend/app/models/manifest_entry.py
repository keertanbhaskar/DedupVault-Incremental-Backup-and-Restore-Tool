
from datetime import datetime, timezone

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class ManifestEntry(Base):
    __tablename__ = "manifest_entries"

    # Unique manifest entry identifier
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # File to which this entry belongs
    file_manifest_id: Mapped[int] = mapped_column(
        ForeignKey("file_manifests.id"),
        nullable=False,
        index=True,
    )

    # Chunk referenced by this entry
    chunk_id: Mapped[int] = mapped_column(
        ForeignKey("chunks.id"),
        nullable=False,
        index=True,
    )

    # Position of the chunk within the original file
    position: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Entry creation time
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # Relationships
    file_manifest = relationship(
        "FileManifest",
        back_populates="entries",
    )

    chunk = relationship(
        "Chunk",
        back_populates="manifest_entries",
    )

    # Prevent duplicate positions within one file
    __table_args__ = (
        UniqueConstraint(
            "file_manifest_id",
            "position",
            name="uq_file_manifest_position",
        ),
        CheckConstraint(
            "position >= 0",
            name="check_manifest_position_non_negative",
        ),
    )
