# BlogFastAPIProject

A full-stack **Blog Application** built using **FastAPI** for the backend.  
This project demonstrates real-world backend development concepts such as **RESTful APIs, authentication, database modeling, CRUD operations, and deployment-ready architecture**.

---

## 🚀 Project Overview

The BlogFastAPIProject allows users to:
- Register and log in securely
- Create, update, delete, and view blog posts
- View posts from multiple users
- Interact with a scalable REST API

The application is designed using **clean architecture**, **modular structure**, and **industry best practices**, making it suitable for production and technical interviews.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** – High-performance Python framework for building REST APIs
- **Python 3.x** – Core programming language
- **Pydantic** – Data validation and request/response schemas
- **SQLAlchemy** – ORM for database operations
- **JWT (JSON Web Tokens)** – Secure authentication and authorization

### Database
- **SQLite / PostgreSQL** (configurable)
- ORM-based relational schema for Users and Blog Posts

### Frontend
- **HTML5, CSS3, JavaScript**
- REST API consumption using JSON

### Tools & Platforms
- **Git & GitHub** – Version control and collaboration
- **Uvicorn** – ASGI server for FastAPI
- **Swagger / OpenAPI** – Interactive API documentation

---
## 🔐 Authentication (JWT)

- User registration with email and password
- Secure password hashing before database storage
- User login with JWT access token generation
- Protected routes accessible only with valid JWT tokens
- Token verification on every authenticated request

This ensures **secure, stateless authentication**.

---

## 🧩 API Features

### User APIs
- User registration
- User login with JWT authentication
- Token validation

### Blog APIs
- Create a blog post
- Update an existing blog post
- Delete a blog post
- Fetch all blog posts
- Fetch blog posts by a specific user

All endpoints follow **RESTful conventions** and return **structured JSON responses**.

---

## 📊 Data Validation & Error Handling

- Request and response validation using **Pydantic**
- Automatic data type checking
- Proper HTTP status codes (200, 201, 400, 401, 404, 500)
- Centralized error and exception handling

---

## 📘 API Documentation

FastAPI provides built-in interactive API documentation:

- **Swagger UI** → `http://localhost:8000/docs`
- **ReDoc** → `http://localhost:8000/redoc`

---

## ▶️ Run Locally
### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil9424r/BlogFastapiProject.git
cd BlogFastapiProject
## 📂 Project Structure
```
---
```text
BlogFastapiProject/
│
├── app/
│   ├── main.py            # FastAPI application entry point
│   ├── models.py          # SQLAlchemy database models
│   ├── schemas.py         # Pydantic schemas
│   ├── database.py        # Database connection and session
│   ├── auth.py            # JWT authentication logic
│   ├── utils.py           # Helper functions
│   └── routers/
│       ├── users.py       # User-related routes
│       └── posts.py       # Blog CRUD routes
│
├── templates/             # HTML templates (if applicable)
├── static/                # CSS and JavaScript files
├── requirements.txt       # Project dependencies
└── README.md              # Documentation
```

