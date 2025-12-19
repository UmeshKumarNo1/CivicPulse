# CivicPulse Backend API

A complete backend for a Local Civic Problem Reporting and Tracking System built with Node.js, Express.js, SQLite, and Sequelize.

## Features

- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ User roles (user and admin)
- ✅ Problem CRUD operations
- ✅ Image upload with Multer
- ✅ Comments system
- ✅ Upvote/Support functionality
- ✅ Admin features (user management, problem moderation)
- ✅ Input validation with express-validator
- ✅ SQLite database with Sequelize ORM
- ✅ CORS enabled for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Validation**: express-validator
- **CORS**: cors

## Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - The `.env` file is already created with default values
   - You can modify `JWT_SECRET` for production

## Running the Server

### Quick Start

1. **Seed the database** (first time only):
   ```bash
   npm run seed
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Access the API** at `http://localhost:5000`

### Database Seeding

The seed script creates sample data for testing:

```bash
npm run seed
```

**What gets created:**
- 4 sample users (3 regular users + 1 admin)
- 6 sample problems with different statuses
- 8 sample comments
- Multiple upvotes

**Sample Credentials:**
- User: `john@example.com` / `password123`
- User: `jane@example.com` / `password123`
- Admin: `admin@example.com` / `admin123`
- User: `bob@example.com` / `password123`

**⚠️ IMPORTANT:** The seed script uses `force: true` which **drops all existing tables** and recreates them. This means:
- All existing data will be deleted
- Only use this for initial setup or testing
- Never run this in production with real data

### Starting the Server

**Development mode (with nodemon auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`)

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Problem Routes (`/api/problems`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/problems` | Create new problem | Private |
| GET | `/api/problems` | Get all problems | Public |
| GET | `/api/problems/:id` | Get problem by ID | Public |
| PUT | `/api/problems/:id/status` | Update problem status | Private (Owner/Admin) |
| DELETE | `/api/problems/:id` | Delete problem | Private (Owner/Admin) |

### Comment Routes (`/api/problems`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/problems/:problemId/comments` | Add comment | Private |
| GET | `/api/problems/:problemId/comments` | Get all comments | Public |
| DELETE | `/api/comments/:id` | Delete comment | Private (Owner/Admin) |

### Upvote Routes (`/api/problems`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/problems/:problemId/upvote` | Toggle upvote | Private |
| GET | `/api/problems/:problemId/upvote/status` | Get upvote status | Private |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/users` | Get all users | Admin |
| PUT | `/api/admin/users/:id/block` | Block/Unblock user | Admin |
| DELETE | `/api/admin/users/:id` | Delete user | Admin |
| GET | `/api/admin/problems` | Get all problems | Admin |
| DELETE | `/api/admin/problems/:id` | Delete problem | Admin |

## Request Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Problem (with image)
```bash
POST /api/problems
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Broken Street Light",
  "description": "Street light is broken on Main St",
  "location": "Main Street",
  "image": <file>
}
```

### Add Comment
```bash
POST /api/problems/1/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "I noticed this too!"
}
```

### Toggle Upvote
```bash
POST /api/problems/1/upvote
Authorization: Bearer <token>
```

## Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (user/admin)
- isBlocked (Boolean)
- createdAt, updatedAt

### Problems Table
- id (Primary Key)
- title
- description
- location
- image (File path)
- status (Pending/In Progress/Resolved)
- userId (Foreign Key)
- createdAt, updatedAt

### Comments Table
- id (Primary Key)
- text
- userId (Foreign Key)
- problemId (Foreign Key)
- createdAt, updatedAt

### Upvotes Table
- id (Primary Key)
- userId (Foreign Key)
- problemId (Foreign Key)
- Unique constraint on (userId, problemId)
- createdAt, updatedAt

## Project Structure

```
backend/
├── config/
│   └── database.js          # Sequelize configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── problemController.js # Problem CRUD logic
│   ├── commentController.js # Comment logic
│   ├── upvoteController.js  # Upvote logic
│   └── adminController.js   # Admin features
├── middleware/
│   ├── auth.js              # JWT authentication & authorization
│   └── upload.js            # Multer file upload config
├── models/
│   ├── index.js             # Model relationships
│   ├── User.js              # User model
│   ├── Problem.js           # Problem model
│   ├── Comment.js           # Comment model
│   └── Upvote.js            # Upvote model
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── problemRoutes.js     # Problem endpoints
│   ├── commentRoutes.js     # Comment endpoints
│   ├── upvoteRoutes.js      # Upvote endpoints
│   └── adminRoutes.js       # Admin endpoints
├── uploads/                 # Uploaded images
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── seed.js                 # Database seeding script
└── server.js               # Main server file
```

## Important Notes

- **Database File**: `civicpulse.db` is created automatically when you first run the server
- **Uploaded Images**: Stored in the `uploads/` folder
- **JWT Expiration**: Tokens expire after 7 days (configurable in `.env`)
- **Image Upload Limits**:
  - Maximum size: 5MB
  - Allowed formats: jpeg, jpg, png, gif, webp
- **Password Security**: All passwords are hashed using bcrypt before storage

## Troubleshooting

### "Invalid email or password" Error

**Cause**: This usually happens when:
1. The database was seeded but passwords weren't hashed properly
2. You're using the wrong credentials
3. The user doesn't exist in the database

**Solution**:
1. Make sure you ran the seed script: `npm run seed`
2. Use the exact credentials from the seed data (see above)
3. The seed script now includes `individualHooks: true` to ensure passwords are hashed

### Server Not Responding

**Symptoms**: API calls timeout or return no response

**Solutions**:
1. Check if the server is running: `http://localhost:5000/` should return a welcome message
2. Verify the port isn't already in use
3. Check the terminal for error messages
4. Make sure all dependencies are installed: `npm install`

