const express = require('express');
const router = express.Router();

const {requireSignin, isAuth} = require('../controllers/authController')              
const { create,remove } = require('../controllers/categoryController');

router.post('/create/:userId', create, requireSignin, isAuth);
router.delete('/:categoryId/:userId',remove, requireSignin, isAuth)

module.exports = router;