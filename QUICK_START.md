# 🚀 Quick Start Guide - 5 Minutes Setup

## For Complete Beginners

Follow these steps **EXACTLY** in order.

---

## ✅ Step 1: Check Requirements

Before starting, make sure you have:

1. **Node.js installed**
   - Open Command Prompt and type: `node --version`
   - Should show version number (e.g., v18.0.0)
   - If not, download from [nodejs.org](https://nodejs.org)

2. **MongoDB running**
   - Ask your manager if it's running
   - Or use MongoDB Atlas (cloud database)

---

## ✅ Step 2: Open Project Folder

```bash
cd c:\Users\Satish\OneDrive\Desktop\Finance_System
```

You should see:
- `client` folder (Frontend)
- `server` folder (Backend)

---

## ✅ Step 3: Start Backend (First Terminal)

**Open NEW Command Prompt window** and run:

```bash
cd c:\Users\Satish\OneDrive\Desktop\Finance_System\server
npm start
```

**Wait for this message** to appear:
```
Server is running on port 3000
DB connected
```

⚠️ **DO NOT close this terminal!** Keep it running.

---

## ✅ Step 4: Start Frontend (Second Terminal)

**Open ANOTHER Command Prompt window** and run:

```bash
cd c:\Users\Satish\OneDrive\Desktop\Finance_System\client
npm run dev
```

**Wait for this message** to appear:
```
VITE ... ready in XXX ms
Local: http://localhost:5173/
```

---

## ✅ Step 5: Open in Browser

1. Click the link → `http://localhost:5173`
2. Or manually type it in your browser

---

## ✅ Step 6: Login

On the Sign In page, enter:
- **Username:** `Admin`
- **Password:** `admin123`

Click Sign In button.

---

## ✅ Step 7: You're In! 🎉

You should see:
- Dashboard with summary cards
- "Add Record" button
- Empty records table

---

## ✅ Step 8: Test It Out

### Try adding an income record:

1. Click "Add Record" button
2. Fill in:
   - Amount: `1000`
   - Type: `Income` (select from dropdown)
   - Category: `Salary`
   - Date: Today's date
   - Notes: `Test income`
3. Click "Create Record"

**Result:** Record appears in table, totals update

### Try adding an expense:

1. Click "Add Record" again
2. Fill in:
   - Amount: `200`
   - Type: `Expense`
   - Category: `Food`
   - Date: Today's date
   - Notes: `Lunch`
3. Click "Create Record"

**Result:** 
- New record in table
- Balance updates (1000 - 200 = 800)

---

## ⚠️ If Something Goes Wrong

### **"Cannot reach server" error**
- ❌ Backend not running
- ✅ Check first terminal (should show "Server is running on port 3000")
- ✅ If not, go to that terminal and run `npm start`

### **"Cannot connect database"**
- ❌ MongoDB not running
- ✅ Check with your manager
- ✅ Or check if MongoDB service is started

### **"Login doesn't work"**
- ❌ Wrong username/password
- ✅ Use exactly: `Admin` / `admin123`

### **"Records don't show"**
- ❌ Logged in but still can't see records?
- ✅ Open browser Dev Tools (F12)
- ✅ Go to Console tab
- ✅ Look for error messages
- ✅ Send error to your manager

### **"Frontend page is blank"**
- ❌ Frontend crashed
- ✅ Stop it (Ctrl+C in terminal)
- ✅ Run `npm run dev` again

---

## 📱 What Each Button Does

| Button/Feature | What It Does | Where |
|---|---|---|
| Home | Go to main page | Header |
| About | Learn about app | Header |
| Contact | Send message | Header |
| Dashboard | See your records | Header |
| Add Record | Create new transaction | Dashboard |
| Sign Out | Logout | User menu (top right) |

---

## 📊 Dashboard Explained

### **Summary Cards**
- **Total Income** (Green) = Sum of all income
- **Total Expense** (Red) = Sum of all expenses  
- **Balance** (Blue/Orange) = Income - Expense

### **Add Record Form**
- Click to add income or expense
- Fill all fields
- Click "Create Record"

### **Records Table**
- Shows all your transactions
- Date, Category, Type, Amount, Notes

---

## 🔐 Two Terminals Rule

**IMPORTANT:** You need 2 terminal windows open:

1. **Terminal 1** - Backend
   - Running `npm start` in server folder
   - Shows "Server is running on port 3000"
   - Keep it open always

2. **Terminal 2** - Frontend
   - Running `npm run dev` in client folder
   - Shows "Local: http://localhost:5173"
   - Keep it open always

If you close either → App stops working

---

## 🔄 Stop and Restart

**To stop the app:**
- Press `Ctrl + C` in each terminal
- Type `Y` if asked

**To restart:**
- Run `npm start` in backend terminal
- Run `npm run dev` in frontend terminal

---

## ✨ Tips for Success

1. ✅ Keep both terminals open while working
2. ✅ Don't close the backend terminal
3. ✅ Always check error messages in red
4. ✅ Check browser console for frontend errors (F12)
5. ✅ Clear browser cache if things act weird (Ctrl+Shift+Delete)
6. ✅ Use the default login credentials

---

## 🎓 What's Happening Behind Scenes

```
YOUR BROWSER
    ↓
Frontend (React) at http://localhost:5173
    ↓ (sends API request)
Backend (Node.js) at http://localhost:3000
    ↓ (reads/writes data)
Database (MongoDB)
    ↓ (returns data)
Backend
    ↓ (returns JSON)
Frontend
    ↓ (displays on screen)
YOU SEE RESULTS ✅
```

---

## 📞 Common Problems & Solutions

| Problem | Solution |
|---------|----------|
| "localhost:5173 refused to connect" | Frontend not running, run `npm run dev` |
| "Cannot GET /api/auth/signin" | Backend not running, run `npm start` |
| "SyntaxError in console" | Refresh page (Ctrl+R) |
| "Records don't save" | Check backend terminal for errors |
| "Login button does nothing" | Check internet connection, clear cache |

---

**That's it! You're ready to use the Finance Manager! 🚀**

Any issues? Check the main README.md file for detailed explanations.
