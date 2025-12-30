import express from "express";
import { addReview, getProductReviews, getUserReviews } from "../Controllers/reviewController.js";
import { protect } from "../Middleware/isAuth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", protect, addReview);
reviewRouter.get("/productreview/:productId", getProductReviews);
reviewRouter.get("/myreviews", protect, getUserReviews);

export default reviewRouter;
