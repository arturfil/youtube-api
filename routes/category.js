const express = require('express');
const router = express.Router();

const {isAuth} = require('../controllers/authController');
const {remove,create} = require('../controllers/categoryController')
const {userById} = require('../controllers/authController')

router.post('/create/:userId',create, isAuth)
router.delete('/:categoryId/:userId',remove, isAuth);

router.param('userId', userById);

module.exports = router;