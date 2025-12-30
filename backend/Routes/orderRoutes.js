import express from "express";
import { createOrder, getMyOrders, rateProduct } from "../Controllers/orderController.js";
import { protect } from "../Middleware/isAuth.js";



const orderRoutes = express.Router();

orderRoutes.post("/create", protect, createOrder);
orderRoutes.get("/myorder", protect, getMyOrders);
orderRoutes.post("/rate", protect, rateProduct);





export default orderRoutes;