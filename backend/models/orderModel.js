import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        isRated: { type: Boolean, default: false }
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
     

    
    paymentId: String,   

    // Rpay Orderid
    orderId: String,

    
    imageId:String,

    status: {
      type: String,
      default: "Paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);



