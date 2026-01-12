from jose import JWTError, jwt
# from datetime import datetime, timedelta
from fastapi import HTTPException, status,Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import models
from database import get_db

SECRET_KEY = "BlogtechSecretKey"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_token(user_id: int):
    # {"user_id": user_id} 📌it is the data inside token
    return jwt.encode({"user_id": user_id}, SECRET_KEY, algorithm=ALGORITHM)

# token extract aujtomaticaaly from login as oauth2_scheme  define in login
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id= payload.get("user_id")
        if not user_id :
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
        user=db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
