const Category = require('../models/Category');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.create = (req, res) => {
  const category = new Category(req.body)
  category.save((err,data) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({data});
  })
}

exports.remove = (req, res) => {
  const category = req.category
  category.remove((err,data) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Category deleted succesfully"
    })
  })
}