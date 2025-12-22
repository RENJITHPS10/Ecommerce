const express = require("express")
const cartRouter = express.Router()



const { addToCart, getCart, clearCart, updateQuantity, } = require("../Controllers/cartController.js")

cartRouter.post("/addcart", addToCart)
cartRouter.get("/getcart", getCart)
cartRouter.delete("/clear", clearCart )
cartRouter.put("/update/:id",updateQuantity)



module.exports = cartRouter;
