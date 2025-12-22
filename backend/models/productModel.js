const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  pname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    require: true,
  },
  filename: {
    type: String,
  },

  url: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  },
  uploadedAt: { type: Date, default: Date.now },


  soldcount:{
    type:Number,
    default:0,
  }
});



const Product = mongoose.model("product", productSchema);

module.exports = Product;

