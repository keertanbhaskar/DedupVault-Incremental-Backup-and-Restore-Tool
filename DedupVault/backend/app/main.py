from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.core.config import settings
from app.api.v1.router import router
from app.api.v1.auth import auth_router

app = FastAPI(
  title=settings.APP_NAME,
  version=settings.APP_VERSION,
  description="Incremental Backup and Restore Platform"
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=['http://localhost:5173'],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*']
)

app.include_router(
  router,
  prefix=settings.API_V1_PREFIX,
  tags=['Health']
)

app.include_router(
  auth_router,
  prefix=f"{settings.API_V1_PREFIX}/auth",
  tags=['Authentication']
)

@app.get('/')
def root():
  return {
    "application":"DedupVault",
    "version":settings.APP_VERSION,
    "status":"running"
  }