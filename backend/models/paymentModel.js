import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      size: String,
      image:String
    },
  ],
  amount: { type: Number, required: true }, 
  currency: { type: String, default: "INR" },

 
  paymentId: { type: String },            
  orderId: { type: String },              
  signature: { type: String },            
  status: { type: String, default: "created" }, 

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", paymentSchema);
