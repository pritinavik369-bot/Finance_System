# Frontend Integration Guide

## Overview
This frontend is now fully integrated with the backend Finance System API. All components follow security best practices and proper code structure.

## Key Features

### 1. Authentication
- **Location**: `src/context/AuthContext.jsx`
- Manages user login state and authentication tokens
- Tokens stored securely in localStorage
- Auto-loads user session on app start

### 2. API Service Layer
- **Location**: `src/services/api.js`
- Centralized API communication
- Automatic token injection in authenticated requests
- Error handling and JSON parsing
- Safe for CORS and cookies

### 3. Protected Routes
- **Location**: `src/components/ProtectedRoute.jsx`
- `PrivateRoute`: Requires authentication
- `AdminRoute`: Requires admin role
- Automatic redirect to login if not authenticated

### 4. Pages Implemented

#### Public Pages
- **Home** (`/`): Landing page with features overview
- **About** (`/about`): About the application  
- **Contact** (`/contact`): Contact form
- **SignIn** (`/sign-in`): Login with backend integration
- **SignUp** (`/sign-up`): Info page (admin creates accounts)

#### Protected Pages  
- **Dashboard** (`/dashboard`): Main application
  - View all financial records
  - Create new income/expense records
  - Real-time balance calculations
  - Income/Expense summaries

## Security Measures

✅ JWT Token Management
- Stored in localStorage (httpOnly not supported in SPA)
- Automatically injected in API headers
- Cleared on logout

✅ API Security
- All authenticated requests include Bearer token
- Error messages don't expose sensitive data
- CORS configured on backend

✅ Route Protection
- Dashboard requires valid authentication
- Token validation before API calls
- Automatic redirect for unauthorized access

✅ Data Handling
- No sensitive data in localStorage (only token)
- User info stored separately
- Secure logout clears all auth data

## Code Structure

```
src/
├── components/
│   ├── Header.jsx        # Navigation & user menu
│   ├── Footer.jsx        # Footer
│   └── ProtectedRoute.jsx # Route guards
├── context/
│   └── AuthContext.jsx   # Auth state management
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── SignIn.jsx        # Login integration
│   ├── SignUp.jsx
│   └── Dashboard.jsx     # Main app
├── services/
│   └── api.js            # API client
├── App.jsx               # Router & layout
├── main.jsx              # Entry point
└── index.css             # Tailwind styles
```

## Backend Integration

### Sign In
```javascript
POST /api/auth/signin
body: { name: "Admin", password: "admin123" }
response: { token, userId, name, email, role, ...rest }
```

### Create Financial Record
```javascript
POST /api/financial/records (requires auth)
headers: { Authorization: "Bearer <token>" }
body: { amount, type, category, date, notes }
```

### Get Records
```javascript
GET /api/financial/records (requires auth)
headers: { Authorization: "Bearer <token>" }
response: [ { ...record }, ]
```

## Running the Frontend

```bash
cd client
npm install
npm run dev
```

Default server runs at `http://localhost:5173`
Backend API expected at `http://localhost:3000`

## Test Credentials

Username: `Admin`
Password: `admin123`

## Configuration

API Base URL is set in `src/services/api.js`:
```javascript
const API_BASE = 'http://localhost:3000/api';
```

Change this if your backend runs on a different URL.

## Features Ready for Future Development

- Export records to CSV
- Advanced filtering by date range
- Budget alerts
- Recurring transactions
- Multi-currency support
- Data visualization (charts)
- Admin panel for user management
- Email notifications

## Notes

- Currently supports read-only financial records (no edit/delete on frontend)
- Admin account creation managed through backend only
- Sign-up page shows info message (no signup endpoint yet on backend)
