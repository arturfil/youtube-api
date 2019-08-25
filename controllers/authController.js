const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express');
const {errorHandler} = require('../helpers/dberrorHandler')

exports.test = (req, res) => {
  res.json({message:"testing controllers"});
}

exports.signup = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if(error) {
      return res.status(400).json({
        error: errorHandler(error)
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    })
  })
};