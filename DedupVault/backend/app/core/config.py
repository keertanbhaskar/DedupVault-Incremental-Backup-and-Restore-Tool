from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "DedupVault"
    APP_VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = True

    # Authentication settings
    SECRET_KEY : str = 'development-only-change-secret'
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES :int = 30

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()