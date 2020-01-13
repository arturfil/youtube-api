const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
// missing importing libs

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
//app.use(expressValidator());

// Database Setup
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
}).then(()=> { console.log("Database connected")})

// Routes Setup
app.get('/', (req, res, next) => {
  res.send("hello form por 5000, this is the api!")
})
app.use('/api/users', require('./routes/auth'));
app.use('/api/category', require('./routes/category'));
app.use('/api/videogame', require('./routes/videogame'));


// Listen to Port Setup
const port = process.env.PORT

app.listen(port, () => {
  console.log(`learning platform api server runing on port ${port}`);
})