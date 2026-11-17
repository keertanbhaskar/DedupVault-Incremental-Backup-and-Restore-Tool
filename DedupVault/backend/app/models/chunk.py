
from datetime import datetime, timezone

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column,relationship

from app.db.database import Base


class Chunk(Base):
    __tablename__ = "chunks"

    # Unique database identifier
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # SHA-256 hash identifying the chunk's contents
    chunk_hash: Mapped[str] = mapped_column(
        String(64),
        unique=True,
        index=True,
        nullable=False,
    )

    # Location of the actual chunk file on disk
    storage_path: Mapped[str] = mapped_column(
        Text,
        unique=True,
        nullable=False,
    )

    # Size of the chunk in bytes
    size: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Number of references to this chunk
    reference_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    # Chunk creation timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    # Relationship with Manifest Entries
    manifest_entries = relationship(
        "ManifestEntry",
        back_populates="chunk",
    )

    # Prevent invalid chunk metadata
    __table_args__ = (
        CheckConstraint(
            "size >= 0",
            name="check_chunk_size_non_negative",
        ),
        CheckConstraint(
            "reference_count >= 0",
            name="check_chunk_reference_count_non_negative",
        ),
    )
