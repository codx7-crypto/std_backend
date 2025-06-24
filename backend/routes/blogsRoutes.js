const express = require('express');
const router = express.Router();
const { getAllBlogs, getBlogById } = require('../controllers/blogsController');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

module.exports = router;
