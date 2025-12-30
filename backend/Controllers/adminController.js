import Order from "../models/orderModel.js";

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("getAdminOrders ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching admin orders",
      error: err.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
