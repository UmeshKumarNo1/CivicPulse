# 🏙️ CivicPulse - Local Civic Problem Reporting and Tracking System

A complete full-stack web application for reporting and tracking local civic problems like potholes, broken streetlights, garbage issues, and more.

![CivicPulse](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v19-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightblue)

---

## 🌟 Features

### **User Features**
- ✅ User registration and login with JWT authentication
- ✅ Report civic problems with image upload
- ✅ View all reported problems on an interactive dashboard
- ✅ Filter problems by status, category, and search
- ✅ Upvote problems to show support
- ✅ Add comments to problems
- ✅ View detailed problem information
- ✅ Interactive map for location selection

### **Admin Features**
- ✅ Update problem status (Pending → In Progress → Resolved)
- ✅ Delete inappropriate problems
- ✅ View all users and problems
- ✅ Block/unblock users
- ✅ Manage user accounts

### **Technical Features**
- ✅ RESTful API with Express.js
- ✅ SQLite database with Sequelize ORM
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Image upload with Multer
- ✅ Input validation with express-validator
- ✅ CORS enabled for frontend integration
- ✅ Responsive design with plain CSS

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime:** Node.js v18+
- **Framework:** Express.js v5.2.1
- **Database:** SQLite with Sequelize ORM v6.37.7
- **Authentication:** JWT (jsonwebtoken v9.0.2)
- **Password Hashing:** bcrypt v5.1.1
- **File Upload:** Multer v1.4.5-lts.1
- **Validation:** express-validator v7.2.1

### **Frontend**
- **Framework:** React v19.2.0
- **Build Tool:** Vite v7.2.4
- **Routing:** React Router DOM v7.11.0
- **HTTP Client:** Axios v1.7.9
- **Maps:** Leaflet + react-leaflet
- **Styling:** Plain CSS (No Tailwind, No Bootstrap)

---

## 📁 Project Structure

```
CivicPulse/
├── backend/                    # Node.js + Express backend
│   ├── config/                # Database configuration
│   ├── controllers/           # API logic
│   ├── middleware/            # Auth & upload middleware
│   ├── models/                # Sequelize models
│   ├── routes/                # API routes
│   ├── uploads/               # Uploaded images
│   ├── server.js              # Entry point
│   ├── seed.js                # Database seeding
│   └── package.json
│
├── civic-pulse-frontend/      # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Context API (Auth, Problems)
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   └── index.css          # Global styles
│   └── package.json
│
├── INTEGRATION_GUIDE.md       # Integration documentation
├── API_INTEGRATION_REFERENCE.md  # API reference
└── README.md                  # This file
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js v18 or higher
- npm or yarn

### **1. Clone the Repository**
```bash
git clone https://github.com/UmeshKumarNo1/CivicPulse.git
cd CivicPulse
```

### **2. Setup Backend**
```bash
cd backend
npm install
npm run seed    # Seed database with sample data
npm start       # Start backend server
```

Backend will run on: **http://localhost:5000**

### **3. Setup Frontend**
Open a new terminal:
```bash
cd civic-pulse-frontend
npm install
npm run dev     # Start frontend server
```

Frontend will run on: **http://localhost:5173**

### **4. Access the Application**
Open your browser and go to: **http://localhost:5173**

---

## 👤 Demo Credentials

### **Regular User**
- Email: `john@example.com`
- Password: `password123`

### **Admin User**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📚 API Documentation

### **Base URL:** `http://localhost:5000/api`

### **Authentication Endpoints**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user (requires auth)

### **Problem Endpoints**
- `GET /problems` - Get all problems (with filters)
- `GET /problems/:id` - Get problem by ID
- `POST /problems` - Create new problem (requires auth)
- `PUT /problems/:id/status` - Update problem status (admin only)
- `DELETE /problems/:id` - Delete problem (admin only)

### **Comment Endpoints**
- `POST /problems/:id/comments` - Add comment (requires auth)
- `DELETE /problems/:problemId/comments/:commentId` - Delete comment (requires auth)

### **Upvote Endpoints**
- `POST /problems/:id/upvote` - Toggle upvote (requires auth)
- `GET /problems/:id/upvote/status` - Check upvote status (requires auth)

### **Admin Endpoints**
- `GET /admin/users` - Get all users (admin only)
- `GET /admin/problems` - Get all problems (admin only)
- `PUT /admin/users/:id/block` - Block/unblock user (admin only)
- `DELETE /admin/users/:id` - Delete user (admin only)

For detailed API examples, see [API_INTEGRATION_REFERENCE.md](./API_INTEGRATION_REFERENCE.md)

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based authentication with 7-day expiration
- ✅ Protected routes with authentication middleware
- ✅ Role-based access control (user/admin)
- ✅ Input validation on all endpoints
- ✅ File upload validation (size, type)
- ✅ SQL injection prevention with Sequelize ORM

---

## 📖 Documentation

- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Complete integration guide
- [API_INTEGRATION_REFERENCE.md](./API_INTEGRATION_REFERENCE.md) - API reference
- [backend/README.md](./backend/README.md) - Backend documentation
- [backend/SETUP_GUIDE.md](./backend/SETUP_GUIDE.md) - Backend setup guide
- [backend/API_EXAMPLES.md](./backend/API_EXAMPLES.md) - API examples

---

## 🧪 Testing

### **Test Backend API**
```bash
cd backend
npm start

# In another terminal, test endpoints:
curl http://localhost:5000/
curl http://localhost:5000/api/problems
```

### **Test Frontend**
```bash
cd civic-pulse-frontend
npm run dev

# Open browser to http://localhost:5173
# Login with demo credentials
# Test all features
```

---

## 🐛 Troubleshooting

### **Backend Issues**
- **Port 5000 already in use:** Change port in `backend/server.js`
- **Database errors:** Delete `civicpulse.db` and run `npm run seed` again
- **Module not found:** Run `npm install` in backend folder

### **Frontend Issues**
- **Port 5173 already in use:** Vite will automatically use next available port
- **API errors:** Make sure backend is running on port 5000
- **Login fails:** Clear localStorage and try again

For more troubleshooting tips, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Umesh Kumar**
- GitHub: [@UmeshKumarNo1](https://github.com/UmeshKumarNo1)

---

## 🙏 Acknowledgments

- Built with ❤️ using Node.js, Express, React, and SQLite
- Icons from Heroicons
- Maps powered by Leaflet

---

**⭐ If you find this project helpful, please give it a star!**

