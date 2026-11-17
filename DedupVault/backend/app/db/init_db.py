# initializing the database

from app.db.database import Base, engine

# Import models so SQLAlchemy registers their tables
from app.models.user import User
from app.models.backup import Backup
from app.models.snapshot import Snapshot
from app.models.chunk import Chunk
from app.models.file_manifest import FileManifest
from app.models.manifest_entry import ManifestEntry
from app.models.activity_log import ActivityLog


def initialize_database():
  print("Initializing DedupVault database...")
  Base.metadata.create_all(bind=engine)

  print("database tables created successfully")

if __name__ == '__main__':
  initialize_database()