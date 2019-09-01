const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const VideoGame = require('../models/VideoGame');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
  let limit = req.query.limit ? parseInt(req.query.limit) : 12

  VideoGame.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, videogames) => {
      if(err) {
        return res.status(400).json({
          error: "Videogames not found"
        })
      }
      res.json(videogames);
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

    // check for all fields
    const {name, description, price, category, quantity} = fields

    let videogame = new VideoGame(fields)

    // 1kb = 1000 bytes
    // 1mb = 1,000,000 bytes

    if(files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size"
        })
      }
      videogame.photo.data = fs.readFileSync(files.photo.path)
      videogame.photo.contentType = files.photo.type
    }

    videogame.save((err, result) => {
      if(err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let videogame = req.videogame
  videogame.remove((err, deletedVideogame) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({
      message: "Product deleted successfully"
    })
  })
}

exports.videogameById = (req, res, next, id) => {
  VideoGame.findById(id)
    .populate("category")
    .exec((err, videogame) => {
      console.log("form controller", videogame);
      if(err || !videogame) {
        return res.status(400).json({
          error: "Videogame not found"
        });
      }
      req.videogame = videogame;
      next();
    })
}
