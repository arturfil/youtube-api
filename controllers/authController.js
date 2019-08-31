const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express');
const {errorHandler} = require('../helpers/dberrorHandler')

exports.test = (req, res) => {
  res.json({message:"testing controllers"});
}

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err,user) => {
    if(err||!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next()
  });
};

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

exports.signin = (req,res) => {
  const {email, password} = req.body
  User.findOne({email},(error,user) => {
    if(error || !user) {
      return res.status(400).json({
        error: 'User with email does not exist'
      });
    }
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password don\'t match'
      });
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    // persist the token as 't' in cookie with the expiration date 
    res.cookie('t',token,{expire:new Date() + 9999})
    // return response with expiration date
    const {_id,name,email,role} = user;
    return res.json({token, user: {_id, email, name, role}})
  });
}

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({message: "Sign out successful"})
}

exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth && req.profile._id == req.aut._id
  if(!user) {
    return res.status(403).json({
      error: 'Access denied'
    });
  }
  next();
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
})