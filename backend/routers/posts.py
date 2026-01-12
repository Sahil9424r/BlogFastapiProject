from fastapi import Depends, HTTPException, APIRouter, status
from sqlalchemy.orm import Session
from typing import List, Optional
import models, schemas, utils
from database import get_db

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=schemas.PostOut)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), current_user: models.User = Depends(utils.get_current_user)):
    new_post = models.Post(user_id=current_user.id, **post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return schemas.PostOut(
        id=new_post.id, 
        title=new_post.title, 
        content=new_post.content, 
        author=current_user.username, 
        author_id=current_user.id
    )

@router.get("/", response_model=List[schemas.PostOut])
def get_posts(db: Session = Depends(get_db), username: Optional[str] = None):
    query = db.query(models.Post)
    if username:
        query = query.join(models.User).filter(models.User.username == username)
    posts = query.all()
    return [
        schemas.PostOut(
            id=post.id, title=post.title, content=post.content,
            author=post.owner.username,
            author_id=post.owner.id
        ) for post in posts
    ]

@router.put("/{post_id}", response_model=schemas.PostOut)
def update_post(post_id: int, updated_post: schemas.PostCreate, db: Session = Depends(get_db), current_user: models.User = Depends(utils.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    post.title = updated_post.title
    post.content = updated_post.content
    db.commit()
    db.refresh(post)
    return schemas.PostOut(
        id=post.id,
        title=post.title,
        content=post.content,
        author=current_user.username,
        author_id=current_user.id # FIX: Map author_id here
    )

@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(utils.get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted successfully"}