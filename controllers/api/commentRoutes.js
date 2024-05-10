const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            // copies the properirtes for the req.body and passing them as attributes
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
