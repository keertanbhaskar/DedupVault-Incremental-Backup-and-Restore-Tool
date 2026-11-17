# authentication schemas for Registration
# user login and token response

from pydantic import BaseModel, EmailStr, Field, ConfigDict

# Registration request
class UserCreate(BaseModel):
  full_name:str = Field(
    min_length=2,
    max_length=100,
  )

  email:EmailStr

  password:str = Field(
    min_length=8,
    max_length=128,
  )

# Login request
class UserLogin(BaseModel):
  email : EmailStr

  password:str=Field(
    min_length=1,
    max_length=128,
  )

# user information returned by the API
class UserResponse(BaseModel):
  model_config = ConfigDict(from_attributes=True)
  id:int
  full_name:str
  email:EmailStr
  is_active : bool


# JWT token response
class TokenResponse(BaseModel):
  access_token : str
  token_type:str='bearer'
  user: UserResponse
