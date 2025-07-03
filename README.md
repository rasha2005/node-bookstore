# 📚 Node Bookstore API

A simple RESTful API for managing books, built with Node.js and Express.  
Supports user authentication with JWT, CRUD operations for books, and file-based storage using JSON files.

---

## 🚀 Features

- 🔐 User registration & login with JWT token
- 📘 CRUD operations for books
- 🔍 Filter books by genre
- 🗂️ File-based storage using `fs` and `users.json` / `books.json`
- ✅ Protected routes for authenticated users
- 🛡️ Access control so users can only update/delete their own books

---

## 🛠️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/your-username/node-bookstore.git
cd node-bookstore
```
2.Install dependencies
```bash
npm install
```
3.Create a .env file
```bash
include --
PORT
JWT_SECRET
```
4.Start the server
```bash
since nodemon is included in the project start the server with--
npm run dev 
```

## 🧪 How to Test Endpoints

🔐 User Authentication
```bash
POST /auth/login
body --
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
response --
{
  "token": "your_jwt_token_here"
}
```

📘 Book Management (Authenticated)
```bash
When testing the book routes, the main step is to add the token received after user login in the headers section:
Key – Authorization
Value – Bearer <your_jwt_token>
```

## ✅ Done!
you're now ready to explore, test, and expand this API 🎉
Happy coding!
