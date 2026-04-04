# 🔄 Complete Data Flow & Architecture Diagram

## 📊 System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                            │
│                     (http://localhost:5173)                      │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   REACT FRONTEND (Client)               │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │         App.jsx (Main Router)                   │  │   │
│  │  │  ┌─AuthProvider (Context)                      │  │   │
│  │  │  │  ├─ Header Component                        │  │   │
│  │  │  │  ├─ Routes:                                 │  │   │
│  │  │  │  │  ├─ Home (Public)                        │  │   │
│  │  │  │  │  ├─ About (Public)                       │  │   │
│  │  │  │  │  ├─ Contact (Public)                     │  │   │
│  │  │  │  │  ├─ SignIn (Public)                      │  │   │
│  │  │  │  │  ├─ SignUp (Public)                      │  │   │
│  │  │  │  │  └─ Dashboard (Protected ⚠️)             │  │   │
│  │  │  │  └─ Footer Component                        │  │   │
│  │  │  └─                                             │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │    AuthContext (Manages Login State)             │  │   │
│  │  │  ┌────────────────────────────────────────────┐  │  │   │
│  │  │  │ • user (name, email, role, userId)        │  │  │   │
│  │  │  │ • token (JWT from backend)                 │  │  │   │
│  │  │  │ • login() function                         │  │  │   │
│  │  │  │ • logout() function                        │  │  │   │
│  │  │  │ • isAuthenticated() check                  │  │  │   │
│  │  │  │                                            │  │  │   │
│  │  │  │ Stored in: localStorage                    │  │  │   │
│  │  │  │  ├─ Key: authToken (JWT)                   │  │  │   │
│  │  │  │  └─ Key: user (JSON object)                │  │  │   │
│  │  │  └────────────────────────────────────────────┘  │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐  │   │
│  │  │    API Service Layer (api.js)                    │  │   │
│  │  │  ┌────────────────────────────────────────────┐  │  │   │
│  │  │  │ apiCall()                                  │  │  │   │
│  │  │  │  ├─ Takes token from localStorage          │  │  │   │
│  │  │  │  ├─ Adds: Authorization: Bearer <token>   │  │  │   │
│  │  │  │  ├─ Sends request to backend               │  │  │   │
│  │  │  │  └─ Returns: {success, data, error}        │  │  │   │
│  │  │  │                                            │  │  │   │
│  │  │  │ Auth Endpoints:                            │  │  │   │
│  │  │  │  └─ auth.signin(name, password)            │  │  │   │
│  │  │  │                                            │  │  │   │
│  │  │  │ Records Endpoints:                         │  │  │   │
│  │  │  │  ├─ records.create(data)                   │  │  │   │
│  │  │  │  └─ records.list()                         │  │  │   │
│  │  │  │                                            │  │  │   │
│  │  │  │ Users Endpoints:                           │  │  │   │
│  │  │  │  ├─ users.create(userData)                 │  │  │   │
│  │  │  │  ├─ users.getAll()                         │  │  │   │
│  │  │  │  ├─ users.delete(userId)                   │  │  │   │
│  │  │  │  └─ users.update(userId, updates)          │  │  │   │
│  │  │  └────────────────────────────────────────────┘  │  │   │
│  │  └──────────────────────────────────────────────────┘  │   │
│  │                                                          │   │
│  │  ProtectedRoute Component:                             │   │
│  │  └─ PrivateRoute: Checks isAuthenticated()             │   │
│  │  └─ AdminRoute: Checks user.role === 'admin'          │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                               ▲                                  │
│                               │                                  │
│   localStorage                │                                  │
│   ┌──────────────┐           │                                  │
│   │ authToken    │───────────┘                                  │
│   │ user         │                                              │
│   └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
                           ▼
                    HTTP / HTTPS
            API Calls with Bearer Token
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NODE.JS BACKEND (Server)                      │
│               (http://localhost:3000 + /api)                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   Express Routes                        │   │
│  │                                                          │   │
│  │  POST /api/auth/signin                                  │   │
│  │  ├─ LoginData (name, password)                          │   │
│  │  └─ Returns: (token, user info)                         │   │
│  │                                                          │   │
│  │  GET /api/financial/records                             │   │
│  │  ├─ Requires: Bearer token ⚠️                           │   │
│  │  ├─ Header: Authorization                              │   │
│  │  └─ Returns: [records...]                              │   │
│  │                                                          │   │
│  │  POST /api/financial/records                            │   │
│  │  ├─ Requires: Bearer token ⚠️                           │   │
│  │  ├─ Body: {amount, type, category, date, notes}        │   │
│  │  └─ Returns: {created record}                          │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │          Middleware (Runs Before Controller)            │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ verifyUser.js (Authentication Check)            │   │   │
│  │  │  ├─ Extracts token from header                  │   │   │
│  │  │  ├─ Verifies token with JWT_SECRET             │   │   │
│  │  │  ├─ If valid: Decodes → Gets userId            │   │   │
│  │  │  ├─ Attaches to: req.user                       │   │   │
│  │  │  │  {userId, role, ...}                         │   │   │
│  │  │  └─ If invalid: Returns 401 error              │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ verifyRole.js (Authorization Check)             │   │   │
│  │  │  ├─ Checks if user.role in allowedRoles        │   │   │
│  │  │  ├─ If yes: Allows request to continue         │   │   │
│  │  │  └─ If no: Returns 403 error (Forbidden)       │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │     Controllers (Business Logic)                        │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ auth.controller.js                              │   │   │
│  │  │  └─ signin(username, password)                  │   │   │
│  │  │     ├─ Find user in database                    │   │   │
│  │  │     ├─ Compare password with hash               │   │   │
│  │  │     ├─ If match: Create JWT token              │   │   │
│  │  │     ├─ Set: { userId, role } in token          │   │   │
│  │  │     └─ Return: {token, user data}              │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ record.controller.js                            │   │   │
│  │  │  ├─ createRecord(recordData)                    │   │   │
│  │  │  │  ├─ Validate input fields                    │   │   │
│  │  │  │  ├─ Get user_id from: req.user.userId       │   │   │
│  │  │  │  ├─ Create record with user_id              │   │   │
│  │  │  │  └─ Return: {created record}                │   │   │
│  │  │  │                                              │   │   │
│  │  │  └─ getRecords()                               │   │   │
│  │  │     ├─ Get user_id from: req.user.userId       │   │   │
│  │  │     ├─ Query: Find all records for this user    │   │   │
│  │  │     └─ Return: [records...]                    │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          ▼                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │            MongoDB Database                            │   │
│  │                                                          │   │
│  │  Collections:                                          │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ users collection                                │   │   │
│  │  │  ├─ _id: ObjectId                              │   │   │
│  │  │  ├─ name: String                               │   │   │
│  │  │  ├─ email: String                              │   │   │
│  │  │  ├─ password: String (hashed)                  │   │   │
│  │  │  ├─ role: String (admin, analyst, viewer)      │   │   │
│  │  │  └─ status: String (active, inactive)          │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │ financial records collection (records)           │   │   │
│  │  │  ├─ _id: ObjectId                              │   │   │
│  │  │  ├─ user_id: ObjectId (ref to users)           │   │   │
│  │  │  ├─ amount: Number                             │   │   │
│  │  │  ├─ type: String (income, expense)             │   │   │
│  │  │  ├─ category: String                           │   │   │
│  │  │  ├─ date: Date                                 │   │   │
│  │  │  ├─ notes: String                              │   │   │
│  │  │  └─ createdAt: Date (auto)                     │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Request-Response Flow

### **1. LOGIN FLOW**

```
USER LOGS IN
    ↓
SignIn.jsx Form
    ↓
handleSubmit()
    ↓
auth.signin(name, password)  [from api.js]
    ↓
fetch POST /api/auth/signin
    Headers: {'Content-Type': 'application/json'}
    Body: {name: 'Admin', password: 'admin123'}
    ↓
Backend Route: auth.route.js
    ↓
Controller: auth.controller.js → signin()
    │
    ├─ Find user by name
    ├─ Check if password matches (bcrypt)
    └─ If match:
        Create JWT Token: {userId, role}
        Return: {token, userId, name, email, role}
    ↓
Frontend Receives Response
    ↓
AuthContext.login(userData, token)
    ├─ Set user state
    ├─ Save token to localStorage
    └─ Save user to localStorage
    ↓
Navigate to /dashboard
    ↓
SUCCESS ✅
```

---

### **2. LOAD RECORDS FLOW**

```
Dashboard.jsx Mounts
    ↓
useEffect(() => { loadRecords() })
    ↓
records.list()  [from api.js]
    ↓
fetch GET /api/financial/records
    Headers: {'Authorization': 'Bearer <token>'}
    ↓
Backend Route: record.route.js
    ↓
Middleware: verifyUser
    ├─ Extract token from header
    ├─ Verify token with JWT_SECRET
    └─ Decode token → req.user = {userId, role}
    ↓
Middleware: verifyRole(['admin']) 
    ├─ Check if user.role === 'admin'
    └─ Allow to continue
    ↓
Controller: record.controller.js → getRecords()
    │
    ├─ Get userId from req.user.userId
    ├─ Query: FinancialRecord.find({user_id: userId})
    └─ Return: [records...]
    ↓
Frontend Receives Response
    ↓
setRecordsList(result.data)
    ↓
Dashboard re-renders
    ↓
Table displays all records
    ↓
SUCCESS ✅
```

---

### **3. CREATE RECORD FLOW**

```
User Fills Form and Clicks "Create Record"
    ↓
handleSubmit()
    ↓
records.create(formData)  [from api.js]
    ↓
fetch POST /api/financial/records
    Headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <token>'
    }
    Body: {
        amount: 1000,
        type: 'income',
        category: 'salary',
        date: '2024-01-01',
        notes: 'Monthly salary'
    }
    ↓
Backend Route: record.route.js
    ↓
Middleware: verifyUser → Validates token
    ↓
Middleware: verifyRole(['admin']) → Checks permission
    ↓
Controller: record.controller.js → createRecord()
    │
    ├─ Extract data from request body
    ├─ Validate required fields
    ├─ Get user_id from req.user.userId
    ├─ Create new record in MongoDB:
    │   {
    │     user_id: '65abc...',
    │     amount: 1000,
    │     type: 'income',
    │     category: 'salary',
    │     date: '2024-01-01',
    │     notes: 'Monthly salary'
    │   }
    └─ Return: {created record with _id}
    ↓
Frontend Receives Response
    ↓
setRecordsList([...prev, newRecord])
    ↓
Clear form
    ↓
Close form
    ↓
Table updates with new record
    ↓
SUCCESS ✅
```

---

## 🔐 JWT Token Structure

```
JWT Token Format:
<header>.<payload>.<signature>

Example Token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiI2NWFiYzEyMw==", "role":"admin", "iat":1234567890}
qO5AjqqOsomeSignatureHashedWithJWT_SECRET

Header:
{
  "alg": "HS256",      ← Algorithm
  "typ": "JWT"         ← Type
}

Payload:
{
  "userId": "65abc123...",    ← From MongoDB _id
  "role": "admin",             ← User role
  "iat": 1234567890,           ← Issued at
  "exp": 1234571490            ← Expires at
}

Signature:
HMACSHA256(header.payload, "your_secret_key_here")
```

---

## 📊 State Management Flow

```
AuthContext (Global State)
    │
    ├─ user: {
    │    userId: "65abc123...",
    │    name: "Admin",
    │    email: "admin@gmail.com",
    │    role: "admin"
    │  }
    │
    ├─ token: "eyJhbGciOiJIUzI1NiIs..." (in localStorage)
    │
    ├─ loading: boolean (for async operations)
    │
    └─ Functions:
       ├─ login(userData, token)
       ├─ logout()
       ├─ isAuthenticated()
       └─ setError(error)

Used By:
├─ Header.jsx → Shows user name and dropdown
├─ ProtectedRoute.jsx → Guards dashboard
├─ Dashboard.jsx → Gets user info
└─ All pages → Checks authentication status
```

---

## 🛡️ Security Validation Chain

```
Request Arrives at Backend
    ↓
┌─────────────────────────────────────┐
│ Step 1: Check Token Exists          │
├─────────────────────────────────────┤
│ Authorization header found?         │
│  ├─ YES → Continue                  │
│  └─ NO → Return 401 (Unauthorized)  │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Step 2: Verify Token Signature      │
├─────────────────────────────────────┤
│ Token matches JWT_SECRET?           │
│  ├─ YES → Continue                  │
│  └─ NO → Return 401 (Invalid Token) │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Step 3: Check Token Expiration      │
├─────────────────────────────────────┤
│ Token not expired?                  │
│  ├─ YES → Continue                  │
│  └─ NO → Return 401 (Expired)       │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Step 4: Extract User Info           │
├─────────────────────────────────────┤
│ Decode payload → Get userId, role   │
│ Attach to req.user                  │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│ Step 5: Check User Role             │
├─────────────────────────────────────┤
│ User role in allowed list?          │
│  ├─ YES → Continue to controller    │
│  └─ NO → Return 403 (Forbidden)     │
└─────────────────────────────────────┘
    ↓
✅ ALLOWED → Execute Controller Logic
```

---

## 💾 Data Persistence

```
Frontend (localStorage)
├─ Key: authToken
│  Value: "eyJhbGciOiJIUzI1NiIs..."
│  Purpose: Send with every API request
│  Cleared: On logout
│
└─ Key: user
   Value: {
     "userId": "65abc123...",
     "name": "Admin",
     "email": "admin@gmail.com",
     "role": "admin"
   }
   Purpose: Display user info in header
   Cleared: On logout

Backend (MongoDB)
├─ Collection: users
│  └─ Documents: All registered users
│     └─ Searched by: name, email, _id
│
└─ Collection: financial
   └─ Documents: All transactions
      └─ Filtered by: user_id (only see own records)
```

---

## ✅ Security Checklist

```
✅ Authentication
   ├─ Username/password validation
   ├─ Password hashing with bcrypt
   ├─ JWT token generation
   └─ Token expiration (1 hour)

✅ Authorization
   ├─ Token verification before API calls
   ├─ Role-based access control
   ├─ User can only see own records
   └─ Admin-only endpoints protected

✅ Data Security
   ├─ Passwords never in API responses
   ├─ Token stored in localStorage (not in URL)
   ├─ CORS configured
   └─ HTTP headers secure

✅ Frontend Security
   ├─ Protected routes with PrivateRoute
   ├─ Automatic redirect to login
   ├─ Session persistence on refresh
   └─ Secure logout clearing all data
```

---

This comprehensive flow shows how every piece of your application works together to create a secure, functional finance tracking system!
