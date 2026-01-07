const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('🚀 Starting WatchesTime Backend Server...');

const app = express();

// Middleware
app.use(cors({
    origin: true, // Allow all origins for development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/watchestime', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        // Fallback to in-memory storage
        console.log('📝 Using in-memory storage as fallback');
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// In-memory fallback storage
const users = [];
let userIdCounter = 1;

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Routes
app.get('/api/health', (req, res) => {
    console.log('📊 Health check requested');
    res.json({
        status: 'OK',
        message: 'WatchesTime Backend Server running',
        database: mongoose.connection.readyState === 1 ? 'MongoDB Connected' : 'In-memory storage',
        timestamp: new Date().toISOString()
    });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    try {
        console.log('📝 Registration attempt:', { username: req.body.username, email: req.body.email });
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        
        if (mongoose.connection.readyState === 1) {
            // MongoDB is connected
            const existingUser = await User.findOne({
                $or: [
                    { email: email.toLowerCase() },
                    { username: username.toLowerCase() }
                ]
            });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            newUser = new User({
                username,
                email: email.toLowerCase(),
                password: hashedPassword
            });

            await newUser.save();
        } else {
            // Fallback to in-memory storage
            const existingUser = users.find(user =>
                user.email.toLowerCase() === email.toLowerCase() ||
                user.username.toLowerCase() === username.toLowerCase()
            );

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            newUser = {
                id: userIdCounter++,
                username,
                email: email.toLowerCase(),
                password: hashedPassword,
                createdAt: new Date()
            };

            users.push(newUser);
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: newUser._id || newUser.id, 
                username, 
                email: email.toLowerCase() 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('✅ User registered successfully:', email);

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: { 
                id: newUser._id || newUser.id, 
                username, 
                email: email.toLowerCase() 
            }
        });

    } catch (error) {
        console.error('❌ Registration error:', error.message);
        res.status(500).json({ message: 'Registration failed: ' + error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    try {
        console.log('🔐 Login attempt:', req.body.email);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        let user;

        if (mongoose.connection.readyState === 1) {
            // MongoDB is connected
            user = await User.findOne({ email: email.toLowerCase() });
        } else {
            // Fallback to in-memory storage
            user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { 
                userId: user._id || user.id, 
                username: user.username, 
                email: user.email 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        console.log('✅ Login successful:', email);

        res.json({
            message: 'Login successful',
            token,
            user: { 
                id: user._id || user.id, 
                username: user.username, 
                email: user.email 
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error.message);
        res.status(500).json({ message: 'Login failed: ' + error.message });
    }
});

// Sample watch data
const localWatches = [
    { id: 1, name: "Classic Steel Watch", price: 199, image: "/images/watches/classic-steel-watch.jpg", description: "Elegant steel watch" },
    { id: 2, name: "Sport Digital Watch", price: 149, image: "/images/watches/sport-digital-watch.jpg", description: "Perfect for sports" },
    { id: 3, name: "Leather Strap Watch", price: 179, image: "/images/watches/leather-strap-watch.jpg", description: "Classic leather design" }
];

const premiumWatches = [
    { id: 4, name: "Luxury Gold Watch", price: 2999, image: "/images/watches/luxury-gold-watch.jpg", description: "18k gold luxury" },
    { id: 5, name: "Diamond Watch", price: 4999, image: "/images/watches/diamond-watch.jpg", description: "Diamond encrusted" },
    { id: 6, name: "Swiss Automatic", price: 3499, image: "/images/watches/swiss-automatic-watch.jpg", description: "Swiss movement" }
];

// Get local watches (public)
app.get('/api/watches/local', (req, res) => {
    console.log('🏠 Serving local watches');
    res.json(localWatches);
});

// Get premium watches (protected)
app.get('/api/watches/premium', authenticateToken, (req, res) => {
    console.log('💎 Serving premium watches to:', req.user.username);
    res.json(premiumWatches);
});

// Verify token
app.get('/api/verify', authenticateToken, (req, res) => {
    console.log('🔍 Token verification for:', req.user.username);
    res.json({ valid: true, user: req.user });
});

const PORT = process.env.PORT || 5001;

// Initialize server
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`✅ Backend Server running on http://localhost:${PORT}`);
        console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        console.log('🔥 Ready for registration and login!');
    });
};

startServer();