const express=require("express")
const { createOrder, verifyPayment } = require("../Controllers/paymentController")
const paymentRouter=express.Router()

paymentRouter.post("/createorder",createOrder)
paymentRouter.post("/verify",verifyPayment)


module.exports=paymentRouter