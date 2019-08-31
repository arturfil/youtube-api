const express = require('express');
const router = express.Router();

const {userById, isAuth} = require('../controllers/authController');
const {list, create,remove, videogameById} = require('../controllers/videogamesController');

router.get('/', list);
router.post('/create/:userId',create, isAuth);
router.delete('/:videogameId/:userId',remove, isAuth);

router.param("userId", userById);
router.param("videogameId", videogameById);

module.exports = router;