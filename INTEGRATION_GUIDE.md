# 🔗 Frontend-Backend Integration Guide

## ✅ Integration Complete!

Your CivicPulse application is now fully integrated with the backend API.

---

## 📋 What Was Integrated

### 1. **API Service Layer** (`civic-pulse-frontend/src/services/api.js`)
- ✅ Centralized Axios instance with base URL `http://localhost:5000/api`
- ✅ Request interceptor to automatically add JWT tokens
- ✅ Response interceptor to handle 401 errors (auto-logout)
- ✅ Complete API methods for all features:
  - Authentication (register, login, getMe)
  - Problems (CRUD operations)
  - Comments (add, delete)
  - Upvotes (toggle, check status)
  - Admin operations

### 2. **Authentication Context** (`civic-pulse-frontend/src/context/AuthContext.jsx`)
- ✅ Login with backend API
- ✅ Register with backend API
- ✅ Token validation on app load
- ✅ Auto-logout on token expiration
- ✅ Proper error handling

### 3. **Problem Context** (`civic-pulse-frontend/src/context/ProblemContext.jsx`)
- ✅ Fetch problems from backend
- ✅ Create problem with image upload
- ✅ Update problem status
- ✅ Delete problem
- ✅ Add comments
- ✅ Toggle upvotes
- ✅ All operations return success/error status

### 4. **Page Components Updated**
- ✅ **Login.jsx** - Async login with loading states
- ✅ **Register.jsx** - Async registration with loading states
- ✅ **ReportProblem.jsx** - Image file upload, async submission
- ✅ **ProblemDetails.jsx** - Async comments, upvotes, status updates
- ✅ **Dashboard.jsx** - Display backend data correctly
- ✅ **ProblemCard.jsx** - Display backend data structure

---

## 🚀 How to Run the Application

### **Step 1: Start the Backend Server**

```bash
cd backend
npm start
```

✅ Backend will run on: **http://localhost:5000**

### **Step 2: Start the Frontend Server**

Open a **new terminal** and run:

```bash
cd civic-pulse-frontend
npm run dev
```

✅ Frontend will run on: **http://localhost:5173** (or the port shown in terminal)

### **Step 3: Seed the Database (First Time Only)**

If you haven't seeded the database yet:

```bash
cd backend
npm run seed
```

**IMPORTANT:** After seeding, restart the backend server:

```bash
npm start
```

---

## 🧪 Testing the Integration

### 1. **Test Registration**
- Go to http://localhost:5173/register
- Create a new account
- Should redirect to dashboard after successful registration

### 2. **Test Login**
- Use demo credentials:
  - **User:** john@example.com / password123
  - **Admin:** admin@example.com / admin123
- Should redirect to dashboard after successful login

### 3. **Test Problem Reporting**
- Click "Report Problem" button
- Fill in all fields
- Upload an image (optional)
- Select location on map
- Submit the form
- Should redirect to dashboard and show the new problem

### 4. **Test Problem Details**
- Click on any problem card
- Should show full problem details
- Test upvoting (click upvote button)
- Test adding comments
- If admin, test status updates and delete

### 5. **Test Filtering**
- On dashboard, use search bar
- Filter by status
- Filter by category

---

## 🔑 Key Integration Points

### **JWT Token Flow**
1. User logs in → Backend returns JWT token
2. Token stored in `localStorage`
3. All API requests include token in `Authorization: Bearer <token>` header
4. If token expires (401 error) → Auto-logout and redirect to login

### **Image Upload Flow**
1. User selects image file
2. Frontend validates file (size < 5MB, type = image)
3. Creates FormData with problem data + image file
4. Backend receives file via Multer
5. Saves file to `backend/uploads/` folder
6. Returns image path (e.g., `/uploads/1234567890.jpg`)
7. Frontend displays image using `http://localhost:5000/uploads/...`

### **Data Structure Mapping**

**Backend Response:**
```json
{
  "id": 1,
  "title": "Pothole on Main Street",
  "description": "Large pothole...",
  "location": "123 Main St, City",
  "image": "/uploads/1234567890.jpg",
  "status": "Pending",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "upvoteCount": 5,
  "user": { "id": 2, "name": "John Doe", "role": "user" },
  "comments": [
    {
      "id": 1,
      "text": "This is dangerous!",
      "createdAt": "2024-01-15T11:00:00.000Z",
      "user": { "id": 3, "name": "Jane Smith" }
    }
  ]
}
```

**Frontend Display:**
- `problem.title` → Title
- `problem.description` → Description
- `problem.location` → Location string
- `http://localhost:5000${problem.image}` → Image URL
- `new Date(problem.createdAt).toLocaleDateString()` → Date
- `problem.upvoteCount` → Upvote count
- `problem.user.name` → Reporter name
- `problem.comments.length` → Comment count

---

## 🛠️ Troubleshooting

### **Problem: CORS Error**
**Solution:** Backend already has CORS enabled. Make sure backend is running on port 5000.

### **Problem: 401 Unauthorized**
**Solution:** 
- Check if you're logged in
- Token might be expired - try logging in again
- Clear localStorage and login again

### **Problem: Images not showing**
**Solution:**
- Check if backend is serving static files from `/uploads`
- Verify image path starts with `/uploads/`
- Check browser console for 404 errors

### **Problem: Empty problems list**
**Solution:**
- Make sure you've run `npm run seed` in backend
- Restart backend server after seeding
- Check backend console for errors

### **Problem: Can't create problem**
**Solution:**
- Make sure you're logged in
- Check if all required fields are filled
- Image must be < 5MB
- Check browser console and backend logs for errors

---

## 📁 Project Structure

```
civic-pulse/
├── backend/                    # Node.js + Express backend
│   ├── controllers/           # API logic
│   ├── models/                # Sequelize models
│   ├── routes/                # API routes
│   ├── middleware/            # Auth middleware
│   ├── uploads/               # Uploaded images
│   ├── civicpulse.db         # SQLite database
│   └── server.js             # Entry point
│
└── civic-pulse-frontend/      # React frontend
    ├── src/
    │   ├── services/
    │   │   └── api.js        # ✨ API service layer
    │   ├── context/
    │   │   ├── AuthContext.jsx    # ✨ Auth state
    │   │   └── ProblemContext.jsx # ✨ Problem state
    │   ├── pages/            # Page components
    │   └── components/       # Reusable components
    └── package.json
```

---

## 🎯 Next Steps

1. ✅ **Test all features** thoroughly
2. ✅ **Add error handling** for edge cases
3. ✅ **Improve loading states** with better UI feedback
4. ✅ **Add form validation** on frontend
5. ✅ **Deploy** to production (Vercel + Railway/Render)

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend terminal for errors
3. Verify both servers are running
4. Clear localStorage and try again
5. Restart both servers

---

**🎉 Your CivicPulse application is now fully integrated and ready to use!**

