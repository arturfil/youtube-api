const express = require('express');
const router = express.Router();

const { list, create, remove, videogameById, photo} = require('../controllers/videogameController');
const { requireSignin, isAuth, userById } = require('../controllers/authController');

// list 
router.get('/videogames', list);
router.get('/photo/:videogameId', photo);
// create videogame
router.post('/create/:userId', create, isAuth, requireSignin);
// delete
router.delete('/:videogameId/:userId', remove, isAuth, requireSignin);

// parameters
router.param("userId", userById);
router.param("videogameId", videogameById);

module.exports = router;