const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');

router
.use('/users',userRoutes)
.use('/blogs',blogRoutes)
.use('/comments', commentRoutes);

module.exports = router;
