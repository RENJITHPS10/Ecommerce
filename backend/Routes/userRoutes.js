import express from "express";
const router = express.Router();

import * as userController from "../Controllers/userController.js";
import { protect, authorize } from "../Middleware/isAuth.js";

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/admin", protect, authorize("admin"), userController.adminDashboard);
router.put("/update-address", protect, userController.updateAddress);
router.get("/profile", protect, userController.getProfile);

export default router;