### "Cannot find module" Errors

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

**Problem**: Data not showing up or old data persists

**Solution**:
1. Stop the server (Ctrl+C)
2. Delete the database file: `rm civicpulse.db` (Windows: `del civicpulse.db`)
3. Run seed script: `npm run seed`
4. Start the server: `npm start`

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
1. Change the port in `.env` file: `PORT=5001`
2. Or kill the process using port 5000:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill`

### Image Upload Fails

**Common Issues**:
1. **File too large**: Maximum 5MB
2. **Wrong format**: Only image files allowed
3. **Missing token**: Image upload requires authentication

**Solution**: Check the error message in the response for specific details

### CORS Errors (Frontend Integration)

**Error**: "Access-Control-Allow-Origin" error in browser

**Solution**: CORS is already enabled for all origins. If you still face issues:
1. Make sure you're making requests to `http://localhost:5000` (not `https`)
2. Check that the server is running
3. Verify your frontend is sending requests to the correct URL

## Environment Variables

The `.env` file contains the following variables:

```env
PORT=5000                                    # Server port
NODE_ENV=development                         # Environment (development/production)
JWT_SECRET=your_super_secret_jwt_key        # Change this in production!
JWT_EXPIRES_IN=7d                           # Token expiration time
DB_NAME=civicpulse.db                       # SQLite database file name
```

**⚠️ Security Warning**: Change `JWT_SECRET` to a strong random string in production!

## Testing the API

### Using cURL (Command Line)

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get all problems:**
```bash
curl http://localhost:5000/api/problems
```

### Using Postman

1. Import the endpoints from the API documentation above
2. For protected routes, add the JWT token:
   - Go to **Authorization** tab
   - Select **Bearer Token**
   - Paste your token from the login response

## Ready for Frontend Integration

This backend is fully compatible with React, Vue, Angular, or any frontend framework:

**Setup:**
1. Set API base URL to `http://localhost:5000/api`
2. Store JWT token after login (localStorage or state management)
3. Include token in Authorization header: `Bearer <token>`
4. Use `multipart/form-data` for image uploads

**Example (JavaScript Fetch):**
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'john@example.com', password: 'password123' })
});
const data = await response.json();
const token = data.data.token;

// Get problems (authenticated)
const problems = await fetch('http://localhost:5000/api/problems', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Development Tips

1. **Use nodemon**: Run `npm run dev` for auto-restart on file changes
2. **Check logs**: The server logs all errors to the console
3. **Test endpoints**: Use Postman, Thunder Client, or cURL
4. **Database inspection**: Use SQLite browser tools to view `civicpulse.db`
5. **Code structure**: Follow the existing pattern when adding new features

## License

This project is open source and available for educational purposes.

