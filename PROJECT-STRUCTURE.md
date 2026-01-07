# WatchesTime E-commerce Project Structure

## 📁 Project Organization

```
watchestime-ecommerce/
├── backend/                    # Backend API Server
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── frontend/                   # React Frontend
│   ├── public/                # Static files
│   ├── src/                   # React source code
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context (Auth)
│   │   ├── pages/             # Page components
│   │   └── App.js             # Main App component
│   └── package.json           # Frontend dependencies
├── start-backend.bat          # Start backend server
├── start-frontend.bat         # Start frontend app
├── start-full-stack.bat       # Start both backend & frontend
└── PROJECT-STRUCTURE.md       # This file
```

## 🚀 Quick Start

### Option 1: Start Everything at Once
```bash
# Double-click or run:
start-full-stack.bat
```

### Option 2: Start Separately
```bash
# Terminal 1 - Backend
start-backend.bat

# Terminal 2 - Frontend  
start-frontend.bat
```

### Option 3: Manual Start
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm start
```

## 🔧 Configuration

### Backend (.env)
- **PORT**: 5001 (Backend server port)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT tokens

### Frontend (package.json)
- **proxy**: "http://localhost:5001" (Points to backend)

## 📊 Database Options

### Option 1: MongoDB (Recommended)
1. Install MongoDB locally or use MongoDB Atlas
2. Update `MONGODB_URI` in `backend/.env`
3. Server will automatically connect to MongoDB

### Option 2: In-Memory Storage (Fallback)
- If MongoDB is not available, server uses in-memory storage
- Data is lost when server restarts
- Good for development and testing

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health

## 🔑 API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/verify` - Verify JWT token
- `GET /api/health` - Server health check

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start    # React development server
```

## 📦 Dependencies

### Backend
- Express.js (Web framework)
- MongoDB/Mongoose (Database)
- bcryptjs (Password hashing)
- jsonwebtoken (JWT authentication)
- cors (Cross-origin requests)

### Frontend
- React (UI framework)
- React Router (Navigation)
- Axios (HTTP client)
- Context API (State management)