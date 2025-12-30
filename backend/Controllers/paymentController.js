import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import "dotenv/config";

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const amount =
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) *
      100;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    await Payment.create({
      userId,
      products: cartItems,
      amount,
      currency: "INR",
      orderId: razorpayOrder.id,
      status: "created",
    });

    res.json({ order: razorpayOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Create order failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!payment)
      return res.status(404).json({ message: "Payment not found" });

    payment.paymentId = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "paid";
    await payment.save();

    const totalAmount = payment.amount / 100;

    const newOrder = await Order.create({
      userId: payment.userId,
      items: payment.products,
      totalAmount,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "Paid",
    });

    for (const item of payment.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { soldCount: item.quantity },
      });
    }

    res.json({
      message: "Payment successful",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};

