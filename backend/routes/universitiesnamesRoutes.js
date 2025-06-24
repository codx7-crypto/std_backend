const express = require('express');
const router = express.Router();
const { getUniversityNames } = require('../controllers/universitiesnamescontroller');

router.get('/', getUniversityNames);

module.exports = router;

