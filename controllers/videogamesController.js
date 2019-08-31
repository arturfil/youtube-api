const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const VideoGame = require('../models/VideoGame');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.videogameById = (req, res, next, id) => {
  VideoGame.findById(id)
    .populate("category")
    .exec((err, product) => {
      console.log("from controller",product)
      if (err||!product) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      })
    }
    const {name,description, price, category,quantity,shipping} = fields;
    let videogame = new VideoGame(fields);

    if(files.photo) {
      if(files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        })
      }
      videogame.photo.data = fs.readFileSync(files.photo.path);
      videogame.photo.contentType = files.photo.type;
    }
    videogame.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    })
  })
}

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order: 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6

  VideoGame.find()
    .send("-photo")
    .populate("category")
    .sort([sortBy,order])
    .limit(limit)
    .exec((err,videogames) => {
      if(err) {
        return res.status(400).json({
          error: "Video Games not found"
        })
      }
      res.json(videogames);
    })
}

exports.remove = (req, res) => {
  let videogame = req.videogame;
  videogame.remove((err, deletedVideoGame) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      "message":"Product was successfully deleted"
    })
  })
}