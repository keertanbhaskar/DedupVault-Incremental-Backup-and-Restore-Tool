from fastapi import APIRouter

router = APIRouter()

@router.get('/health')
def health_check():
  return {
    "status":"healthy",
    "application":"DedupVault",
    "message":"Backend is running successfully"
  }
