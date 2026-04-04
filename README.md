# Finance Management System - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [What We Built](#what-we-built)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [How Everything Works](#how-everything-works)
5. [API Integration](#api-integration)
6. [Testing the Application](#testing-the-application)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a **Finance Management System** where users can:
- **Login** securely with a username and password
- **Track Income** - Record money coming in from various sources
- **Track Expenses** - Record money going out
- **View Dashboard** - See all their financial records in one place
- **Calculate Balance** - Automatically see total income, total expenses, and current balance

**Tech Stack:**
- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT (JSON Web Tokens)

---

## 💡 What We Built

### **Backend (Server)**
The server handles:
- ✅ User authentication (login)
- ✅ Creating financial records
- ✅ Retrieving user's records
- ✅ Role-based access control

### **Frontend (Client)**
The client provides:
- ✅ Login page
- ✅ Dashboard to manage records
- ✅ Navigation header with user info
- ✅ Automatic logout
- ✅ Protected pages (only logged-in users can access)

---

## 🚀 Step-by-Step Setup

### **Step 1: Prepare Your Computer**

Make sure you have installed:
- **Node.js** (version 14 or higher) - Download from [nodejs.org](https://nodejs.org)
- **MongoDB** running - or using MongoDB Atlas (cloud)
- **VS Code** (optional but recommended)

Verify installations by opening Command Prompt and typing:
```bash
node --version
npm --version
```

---

### **Step 2: Clone/Open the Project**

Navigate to your project folder:
```bash
cd c:\Users\Satish\OneDrive\Desktop\Finance_System
```

You should see two folders:
- `server` - Backend code
- `client` - Frontend code

---

### **Step 3: Setup Backend (Server)**

**3a. Navigate to server folder:**
```bash
cd server
```

**3b. Install dependencies:**
```bash
npm install
```
*This downloads all libraries the backend needs*

**3c. Create environment file (.env):**
Create a file named `.env` in the server folder with:
```
MONGODB_URI=mongodb://localhost:27017/finance_system
JWT_SECRET=your_secret_key_here_change_in_production
PORT=3000
```

**3d. Start the backend:**
```bash
npm start
```

You should see:
```
Server is running on port 3000
DB connected
```

✅ **Backend is now running!**

---

### **Step 4: Setup Frontend (Client)**

Open a **NEW terminal** (keep the other one with backend running).

**4a. Navigate to client folder:**
```bash
cd client
```

**4b. Install dependencies:**
```bash
npm install
```

**4c. Start the frontend:**
```bash
npm run dev
```

You should see:
```
  VITE v... ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

✅ **Frontend is now running!**

---

### **Step 5: Test the Application**

**5a. Open your browser:**
- Go to `http://localhost:5173`

**5b. Sign In with demo credentials:**
- Username: `Admin`
- Password: `admin123`

**5c. You should see the Dashboard with:**
- Income total
- Expense total
- Balance
- Add new record button
- List of all records

---

## 🔍 How Everything Works

### **1. Login Flow**

```
User → Enters Username & Password → Frontend Sends to Backend
                ↓
Backend → Checks Database → Validates Password
                ↓
Creates JWT Token → Sends Back to Frontend
                ↓
Frontend → Stores Token in localStorage → Redirects to Dashboard
```

**Simple Example:**
- You enter: `Admin` / `admin123`
- Backend checks: Is this username in database?
- Backend checks: Does the password match?
- If YES → creates a token like `eyJhbGciOiJIUzI1NiIs...`
- Frontend stores this token
- Frontend now uses this token for API requests

---

### **2. Creating a Record**

```
User → Clicks "Add Record" → Fills Form
            ↓
Frontend → Takes Data → Adds Bearer Token → Sends to Backend
            ↓
Backend → Checks Token → Validates User → Saves to Database
            ↓
Returns New Record → Frontend Display in Table
```

**What Happens:**
1. You fill in: Amount = 100, Type = Income, Category = Salary
2. Frontend adds your token to the request (proof you're logged in)
3. Backend receives request with your token
4. Backend looks up your user ID from token
5. Backend saves record with your user ID
6. Backend sends record back
7. Frontend adds it to the table

---

### **3. Viewing Records**

```
Dashboard Loads → Frontend Sends GET Request with Token
            ↓
Backend → Checks Token → Finds Your User ID → Gets All Your Records
            ↓
Sends All Records → Frontend Displays in Table
```

---

## 🔐 API Integration

### **What is an API?**
An API (Application Programming Interface) is how the frontend talks to the backend.

Think of it like a **waiter in a restaurant**:
- You (frontend) tell waiter your order
- Waiter (API) takes order to kitchen (backend)
- Kitchen prepares food (processes your request)
- Waiter brings food back to you (sends response)

### **Our APIs**

#### **1. Login API**
```
Endpoint: POST http://localhost:3000/api/auth/signin
What it does: Authenticates user and returns token

Send to Backend:
{
  "name": "Admin",
  "password": "admin123"
}

Get from Backend:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "123456...",
  "name": "Admin",
  "email": "admin@gmail.com",
  "role": "admin"
}
```

#### **2. Create Record API**
```
Endpoint: POST http://localhost:3000/api/financial/records
Requires: Bearer token in headers
What it does: Creates a new financial record

Send headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}

Send body:
{
  "amount": 100,
  "type": "income",
  "category": "salary",
  "date": "2024-01-01",
  "notes": "January salary"
}

Get from Backend:
{
  "_id": "123456...",
  "user_id": "654321...",
  "amount": 100,
  "type": "income",
  "category": "salary",
  "date": "2024-01-01",
  "notes": "January salary"
}
```

#### **3. Get Records API**
```
Endpoint: GET http://localhost:3000/api/financial/records
Requires: Bearer token in headers
What it does: Returns all records for logged-in user

Send headers:
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}

Get from Backend:
[
  { "_id": "1", "amount": 100, "type": "income", ... },
  { "_id": "2", "amount": 50, "type": "expense", ... }
]
```

---

## 📁 File Structure Explained

```
Finance_System/
│
├── server/                    # Backend Code
│   ├── models/               # Database schemas
│   │   ├── user.model.js    # User structure
│   │   └── record.model.js  # Financial record structure
│   │
│   ├── routes/              # API endpoints
│   │   ├── auth.route.js    # Login routes
│   │   └── record.route.js  # Record routes
│   │
│   ├── controllers/         # Business logic
│   │   ├── auth.controller.js    # Login logic
│   │   └── record.controller.js  # Record logic
│   │
│   ├── middleware/          # Request handlers
│   │   ├── verifyUser.js    # Check if token is valid
│   │   └── verifyRole.js    # Check if user is admin
│   │
│   ├── index.js             # Main server file (STARTS HERE)
│   ├── package.json         # Dependencies
│   └── .env                 # Secret settings (database, jwt key)
│
└── client/                    # Frontend Code
    ├── src/
    │   ├── components/      # Reusable UI pieces
    │   │   ├── Header.jsx   # Navigation bar
    │   │   ├── Footer.jsx   # Footer
    │   │   └── ProtectedRoute.jsx  # Route guards
    │   │
    │   ├── context/         # State management
    │   │   └── AuthContext.jsx  # Manages login state
    │   │
    │   ├── services/        # API communication
    │   │   └── api.js       # All API calls
    │   │
    │   ├── pages/           # Full pages
    │   │   ├── Home.jsx     # Landing page
    │   │   ├── SignIn.jsx   # Login page
    │   │   ├── Dashboard.jsx # Main app
    │   │   ├── About.jsx    # About page
    │   │   ├── Contact.jsx  # Contact page
    │   │   └── SignUp.jsx   # Signup info
    │   │
    │   ├── App.jsx          # Routes configuration (STARTS HERE)
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Styles
    │
    ├── package.json         # Dependencies
    └── vite.config.js       # Frontend build settings
```

---

## 🧪 Testing the Application

### **Test 1: Can I Login?**
1. Go to `http://localhost:5173`
2. Click Sign In
3. Enter: `Admin` / `admin123`
4. Should redirect to Dashboard

**Expected:** Dashboard loads with "Welcome, Admin"

---

### **Test 2: Can I Add a Record?**
1. On Dashboard, click "Add Record"
2. Fill in:
   - Amount: `500`
   - Type: `Income`
   - Category: `Salary`
   - Date: `Today's date`
   - Notes: `Monthly salary`
3. Click "Create Record"

**Expected:** Record appears in table below

---

### **Test 3: Do Calculations Work?**
1. Add multiple records (income and expense)
2. Check if totals update correctly

**Expected:** 
- Total Income = sum of all income
- Total Expense = sum of all expenses
- Balance = Income - Expense

---

### **Test 4: Can I Logout?**
1. Click on user menu (top right with your name)
2. Click "Sign Out"

**Expected:** Redirect to Home page, login state cleared

---

### **Test 5: Does Authentication Work?**
1. Try to access `/dashboard` directly without logging in
2. Redirect to `/sign-in`

**Expected:** Can't access protected pages without login

---

## 🐛 Troubleshooting

### **Problem: "Cannot connect to backend"**
- ❌ Backend not running
- ✅ Solution: Open terminal in `server` folder and run `npm start`

### **Problem: "Stay on login page after entering credentials"**
- ❌ Wrong username/password
- ✅ Solution: Use `Admin` / `admin123`
- ❌ Database not connected
- ✅ Solution: Check MongoDB is running

### **Problem: "Frontend won't start"**
- ❌ Port 5173 already in use
- ✅ Solution: Kill the process or use different port
```bash
npm run dev -- --port 5174
```

### **Problem: "Records don't show in dashboard"**
- ❌ Token not being sent to backend
- ✅ Solution: Check browser's localStorage has `authToken`
  - Open Dev Tools (F12) → Application → localStorage
  - Should see `authToken` and `user` keys

### **Problem: "CORS Error"**
- ❌ Frontend and backend URLs don't match
- ✅ Solution: In `client/src/services/api.js`, verify:
```javascript
const API_BASE = 'http://localhost:3000/api';
```

### **Problem: "TypeError: Cannot read property 'name' of null"**
- ❌ User context not loading properly
- ✅ Solution: Clear browser localStorage and login again
  - Open Dev Tools → Application → localStorage → Clear All
  - Refresh page and login

---

## 📚 Key Concepts for Freshers

### **1. JWT Token**
A JWT is like a security badge:
- You log in → Server gives you a badge (token)
- You wear the badge → Server knows who you are
- Badge expires → You need to login again
- Don't share your badge → It's secret

### **2. localStorage**
- Browser storage that saves data even after closing
- Used to store login token
- Not secure for very sensitive data
- Gets cleared when user manually clears browser cache

### **3. Protected Routes**
- Some pages can only be accessed by logged-in users
- `<PrivateRoute>` checks if user has a valid token
- If no token → redirects to login page

### **4. API Request Headers**
- `Authorization: Bearer <your-token>` tells server "I'm user X"
- Like showing ID card to security guard
- Without it, server doesn't know who's asking

### **5. API Response Status Codes**
- `200` = Success ✅
- `201` = Created successfully ✅
- `400` = Bad request (wrong data) ❌
- `401` = Unauthorized (need to login) ❌
- `403` = Forbidden (don't have permission) ❌
- `404` = Not found ❌
- `500` = Server error ❌

---

## 🎓 What to Learn Next

1. **Add Edit/Delete Records** - Modify existing records
2. **Export to CSV** - Download financial data
3. **Advanced Filtering** - Filter by date range
4. **Charts & Graphs** - Visualize spending
5. **Email Notifications** - Alert on transactions
6. **Admin Panel** - Manage all users and records
7. **Mobile Responsive** - Works on phones

---

## ✅ Quick Checklist

Before calling the app "working":

- [ ] Backend starts without errors
- [ ] Frontend starts on port 5173
- [ ] Can login with Admin/admin123
- [ ] Dashboard loads after login
- [ ] Can add income record
- [ ] Can add expense record
- [ ] Totals calculate correctly
- [ ] Can logout
- [ ] Cannot access dashboard without login
- [ ] Records persist after refresh

---

## 📞 Need Help?

**Common Issues:**
1. Check console (F12) for error messages
2. Check browser's Network tab for API failures
3. Check terminal for backend errors
4. Check .env file has correct MongoDB URL

**Check These Files:**
- `server/.env` - Database connection
- `client/src/services/api.js` - API base URL
- `server/index.js` - Backend routes
- `client/src/App.jsx` - Frontend routes

---

**Happy Coding! 🚀**
