# 📡 API Testing Examples

Complete examples for testing all CivicPulse API endpoints.

## Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register New User

**Endpoint:** `POST /api/auth/register`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": 5,
      "name": "Test User",
      "email": "test@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**💡 Save the token!** You'll need it for authenticated requests.

### 3. Get Current User Profile

**Endpoint:** `GET /api/auth/me`

**Request:**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🚨 Problem Endpoints

### 4. Get All Problems

**Endpoint:** `GET /api/problems`

**Request:**
```bash
curl http://localhost:5000/api/problems
```

**With Filters:**
```bash
# Filter by status
curl "http://localhost:5000/api/problems?status=Pending"

# Filter by location
curl "http://localhost:5000/api/problems?location=Main"

# Sort by upvotes
curl "http://localhost:5000/api/problems?sort=upvotes&order=DESC"
```

### 5. Get Problem by ID

**Endpoint:** `GET /api/problems/:id`

**Request:**
```bash
curl http://localhost:5000/api/problems/1
```

### 6. Create New Problem

**Endpoint:** `POST /api/problems` (Requires Authentication)

**Request (without image):**
```bash
curl -X POST http://localhost:5000/api/problems \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Broken Traffic Light",
    "description": "Traffic light at Main St is not working",
    "location": "Main Street & 2nd Ave"
  }'
```

**Request (with image using form-data):**
```bash
curl -X POST http://localhost:5000/api/problems \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "title=Broken Traffic Light" \
  -F "description=Traffic light not working" \
  -F "location=Main Street" \
  -F "image=@/path/to/image.jpg"
```

### 7. Update Problem Status

**Endpoint:** `PUT /api/problems/:id/status` (Requires Authentication - Owner or Admin)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/problems/1/status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress"
  }'
```

**Valid Status Values:** `Pending`, `In Progress`, `Resolved`

### 8. Delete Problem

**Endpoint:** `DELETE /api/problems/:id` (Requires Authentication - Owner or Admin)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/problems/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 💬 Comment Endpoints

### 9. Add Comment to Problem

**Endpoint:** `POST /api/problems/:problemId/comments` (Requires Authentication)

**Request:**
```bash
curl -X POST http://localhost:5000/api/problems/1/comments \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "I noticed this issue too!"
  }'
```

### 10. Get All Comments for a Problem

**Endpoint:** `GET /api/problems/:problemId/comments`

**Request:**
```bash
curl http://localhost:5000/api/problems/1/comments
```

### 11. Delete Comment

**Endpoint:** `DELETE /api/comments/:id` (Requires Authentication - Owner or Admin)

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/comments/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 👍 Upvote Endpoints

### 12. Toggle Upvote on Problem

**Endpoint:** `POST /api/problems/:problemId/upvote` (Requires Authentication)

**Request:**
```bash
curl -X POST http://localhost:5000/api/problems/1/upvote \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "success": true,
  "message": "Problem upvoted successfully.",
  "data": {
    "upvoted": true,
    "upvoteCount": 5
  }
}
```

**Note:** Calling this endpoint again will remove the upvote (toggle behavior).

### 13. Get Upvote Status

**Endpoint:** `GET /api/problems/:problemId/upvote/status` (Requires Authentication)

**Request:**
```bash
curl http://localhost:5000/api/problems/1/upvote/status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 👑 Admin Endpoints

**Note:** All admin endpoints require authentication with an admin account.

### 14. Get All Users (Admin Only)

**Endpoint:** `GET /api/admin/users`

**Request:**
```bash
curl http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### 15. Block/Unblock User (Admin Only)

**Endpoint:** `PUT /api/admin/users/:id/block`

**Request:**
```bash
curl -X PUT http://localhost:5000/api/admin/users/2/block \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

**Note:** This toggles the block status. If user is blocked, they will be unblocked, and vice versa.

### 16. Delete User (Admin Only)

**Endpoint:** `DELETE /api/admin/users/:id`

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/admin/users/2 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### 17. Get All Problems (Admin Only)

**Endpoint:** `GET /api/admin/problems`

**Request:**
```bash
curl http://localhost:5000/api/admin/problems \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### 18. Delete Problem (Admin Only)

**Endpoint:** `DELETE /api/admin/problems/:id`

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/admin/problems/1 \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## 🧪 Testing Workflow Example

Here's a complete workflow to test the API:

```bash
# 1. Login as a user
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  | jq -r '.data.token')

# 2. Get all problems
curl http://localhost:5000/api/problems

# 3. Create a new problem
curl -X POST http://localhost:5000/api/problems \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Issue",
    "description": "This is a test problem",
    "location": "Test Location"
  }'

# 4. Add a comment to problem #1
curl -X POST http://localhost:5000/api/problems/1/comments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "Great observation!"}'

# 5. Upvote problem #1
curl -X POST http://localhost:5000/api/problems/1/upvote \
  -H "Authorization: Bearer $TOKEN"

# 6. Get problem details
curl http://localhost:5000/api/problems/1
```

---

## 📱 Postman Collection

You can import these endpoints into Postman:

1. Create a new collection called "CivicPulse API"
2. Add a variable `baseUrl` = `http://localhost:5000/api`
3. Add a variable `token` (will be set after login)
4. Create requests for each endpoint above
5. Use `{{baseUrl}}` and `{{token}}` in your requests

---

## 🔍 Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]  // Optional validation errors
}
```

---

## 🛡️ Authentication

For protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

The token is returned when you:
- Register a new user
- Login

Tokens expire after **7 days** (configurable in `.env`).

---

**Happy Testing! 🚀**

