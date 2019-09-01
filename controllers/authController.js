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

exports.signin = (req,res) => {
  const {email,password} = req.body
  User.findOne({email},(error,user) => {
    if(error||!user) {
      return res.status(400).json({
        error: "User with that email does not exists"
      });
    }
    // if user is found make user the email and hashed password match 
    // create authenticate method in user model
    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and poassword don\'t match'
      });
    }
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    // perist the token as 't' in cookie with expiration data
    res.cookie('t',token,{expire: new Date() + 9999})
    // return response with user and token to front end
    const {_id, name, email, role} = user
    return res.json({token,user: {_id, email,name, role}})
  });
}

exports.signout = (req,res) => { 
  res.clearCookie('t')
  res.json({message:"Signout success!"})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty:"auth",
});

exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth &&
  req.profile._id == req.auth._id
  if(!user) {
    return res.status(403).json({
      error: "Access Denied"
    });
  }
  next();
}

exports.userById = (req,res,next,id) => {
  User.findById(id).exec((err, user) => {
    if(err||!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next()
  })
}