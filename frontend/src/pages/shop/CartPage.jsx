import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { useUser } from "../context/UserContext";

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const createOrder = async ({ userId, cartItems }) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/payment/createorder",
    { userId, cartItems }
  );
  return res.data.order;
};

const verifyPayment = async (payload) => {
  const res = await axios.post(
    "http://localhost:5000/api/v1/payment/verify",
    payload
  );
  return res.data;
};

const placeOrder = async (cartItems) => {
  const res = await axios.post("http://localhost:5000/api/orders/place", {
    cartItems,
  });
  return res.data.order;
};

const CartPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state: userState, dispatch } = useUser();
  const { user } = userState;
  const userId = user?.id;

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState(user?.address || "");

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/api/v1/cart/getcart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return res.data;
    },
    enabled: !!localStorage.getItem("authToken"),
  });

  const cart = data?.cart || [];

  const updateAddressMutation = useMutation({
    mutationFn: (address) =>
      axios.put(
        "http://localhost:5000/api/v1/users/update-address",
        { address },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      ),
    onSuccess: (res) => {
      dispatch({ type: "UPDATE_ADDRESS", payload: res.data.user.address });
      setIsEditingAddress(false);
      alert("Address updated!");
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to update address");
    },
  });

  const handleUpdateAddress = () => {
    if (!newAddress.trim()) return alert("Address cannot be empty");
    updateAddressMutation.mutate(newAddress);
  };

  const clearCart = useMutation({
    mutationFn: () =>
      axios.delete("http://localhost:5000/api/v1/cart/clear", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const updateQuantity = useMutation({
    mutationFn: ({ id, action }) =>
      axios.put(
        `http://localhost:5000/api/v1/cart/update/${id}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      ),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const removeItem = useMutation({
    mutationFn: (id) =>
      axios.delete(`http://localhost:5000/api/v1/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }),
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const orderMutation = useMutation({ mutationFn: createOrder });
  const verifyMutation = useMutation({ mutationFn: verifyPayment });

  const checkoutHandler = async () => {
    if (cart.length === 0) return alert("Cart empty!");
    if (!userId) return alert("Please login to continue");

    const sdkLoaded = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!sdkLoaded) return alert("Razorpay failed to load");

    try {
      const order = await orderMutation.mutateAsync({
        userId,
        cartItems: cart,
      });

      const options = {
        key: "rzp_test_Rh66fuEB6ifCUW",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "MyShop",
        description: "Order Payment",
        handler: async function (response) {
          const verifyRes = await verifyMutation.mutateAsync(response);
          if (verifyRes.message === "Payment successful") {
            await clearCart.mutateAsync();
            navigate("/placeorder", {
              state: {
                success: true,
                items: cart,
                totalAmount: total,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                userId: user.id,
              },
            });
          }
        },
        theme: { color: "#121212" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment failed");
      console.error(err);
    }
  };

  if (isLoading) return <p className="p-6 text-center">Loading cart...</p>;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
                <img src={item.image} className="w-24 h-24 object-cover rounded-xl shadow-inner" alt={item.name} />
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-gray-800">{item.name}</h2>
                  <p className="font-semibold text-indigo-600 text-lg">₹{item.price}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="bg-gray-100 rounded-full px-1 py-1 flex items-center gap-4 border border-gray-200">
                      <button
                        onClick={() => updateQuantity.mutate({ id: item._id, action: "decrease" })}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-gray-200 transition"
                      >
                        -
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity.mutate({ id: item._id, action: "increase" })}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:bg-gray-200 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm("Remove this item?")) removeItem.mutate(item._id);
                  }}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Address Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-700 text-lg uppercase tracking-wider">Delivery Address</h3>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  {isEditingAddress ? <X size={20} /> : <Edit2 size={18} />}
                </button>
              </div>

              {isEditingAddress ? (
                <div className="space-y-3">
                  <textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    rows="3"
                    placeholder="Enter your delivery address..."
                  />
                  <button
                    onClick={handleUpdateAddress}
                    disabled={updateAddressMutation.isLoading}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:bg-gray-400"
                  >
                    <Check size={18} /> Update Address
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200 italic">
                  {user?.address || "No address specified"}
                </p>
              )}
            </div>

            {/* Summary Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
              <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 uppercase font-bold text-xs">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between text-xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={checkoutHandler}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => clearCart.mutate()}
                  className="w-full py-3 text-red-500 font-semibold hover:bg-red-50 rounded-xl transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;



