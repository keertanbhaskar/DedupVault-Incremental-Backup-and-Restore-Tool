
import os

from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

from app.db.database import Base, DATABASE_URL

# Import all models
from app.models.user import User
from app.models.backup import Backup
from app.models.snapshot import Snapshot
from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.activity_log import ActivityLog


config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Use temporary database URL when provided
migration_database_url = os.getenv(
    "DEDUPVAULT_DATABASE_URL",
    DATABASE_URL,
)

config.set_main_option(
    "sqlalchemy.url",
    migration_database_url,
)

# Register all model tables
target_metadata = Base.metadata


def run_migrations_offline():
    url = config.get_main_option("sqlalchemy.url")

    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )

        with context.begin_transaction():
            context.run_migrations()

    connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
