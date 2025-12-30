
import Review from "../models/reviewModel.js";

export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, orderItemId } = req.body;

    if (!productId || !rating || !orderItemId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, orderItemId and rating are required",
      });
    }

    const existingReview = await Review.findOne({
      orderItemId,
      userId: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this item",
      });
    }

    const review = await Review.create({
      productId,
      userId: req.user.id,
      orderItemId,
      rating,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (err) {
    console.error("Add review error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const reviews = await Review.find({ productId }).populate(
      "userId",
      "name email"
    );

    const averageRating =
      reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return res.status(200).json({
      success: true,
      reviews,
      averageRating,
      totalReviews: reviews.length,
    });
  } catch (err) {
    console.error("Get product reviews error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ userId });

    return res.status(200).json({
      success: true,
      reviews,
    });
  } catch (err) {
    console.error("Get user reviews error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
