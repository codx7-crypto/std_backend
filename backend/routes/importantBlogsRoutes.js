const express = require('express');
const router = express.Router();
const { getImportantBlogs } = require('../controllers/importantBlogsController');

router.get('/', getImportantBlogs);

module.exports = router;
