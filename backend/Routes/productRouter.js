const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const upload = require("../Middleware/multer");
const { createMessage } = require("../Controllers/contactController");
const { protect, authorize } = require("../Middleware/isAuth");

// Product CRUD routes admin part 
router.post("/create",protect, authorize("admin"), upload.single("image"), productController.createProduct);
router.get("/all", productController.readproduct);
router.put("/update/:id", protect,authorize("admin"), productController.updateProduct);
router.delete("/delete/:id", protect,authorize("admin"), productController.deleteproduct);
router.get("/:id",productController.getProductById)

// File upload routes 
router.post("/upload", protect,authorize("admin"),upload.single("file"), productController.uploadFile);
router.get("/files", protect,authorize("admin"), productController.getAllFiles);




module.exports = router;
