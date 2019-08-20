const express = require('express');
const mongoose = require('mongoose');
// missing importing libs

const app = express();

// Middlewares

// Database Setup

// Routes Setup
app.get('/', (req, res, next) => {
  res.send("hello form por 5000, this is the api!")
})

// Listen to Port Setup
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`learning platform api server runing on port ${port}`)
})