import asynchandler from "express-async-handler";
import Product from "../models/productModel.js";
import uploadFromBuffer from "../utils/cloudinaryUpload.js";



export const createProduct = asynchandler(async (req, res) => {
  const { pname, price, category, soldcount } = req.body;

  if (!pname || !price || !category) {
    return res.status(400).json({ message: "These are required fields" });
  }

  let imageUrl = null;
  let cloudinaryId = null;

  if (req.file) {
    const result = await uploadFromBuffer(req.file.buffer, "product_uploads");
    imageUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const newProduct = await Product.create({
    pname,
    price,
    image: imageUrl,
    category,
    cloudinary_id: cloudinaryId,
    soldcount,
  });

  res.status(201).json({
    message: "Product created successfully!",
    newProduct,
  });
});


export const readproduct = asynchandler(async (req, res) => {
  const { category } = req.query;
  let filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  const readproduct = await Product.find(filter);

  if (!readproduct || readproduct.length === 0) {
    return res.status(404).json({ message: "No products found" });
  }

  res.status(200).json({ success: true, readproduct });
});


export const updateProduct = asynchandler(async (req, res) => {
  const { pname, price, image, category } = req.body;

  const updatedValue = { pname, price, image, category };

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    updatedValue,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product updated", updatedProduct });
});


export const deleteproduct = asynchandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted", deletedProduct });
});



export const uploadFile = asynchandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const result = await uploadFromBuffer(req.file.buffer, "my_uploads");

  const file = await Product.create({
    filename: req.file.originalname,
    url: result.secure_url,
    cloudinary_id: result.public_id,
  });

  res.status(201).json({
    message: "File uploaded successfully",
    file,
  });
});



export const getProductById = asynchandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ success: true, product });
});



export const getAllFiles = asynchandler(async (req, res) => {
  const files = await Product.find();
  res.status(200).json(files);
});
