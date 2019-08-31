const express = require('express');
const router = express.Router();

const {test, signup, signin, signout, requireSignin} = require('../controllers/authController');

router.get('/',  test);
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout)

module.exports = router;