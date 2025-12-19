# 🔌 API Integration Reference

Quick reference for how the frontend integrates with backend APIs.

---

## 🔐 Authentication APIs

### **1. Register**
```javascript
// Frontend: civic-pulse-frontend/src/context/AuthContext.jsx
const register = async (name, email, password) => {
  const response = await authAPI.register({ name, email, password });
  // Stores token and user in localStorage
};

// Backend: POST /api/auth/register
// Body: { name, email, password }
// Response: { success, data: { user, token } }
```

### **2. Login**
```javascript
// Frontend: civic-pulse-frontend/src/context/AuthContext.jsx
const login = async (email, password) => {
  const response = await authAPI.login({ email, password });
  // Stores token and user in localStorage
};

// Backend: POST /api/auth/login
// Body: { email, password }
// Response: { success, data: { user, token } }
```

### **3. Get Current User**
```javascript
// Frontend: civic-pulse-frontend/src/context/AuthContext.jsx
const response = await authAPI.getMe();

// Backend: GET /api/auth/me
// Headers: Authorization: Bearer <token>
// Response: { success, data: { user } }
```

---

## 📋 Problem APIs

### **1. Get All Problems**
```javascript
// Frontend: civic-pulse-frontend/src/context/ProblemContext.jsx
const fetchProblems = async (filters = {}) => {
  const response = await problemAPI.getAll(filters);
  setProblems(response.data.problems);
};

// Backend: GET /api/problems?status=Pending&search=pothole
// Response: { success, count, data: { problems: [...] } }
```

### **2. Get Problem by ID**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const problem = await getProblemById(id);

// Backend: GET /api/problems/:id
// Response: { success, data: { problem } }
```

### **3. Create Problem**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ReportProblem.jsx
const problemData = {
  title: 'Pothole on Main St',
  description: 'Large pothole...',
  location: '123 Main St',
  image: fileObject // File object from input
};
const result = await addProblem(problemData);

// Backend: POST /api/problems
// Headers: Authorization: Bearer <token>
// Body: FormData with { title, description, location, image }
// Response: { success, data: { problem } }
```

### **4. Update Problem Status**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const result = await updateProblem(id, { status: 'Resolved' });

// Backend: PUT /api/problems/:id/status
// Headers: Authorization: Bearer <token>
// Body: { status: 'Pending' | 'In Progress' | 'Resolved' }
// Response: { success, data: { problem } }
```

### **5. Delete Problem**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const result = await deleteProblem(id);

// Backend: DELETE /api/problems/:id
// Headers: Authorization: Bearer <token>
// Response: { success, message }
```

---

## 💬 Comment APIs

### **1. Get Comments**
```javascript
// Comments are included in problem details
const problem = await getProblemById(id);
const comments = problem.comments;

// Backend: GET /api/problems/:id
// Response includes comments array
```

### **2. Add Comment**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const result = await addComment(problemId, 'Great observation!');

// Backend: POST /api/problems/:id/comments
// Headers: Authorization: Bearer <token>
// Body: { text: 'Comment text' }
// Response: { success, data: { comment } }
```

### **3. Delete Comment**
```javascript
// Frontend: civic-pulse-frontend/src/services/api.js
const result = await commentAPI.delete(problemId, commentId);

// Backend: DELETE /api/problems/:problemId/comments/:commentId
// Headers: Authorization: Bearer <token>
// Response: { success, message }
```

---

## 👍 Upvote APIs

### **1. Toggle Upvote**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const result = await upvoteProblem(problemId);

// Backend: POST /api/problems/:id/upvote
// Headers: Authorization: Bearer <token>
// Response: { success, data: { upvoted: true/false, upvoteCount } }
```

### **2. Check Upvote Status**
```javascript
// Frontend: civic-pulse-frontend/src/pages/ProblemDetails.jsx
const response = await upvoteAPI.getStatus(problemId);
const hasUpvoted = response.data.upvoted;

// Backend: GET /api/problems/:id/upvote/status
// Headers: Authorization: Bearer <token>
// Response: { success, data: { upvoted: true/false } }
```

---

## 👑 Admin APIs

### **1. Get All Users**
```javascript
const response = await adminAPI.getAllUsers();

// Backend: GET /api/admin/users
// Headers: Authorization: Bearer <admin-token>
// Response: { success, data: { users: [...] } }
```

### **2. Block/Unblock User**
```javascript
const result = await adminAPI.toggleBlockUser(userId);

// Backend: PUT /api/admin/users/:id/block
// Headers: Authorization: Bearer <admin-token>
// Response: { success, data: { user } }
```

### **3. Delete User**
```javascript
const result = await adminAPI.deleteUser(userId);

// Backend: DELETE /api/admin/users/:id
// Headers: Authorization: Bearer <admin-token>
// Response: { success, message }
```

---

## 🔄 Request/Response Interceptors

### **Request Interceptor**
```javascript
// Automatically adds JWT token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('civicPulseToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### **Response Interceptor**
```javascript
// Automatically handles 401 errors (token expiration)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('civicPulseToken');
      localStorage.removeItem('civicPulseUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📊 Data Structure Examples

### **User Object**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "isBlocked": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### **Problem Object**
```json
{
  "id": 1,
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "location": "123 Main St, City",
  "image": "/uploads/1234567890.jpg",
  "status": "Pending",
  "upvoteCount": 5,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "user": { "id": 2, "name": "John Doe", "role": "user" },
  "comments": [...]
}
```

### **Comment Object**
```json
{
  "id": 1,
  "text": "This is a serious issue!",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "user": { "id": 3, "name": "Jane Smith", "role": "user" }
}
```

---

## ✅ Integration Checklist

- [x] API service layer created
- [x] Request interceptor adds JWT tokens
- [x] Response interceptor handles 401 errors
- [x] All authentication flows integrated
- [x] All problem CRUD operations integrated
- [x] Comment functionality integrated
- [x] Upvote functionality integrated
- [x] Admin operations integrated
- [x] Image upload working
- [x] Error handling implemented
- [x] Loading states implemented

---

**🎉 All APIs are fully integrated and working!**

