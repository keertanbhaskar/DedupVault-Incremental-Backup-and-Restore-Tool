
from datetime import datetime, timezone

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    # Unique activity identifier
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    # User associated with this activity
    # Nullable because some activities may be system-generated
    user_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    # Type of action performed
    action: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    # Type of resource involved
    resource_type: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    # Identifier of the affected resource
    resource_id: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
    )

    # Description of the activity
    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Activity timestamp
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="activity_logs",
    )
