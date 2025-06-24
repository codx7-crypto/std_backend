const express = require('express');
const router = express.Router();
const { getAllMajors, getMajorById } = require('../controllers/majorsController');

router.get('/', getAllMajors);
router.get('/:id', getMajorById);

module.exports = router;
