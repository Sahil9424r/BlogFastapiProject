from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, utils
from database import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/", response_model=List[schemas.UserOut])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users
