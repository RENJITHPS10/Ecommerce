const express = require("express");
const router = express.Router();


const userController = require("../Controllers/userController");
const { protect, authorize } = require("../Middleware/isAuth");

router.post("/register", userController.register);


router.post("/login", userController.login);

// Admin only 
router.get("/admin", protect, authorize("admin"), userController.adminDashboard);

module.exports = router;
