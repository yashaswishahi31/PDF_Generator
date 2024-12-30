const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Add Product
router.post('/', authenticate, (req, res) => {
    const { name, price, description } = req.body;
    // Here, you would normally save the product to the database.
    res.status(201).json({ message: 'Product added successfully!', product: { name, price, description } });
});

module.exports = router;
