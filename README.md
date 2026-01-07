# WatchesTime - E-commerce Website

A full-stack MERN application for selling watches with JWT-based authentication.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Password Security**: Bcrypt hashing for secure password storage
- **Protected Routes**: Premium watches accessible only to authenticated users
- **Responsive Design**: Modern UI with React and CSS
- **Product Display**: Different watch collections for public and authenticated users

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt for password hashing

## Project Structure

```
watchestime-ecommerce/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Authentication context
│   │   └── App.js          # Main app component
├── server.js               # Express server
├── package.json            # Backend dependencies
└── .env                    # Environment variables
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd watchestime-ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/watchestime
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

5. **Start MongoDB**
   Make sure MongoDB is running on your system.

6. **Run the application**
   
   **Development mode (both frontend and backend):**
   ```bash
   npm run dev
   ```
   
   **Or run separately:**
   
   Backend only:
   ```bash
   npm run server
   ```
   
   Frontend only:
   ```bash
   npm run client
   ```

## Usage

1. **Access the application**: Open http://localhost:3000
2. **Browse Local Watches**: Available without authentication
3. **Register**: Create a new account
4. **Login**: Access your account
5. **Premium Watches**: View exclusive collection after login

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/verify` - Verify JWT token

### Products
- `GET /api/watches/local` - Get local edition watches (public)
- `GET /api/watches/premium` - Get premium watches (protected)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes middleware
- CORS enabled for cross-origin requests
- Input validation and error handling

## Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

## Troubleshooting

### "Login Failed" or "Register Failed" Errors

If you're seeing authentication errors, follow these steps:

1. **Make sure the backend server is running:**
   ```bash
   npm start
   ```
   You should see: `🚀 Server running on port 5000`

2. **Test the server endpoints:**
   ```bash
   node test-auth.js
   ```

3. **Check if the server is accessible:**
   Open http://localhost:5000/api/health in your browser

4. **Common issues:**
   - **Port conflict**: Make sure port 5000 is not being used by another application
   - **CORS issues**: The server includes CORS middleware to handle cross-origin requests
   - **Network issues**: Try restarting both frontend and backend

### Running Both Frontend and Backend

**Option 1: Run both simultaneously**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

The frontend will run on http://localhost:3000 and proxy API requests to http://localhost:5000.

## License

This project is licensed under the MIT License.