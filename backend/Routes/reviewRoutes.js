const express = require("express");
const { addReview, getProductReviews, getUserReviews } = require("../Controllers/reviewController");
const { protect } = require("../Middleware/isAuth");


const reviewRouter = express.Router();

reviewRouter.post("/add", protect, addReview);
reviewRouter.get("/productreview/:productId", getProductReviews);
reviewRouter.get("/myreviews",protect,getUserReviews)

module.exports = reviewRouter;

