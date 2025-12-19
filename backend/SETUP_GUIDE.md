# 🚀 Quick Setup Guide - CivicPulse Backend

This guide will help you get the backend up and running in **5 minutes**.

## Prerequisites

- **Node.js** installed (version 14 or higher)
- **npm** (comes with Node.js)
- A terminal/command prompt

## Step-by-Step Setup

### Step 1: Navigate to Backend Folder

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (Express, Sequelize, bcrypt, JWT, etc.)

**Expected output:** You'll see a progress bar and "added X packages" message.

### Step 3: Seed the Database

```bash
npm run seed
```

This creates:
- Sample users (including an admin)
- Sample civic problems
- Sample comments and upvotes

**Expected output:**
```
🌱 Starting database seeding...
✅ Database synced.
✅ Users created.
✅ Problems created.
✅ Comments created.
✅ Upvotes created.
🎉 Database seeding completed successfully!
```

### Step 4: Start the Server

```bash
npm start
```

**Expected output:**
```
🚀 Server is running on port 5000
📍 API URL: http://localhost:5000
```

### Step 5: Test the API

Open your browser and go to: **http://localhost:5000**

You should see:
```json
{
  "success": true,
  "message": "Welcome to CivicPulse API",
  "version": "1.0.0"
}
```

## ✅ You're Done!

Your backend is now running and ready to use!

## Test Credentials

Use these credentials to test the API:

**Regular Users:**
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`
- Email: `bob@example.com` | Password: `password123`

**Admin User:**
- Email: `admin@example.com` | Password: `admin123`

## Quick API Tests

### Test Login (using cURL)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Test Get All Problems

```bash
curl http://localhost:5000/api/problems
```

## Common Issues

### "Port 5000 already in use"

**Solution:** Change the port in `.env` file:
```
PORT=5001
```

### "Cannot find module"

**Solution:** Delete `node_modules` and reinstall:
```bash
rm -rf node_modules
npm install
```

### "Invalid email or password"

**Solution:** Make sure you ran the seed script:
```bash
npm run seed
```

## Next Steps

1. **Read the full documentation:** Check `README.md` for complete API documentation
2. **Use Postman:** Import the API endpoints for easier testing
3. **Connect your frontend:** Set API base URL to `http://localhost:5000/api`

## Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you make code changes.

## Need Help?

- Check the `README.md` for detailed API documentation
- Look at the code comments in the controllers
- Review the troubleshooting section in `README.md`

---

**Happy Coding! 🎉**

