from datetime import datetime, timezone

from sqlalchemy import(
  DateTime,
  ForeignKey,
  Integer,
  String,
  Text,
)
from sqlalchemy.orm import Mapped,mapped_column,relationship
from app.db.database import Base

class Snapshot(Base):
  __tablename__='snapshots'

  # unique snapshot identifier
  id:Mapped[int] = mapped_column(
    Integer,
    primary_key=True,
    index=True,
  )

  # backup associated with this snapshot
  backup_id:Mapped[int] = mapped_column(
    ForeignKey('backups.id'),
    nullable=False,
    index=True,
  )

  # snapshot information
  name:Mapped[str] = mapped_column(
    String(150),
    nullable=False,
  )

  snapshot_type:Mapped[str] = mapped_column(
    String(20),
    nullable=False,
  )

  # Manifest location (will be populated by backup engine)
  manifest_path:Mapped[str | None] = mapped_column(
    Text,
    nullable=True,
  )

  # snapshot statistics
  total_files:Mapped[int] = mapped_column(
    Integer,
    default=0,
    nullable=False,
  )

  total_size:Mapped[int] = mapped_column(
    Integer,
    default=0,
    nullable=False,
  )

  # snapshot creation time
  created_at:Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    default=lambda:datetime.now(timezone.utc),
    nullable=False,
  )

  # relationship with backup
  backup = relationship(
    "Backup",
    back_populates='snapshots',
  )

  file_manifests = relationship(
    'FileManifest',
    back_populates='snapshot',
    cascade='all, delete-orphan'
  )
