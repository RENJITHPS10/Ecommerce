// const express= require("express")
// const{ getAdminOrders} = require("../Controllers/adminController")
// const adminRoutes = express.Router();


// adminRoutes.get("/fetchadmin",getAdminOrders);


// module.exports=adminRoutes


const express = require("express")
const { getAdminOrders, updateOrderStatus } = require("../Controllers/adminController")


const adminRoutes = express.Router()

adminRoutes.get("/fetchadmin", getAdminOrders)

adminRoutes.put("/update-status/:id", updateOrderStatus)


module.exports = adminRoutes;



