const express = require('express');
const router = express.Router();
const { getMajorsNames } = require('../controllers/majorsnamescontroller');

router.get('/', getMajorsNames);

module.exports = router;

