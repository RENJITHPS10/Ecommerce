// const Review = require("../models/reviewModel");

// exports.addReview = async (req, res) => {
//   console.log("Incoming Rating:", req.body);
// console.log("User:", req.user.id);
//   try {
//     const { productId, rating, comment } = req.body;

//     const review = await Review.create({
//       productId,
//       userId: req.user.id,
//       rating,
//       comment,
//     });

//     res.json({
//       success: true,
//       review
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };



// exports.getProductReviews = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     console.log("Product ID received:", productId);

//     const reviews = await Review.find({ productId }).populate("userId", "name");

    
//     const averageRating =
//       reviews.length > 0
//         ? (
//             reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
//           ).toFixed(1)
//         : 0;

//     res.json({
//       success: true,
//       reviews,
//       averageRating,
//       totalReviews: reviews.length,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// ! orginal

// const Review = require("../models/reviewModel");

// // Add new review
// exports.addReview = async (req, res) => {
//   try {
//     const { productId, rating, comment } = req.body;
//     const existingReview = await Review.findOne({ productId, userId: req.user.id });
//     if (existingReview) {
//       return res.status(400).json({ success: false, message: "Already rated this product" });
//     }

//     const review = await Review.create({
//       productId,
//       userId: req.user.id,
//       rating,
//       comment,
//     });

//     res.json({ success: true, review });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all reviews for a product
// exports.getProductReviews = async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const reviews = await Review.find({ productId }).populate("userId", "name");

//     const averageRating =
//       reviews.length > 0
//         ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
//         : 0;

//     res.json({
//       success: true,
//       reviews,
//       averageRating,
//       totalReviews: reviews.length,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all reviews by current user
// exports.getUserReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ userId: req.user.id });
//     res.json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// ! new

// const Review = require("../models/reviewModel");

// // // Add review
// exports.addReview = async (req, res) => {
//   try {
//     const { productId, rating, comment } = req.body;

//     if (!productId || !rating) {
//       return res.status(400).json({ success: false, message: "Product ID and rating are required" });
//     }

//     // Check if user already reviewed this product
//     const existingReview = await Review.findOne({ productId, userId: req.user.id });

//     if (existingReview) {
//       return res.status(400).json({ success: false, message: "You already reviewed this product" });
//     }

//     const review = await Review.create({
//       productId,
//       userId: req.user.id,
//       rating,
//       comment,
//     });

//     res.json({ success: true, message: "Review Added", review });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get reviews for a product
// exports.getProductReviews = async (req, res) => {
//   try {
//     const productId = req.params.productId;

//     const reviews = await Review.find({ productId })
//       .populate("userId", "name email");

//     const averageRating =
//       reviews.length > 0
//         ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
//         : 0;

//     res.json({
//       success: true,
//       reviews,
//       averageRating,
//       totalReviews: reviews.length,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // // Get logged-in user's reviews
// // exports.getUserReviews = async (req, res) => {
// //   try {
// //      console.log("Logged User:", req.user); 
// //     const reviews = await Review.find({ userId: req.user.id }).populate("productId", "name price");
// //     res.json({ success: true, reviews });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };


// exports.getUserReviews = async (req, res) => {
//   try {
//     const userId = req.user._id || req.user.id; // support both

//     const reviews = await Review.find({ userId });

//     return res.status(200).json({ success: true, reviews });

//   } catch (error) {
//     console.log("MyReview Error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // // Add review
// // exports.addReview = async (req, res) => {
// //   try {
// //     const { productId, rating, comment, orderItemId } = req.body;

// //     if (!productId || !rating || !orderItemId) {
// //       return res.status(400).json({ success: false, message: "Product ID, orderItemId and rating are required" });
// //     }

// //     // Check if user already reviewed THIS order item only
// //     const existingReview = await Review.findOne({ orderItemId, userId: req.user.id });

// //     if (existingReview) {
// //       return res.status(400).json({ success: false, message: "You already reviewed this item" });
// //     }

// //     const review = await Review.create({
// //       productId,
// //       userId: req.user.id,
// //       orderItemId, // important to store this
// //       rating,
// //       comment,
// //     });

// //     res.json({ success: true, message: "Review Added", review });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };


// !kjhgv
const Review = require("../models/reviewModel");

// -------------------- Add Review --------------------
// This handles adding a review per order item
exports.addReview = async (req, res) => {
  try {
    const { productId, rating, comment, orderItemId } = req.body;

    // Validation
    if (!productId || !rating || !orderItemId) {
      return res.status(400).json({
        success: false,
        message: "Product ID, orderItemId and rating are required",
      });
    }

    // Check if this order item is already reviewed by this user
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

    // Create review
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

// -------------------- Get Reviews for a Product --------------------
// This returns all reviews for a single product
exports.getProductReviews = async (req, res) => {
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

// -------------------- Get Reviews by Logged-in User --------------------
exports.getUserReviews = async (req, res) => {
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
