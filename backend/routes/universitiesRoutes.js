const express = require('express');
const router = express.Router();
const { getAllUniversities, getUniversityById } = require('../controllers/universitiesController');

router.get('/', getAllUniversities);
router.get('/:id', getUniversityById);

module.exports = router;

