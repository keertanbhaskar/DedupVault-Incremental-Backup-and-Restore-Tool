from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Get the backend directory
BASE_DIR = Path(__file__).resolve().parents[2]

# SQLite database file
DATABASE_PATH = BASE_DIR / "dedupvault.db"

# Database URL
DATABASE_URL = f"sqlite:///{DATABASE_PATH.as_posix()}"


# create database engine
engine = create_engine(
  DATABASE_URL,
  connect_args={"check_same_thread":False},
)

# create database sessions
SessionLocal = sessionmaker(
  autocommit = False,
  autoflush=False,
  bind=engine,
)

# base class for all database models
class Base(DeclarativeBase):
  pass

# Dependency for database sessions
def get_db():
  db = SessionLocal()

  try:
    yield db
  finally:
    db.close()