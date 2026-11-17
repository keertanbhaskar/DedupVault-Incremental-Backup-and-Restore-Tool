from datetime import datetime,timezone

from sqlalchemy import(
  DateTime,
  ForeignKey,
  Integer,
  String,
  Text,
)
from sqlalchemy.orm import Mapped,mapped_column,relationship
from app.db.database import Base

class Backup(Base):
  __tablename__ = "backups"

  # primary identifier
  id:Mapped[int] = mapped_column(
    Integer,
    primary_key=True,
    index=True,
  )

  # User who owns this backup
  user_id:Mapped[int] = mapped_column(
    ForeignKey("users.id"),
    nullable=False,
    index=True,
  )

  # Backup information
  name:Mapped[str] = mapped_column(
    String(150),
    nullable=False,
  )

  backup_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

  status: Mapped[str] = mapped_column(
        String(20),
        default="pending",
        nullable=False,
    )

  # backup statistics
  total_files: Mapped[int] = mapped_column(
    Integer,
    default=0,
    nullable=False,
  )

  total_size:Mapped[int] = mapped_column(
    Integer,
    default=0,
    nullable=False
  )

  # Optional error information
  error_message:Mapped[str | None] = mapped_column(
    Text,
    nullable=True
  )

  # Timestamps
  created_at:Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    default=lambda:datetime.now(timezone.utc),
    nullable=True,
  )

  completed_at:Mapped[datetime] = mapped_column(
    DateTime(timezone=True),
    nullable=True,
  )

  # Relationship with User
  user = relationship("User",back_populates='backups')

  # one backup can have multiple snapshots
  snapshots = relationship('Snapshot',back_populates='backup')