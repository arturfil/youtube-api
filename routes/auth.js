const express = require('express');
const router = express.Router();

const {test, signup} = require('../controllers/authController');

router.get('/',  test);
router.post('/signup', signup);

module.exports = router;