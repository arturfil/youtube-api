const express = require('express');
const router = express.Router();

const { list, create, remove, videogameById} = require('../controllers/videogamesController');
const { requireSignin, isAuth, userById } = require('../controllers/authController');

// list 
router.get('/videogames', list)
// create videogame
router.post('/create/:userId', create, isAuth, requireSignin)
// delete
router.delete('/:videogameId/:userId', remove, isAuth, requireSignin)

// parameters
router.param("userId", userById);
router.param("", videogameById);

module.exports = router;