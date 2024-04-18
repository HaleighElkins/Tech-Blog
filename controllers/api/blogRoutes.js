const express = require('express');
const router = express.Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Updating a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog || blog.user_id !== req.session.user_id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await blog.update(req.body);
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog || blog.user_id !== req.session.user_id) {
      return res.status(404).json({ message: 'Blog not found or unauthorized' });
    }
    await blog.destroy();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
