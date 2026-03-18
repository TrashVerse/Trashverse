from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080
    DATABASE_URL: str = "sqlite:///./trashverse.db"
    FIREBASE_CREDENTIALS_PATH: str = "./firebase-credentials.json"
    RESEND_API_KEY: str = ""
    DEFAULT_FROM_EMAIL: str = "onboarding@resend.dev"
    PASSWORD_RESET_TOKEN_EXPIRE_MINUTES: int = 30
    EMAIL_MODE: str = "development"
    DEV_EMAIL_RECIPIENT: str = "onyewuchiscepter@gmail.com"
    
    class Config:
        env_file = ".env"

settings = Settings()
