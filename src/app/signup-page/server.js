const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5001; // Change to any unused port


// Middleware
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/auth_service_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
}));

// Signup API Route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
