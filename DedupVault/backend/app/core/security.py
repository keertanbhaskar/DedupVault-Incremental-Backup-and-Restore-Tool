
from datetime import datetime, timedelta, timezone

import jwt
from pwdlib import PasswordHash

from app.core.config import settings


# Initialize Argon2 password hashing
password_hash = PasswordHash.recommended()


# Hash a user's password
def hash_password(password: str) -> str:
    return password_hash.hash(password)


# Verify a password against its stored hash
def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    return password_hash.verify(
        plain_password,
        hashed_password,
    )


# Generate JWT access token
def create_access_token(data: dict) -> str:
    payload = data.copy()

    expiration = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload.update({"exp": expiration})

    token = jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

    return token


# Decode and verify JWT access token
def decode_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        return payload

    except jwt.InvalidTokenError:
        return None
