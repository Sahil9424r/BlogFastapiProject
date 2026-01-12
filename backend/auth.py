# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# import models,schemas,utils
# from database import get_db
# # to avoid password store in plain text in db taaki user ke password secure rahe
# from werkzeug.security import check_password_hash, generate_password_hash
# from fastapi.security import OAuth2PasswordRequestForm

# router = APIRouter(tags=["Authentication"])

# # response_model=schemas.UserOut this check/validate our function output new_user 
# @router.post("/signup/", response_model=schemas.UserOut)
# def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
# #    chemas.UserCreate validate user input then run function part
#    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
#    if existing_user:
#        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
#    hashed_password = generate_password_hash(user.password)
#    new_user = models.User(username=user.username, email=user.email, password=hashed_password)
#    db.add(new_user)
#    db.commit()
#    db.refresh(new_user)
#    return new_user

# @router.post("/login/")
# def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
#     db_user = db.query(models.User).filter(models.User.email == user.email).first()
#     if not db_user or not check_password_hash(db_user.password, user.password):
#         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
#     token = utils.create_token(db_user.id)
#     return {"access_token": token, "token_type": "bearer", "user":{"id": db_user.id, "username": db_user.username, "email": db_user.email}}
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models, schemas, utils
from database import get_db
from werkzeug.security import check_password_hash, generate_password_hash
# ADD THIS IMPORT
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(tags=["Authentication"])

@router.post("/signup/", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
   existing_user = db.query(models.User).filter(models.User.email == user.email).first()
   if existing_user:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
   hashed_password = generate_password_hash(user.password)
   new_user = models.User(username=user.username, email=user.email, password=hashed_password)
   db.add(new_user)
   db.commit()
   db.refresh(new_user)
   return new_user

@router.post("/login/")
# CHANGE: Use OAuth2PasswordRequestForm = Depends()
def login(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Swagger sends the email in the 'username' field
    db_user = db.query(models.User).filter(models.User.email == user.username).first()
    
    if not db_user or not check_password_hash(db_user.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    token = utils.create_token(db_user.id)
    # Swagger specifically looks for "access_token" and "token_type"
    return {"access_token": token, "token_type": "bearer"}