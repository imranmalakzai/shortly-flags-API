# 🔗 Shortly Flags API

A secure and scalable **URL Shortener Backend API** built with **Node.js, Express, TypeScript, MySQL, Redis, and Zod**.
This project provides authentication, role-based authorization, rate limiting, login protection, and URL shortening core logic.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT Authentication
* Refresh Token System
* Logout & Token Revocation
* Login Attempt Prevention
* Rate Limiting
* Password Update & Account Removal
* Role-Based Access Control (Owner / Admin / User)

### 👤 User Management

* Register & Login Users
* Get Current Profile
* Fetch Users
* Update User Role (Admin)
* Delete Users (Admin / Owner)
* Secure Password Update

### 🔗 URL Shortening

* Create Short URL
* Redirect to Original URL
* Soft Authentication Support
* Admin URL Deletion
* IP Country Detection (GeoIP)

### 🛠️ Developer Features

* Express v5
* TypeScript
* Zod Validation Middleware
* Redis Integration
* MySQL Database
* Environment-based Configuration

---

## 🧱 Tech Stack

**Backend**

* Node.js
* Express.js
* TypeScript

**Database & Storage**

* MySQL
* Redis

**Security**

* JWT
* Bcrypt
* Rate Limiting
* Login Protection

**Validation**

* Zod

**Utilities**

* GeoIP2 (IP Country Detection)

---

## 📁 Project Structure (Simplified)

```
src/
 ├── modules/
 │    ├── user/
 │    └── url/
 ├── middlewares/
 ├── config/
 ├── utils/
 └── server.ts
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/imranmalakzai/shortly-flags-API
cd shortly-flags-API
```

### 2️⃣ Install Dependencies

```
npm install
```

---

## 🔧 Environment Setup

Rename:

```
.env.production.tmp
```

to:

```
.env.production
```

Example variables:

```
PORT=5000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=shortly
REDIS_URL=redis://localhost:6379
```

---

## 🧰 Required Software

Install locally:

* Node.js (v18+ recommended)
* MySQL Server
* Redis Server (Windows supported)

---

## ▶️ Running the Project

### Development

```
npm run dev
```

### Production

```
npm run build
npm start
```

---

## 🌐 API Base URL

```
/api/
```

---

## 📌 Main Endpoints

### 🔐 Auth

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login         |
| POST   | /api/auth/refresh  | Refresh token |
| DELETE | /api/auth/logout   | Logout        |

### 👤 Users

| Method | Endpoint               | Description     |
| ------ | ---------------------- | --------------- |
| GET    | /api/users             | Get all users   |
| GET    | /api/users/:userId     | Get user        |
| GET    | /api/users/me          | Current profile |
| DELETE | /api/users/me          | Delete account  |
| PATCH  | /api/users/me/password | Update password |

### 🛡️ Admin

| Method | Endpoint                 | Description |
| ------ | ------------------------ | ----------- |
| PATCH  | /api/admin/users/:userId | Update role |
| DELETE | /api/admin/users/:userId | Delete user |

### 🔗 URL

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| POST   | /api/           | Create short URL         |
| GET    | /api/:shortCode | Redirect to original URL |
| DELETE | /api/urlId      | Delete URL (Admin)       |

---

## 🔒 Security Measures

* Rate Limiting
* Login Attempt Tracking
* Password Hashing
* Role Authorization Middleware
* Request Validation via Zod
* Secure JWT Authentication

---

## 🧪 Validation

All request bodies are validated using:

```
Zod + Custom Validation Middleware
```

---

## 🤝 Contribution

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Open a Pull Request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Imran Malakzai
Backend Developer

---

