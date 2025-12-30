import express from "express";
const router = express.Router();

import userRoutes from "./userRoutes.js";
import productRouter from "./productRouter.js";
import contactRouter from "./contactRouter.js";
import cartRouter from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import paymentRouter from "./paymentRoutes.js";
import adminRoutes from "./adminRoutes.js";
import reviewRouter from "./reviewRoutes.js";

router.use("/get", userRoutes);
router.use("/uplodefile", userRoutes);
router.use("/users", userRoutes);
router.use("/product", productRouter);
router.use("/contact", contactRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRoutes);
router.use("/payment", paymentRouter);
router.use("/admin", adminRoutes);
router.use("/rate", reviewRouter);

export default router;
