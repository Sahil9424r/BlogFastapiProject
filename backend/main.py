from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
import database

from auth import router as AuthRouter
from routers.posts import router as PostRouter
from routers.users import router as UserRouter

app = FastAPI(title="BlogTech")

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include all routers
app.include_router(AuthRouter)
app.include_router(PostRouter)
app.include_router(UserRouter)

@app.get("/")
def root():
    return {"message": "Welcome to BlogTech API"}
