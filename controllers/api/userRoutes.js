const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Middleware
router.use((req, res, next) => {
    res.handleUnauthroized = () => res.status (400).json({ message: 'Incorrect email or password, try again'});
    res.handleBadRequerst = (err) => res.status(400).json({ error: err.message });
    next();
});

