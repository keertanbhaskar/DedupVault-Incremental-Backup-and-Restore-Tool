
"""make snapshot manifest path nullable

Revision ID: 663b1ce0de1c
Revises: d9675abdb7ee
Create Date: 2026-11-17 22:06:00.698071
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "663b1ce0de1c"
down_revision: Union[str, Sequence[str], None] = "d9675abdb7ee"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Make backups.error_message nullable.
    with op.batch_alter_table(
        "backups",
        recreate="always",
    ) as batch_op:
        batch_op.alter_column(
            "error_message",
            existing_type=sa.Text(),
            nullable=True,
        )

    # Make snapshots.manifest_path nullable.
    with op.batch_alter_table(
        "snapshots",
        recreate="always",
    ) as batch_op:
        batch_op.alter_column(
            "manifest_path",
            existing_type=sa.Text(),
            nullable=True,
        )


def downgrade() -> None:
    """Downgrade schema."""

    # Restore snapshots.manifest_path to NOT NULL.
    with op.batch_alter_table(
        "snapshots",
        recreate="always",
    ) as batch_op:
        batch_op.alter_column(
            "manifest_path",
            existing_type=sa.Text(),
            nullable=False,
        )

    # Restore backups.error_message to NOT NULL.
    with op.batch_alter_table(
        "backups",
        recreate="always",
    ) as batch_op:
        batch_op.alter_column(
            "error_message",
            existing_type=sa.Text(),
            nullable=False,
        )
