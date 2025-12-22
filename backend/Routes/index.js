const express = require('express');
const router = express.Router();


const userRoutes = require('./userRoutes');
const productRouter = require('./productRouter');
const contactRouter = require('./contactRouter');
const cartRouter=require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const paymentRouter = require('./paymentRoutes');
const adminRoutes = require('./adminRoutes');
const reviewRouter = require('./reviewRoutes');





router.use('/get',userRoutes)
router.use('/uplodefile',userRoutes)
router.use('/users', userRoutes)
router.use("/product",productRouter)
router.use("/contact",contactRouter)
router.use("/cart", cartRouter);
router.use("/order",orderRoutes)
router.use("/payment",paymentRouter)
router.use("/admin",adminRoutes)
router.use("/rate",reviewRouter)










module.exports = router;
