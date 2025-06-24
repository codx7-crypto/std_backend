const express = require('express');
const router = express.Router();
const { getUniversities } = require('../controllers/searchuniversitiesController');

router.get('/', getUniversities);

module.exports = router;

