const express = require('express');
const router = express.Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Creating a new blog post
router.post('/', withAuth, async (req, res) => {
    try { 
        const { title, content } = req.body;
        const newBlog = await Blog.create({
            title,
            content, 
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Updating the post