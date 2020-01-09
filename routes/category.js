const express = require('express');
const router = express.Router();

const {requireSignin, isAuth} = require('../controllers/authController')              
const { create,remove,list } = require('../controllers/categoryController');

router.get('/categories', list);
router.post('/create/:userId', create, requireSignin, isAuth);
router.delete('/:categoryId/:userId',remove, requireSignin, isAuth)

module.exports = router;