# 📝 Task Management Web App

A full-stack **Task Management Application** built with **Next.js, MongoDB, and JWT Authentication**.  
This app allows users to **sign up, log in, and manage their personal tasks** securely with features like search, filter, and pagination.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login with **email + password**.
- Passwords hashed securely with **bcrypt**.
- Authentication handled using **JWT**.
- Users can only access their own tasks.

### ✅ Task Management (CRUD)
- Create, view, update, and delete tasks.
- Each task includes:
  - `title`
  - `description`
  - `status` (**pending** / **done**)
  - `createdAt`
- Only the creator of a task can update or delete it.

### 🔎 Search, Filter & Pagination
- Search tasks by **title** or **description**.
- Filter tasks.
- Search and filter work together.
- Pagination .

### 🎨 Frontend
- Built with **Next.js (App Router)**.
- Pages:
  - Login/Register
  - Dashboard (task list)
  - Upload Task Form (create/edit task)
- Clean & minimal UI using **TailwindCSS + Shadcn UI + Hero UI**.
- Proper **loading & error states**.


## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TailwindCSS, Shadcn UI, Hero UI
- **Backend:** Next.js API Routes 
- **Database:** MongoDB Atlas
- **Authentication:** JWT + bcrypt
- **State/Data:** Session
- **Deployment:** Vercel + MongoDB Atlas

---


---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/Oluyemi29/task-management.git
cd taskmanagement


npm install
# or
yarn install

- Create a .env.local file in the root directory and add:
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000


npm run dev
# or
yarn dev
