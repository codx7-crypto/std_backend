const express = require('express');
const router = express.Router();
const {getAllNews ,createNews, updateNews, deleteNews , getNewsById}= require('../controllers/newsController');

// GET all news
router.get('/', getAllNews);

// GET news by id
router.get('/:id', getNewsById);

// // POST new news
//router.post('/', createNews);

module.exports = router;
