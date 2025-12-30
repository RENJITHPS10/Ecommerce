import express from "express";
const cartRouter = express.Router();

import { addToCart, getCart, clearCart, updateQuantity } from "../Controllers/cartController.js";

cartRouter.post("/addcart", addToCart);
cartRouter.get("/getcart", getCart);
cartRouter.delete("/clear", clearCart);
cartRouter.put("/update/:id", updateQuantity);

export default cartRouter;
