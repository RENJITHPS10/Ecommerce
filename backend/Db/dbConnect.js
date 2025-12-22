const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async () => {
    try {
         await mongoose.connect(process.env.URI)
         console.log("DB connected")   
    }catch (error) {
    console.error("DB Not Connected",error)
  
    
    }
}
module.exports=connectDB