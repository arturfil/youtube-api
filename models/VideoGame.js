const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const videogameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      require: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      trim: true,
      maxlength: 32
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String
    },
    shipping: {
      required: false,
      type: Boolean
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("VideoGame",videogameSchema);