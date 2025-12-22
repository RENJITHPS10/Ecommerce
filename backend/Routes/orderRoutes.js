const express = require("express")
const { createOrder, getMyOrders, rateProduct } = require("../Controllers/orderController")
const { protect } = require("../Middleware/isAuth")



const orderRoutes = express.Router()

orderRoutes.post("/create", protect, createOrder)
orderRoutes.get("/myorder",protect,getMyOrders)
orderRoutes.post("/rate", protect,rateProduct)





module.exports=orderRoutes