// import React, { useState } from "react";
// import axios from "axios";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   CheckCircle2,
//   ChevronLeft,
//   ChevronRight,
//   MapPin,
//   IndianRupee,
//   Package,
//   User,
//   LogOut,
// } from "lucide-react";

// const fetchAdminOrders = async () => {
//   const res = await axios.get("http://localhost:5000/api/v1/admin/fetchadmin");
//   return res.data.orders;
// };

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const [filter, setFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const { data: orders = [], isLoading, isError } = useQuery({
//     queryKey: ["adminOrders"],
//     queryFn: fetchAdminOrders,
//   });

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const markAsDelivered = async (orderId) => {
//     await axios.put(
//       `http://localhost:5000/api/v1/admin/update-status/${orderId}`,
//       { status: "Delivered" }
//     );
//     queryClient.invalidateQueries(["adminOrders"]);
//   };

//   const filteredOrders = orders.filter(
//     (order) =>
//       order.status !== "Pending" &&
//       (filter === "All" || order.status === filter)
//   );

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
//   const paginatedOrders = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (isLoading) {
    
    
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//           className="w-20 h-20 border-6 border-t-indigo-600 border-indigo-100 rounded-full"
//         />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
//         <h2 className="text-4xl font-bold text-red-600">Failed to load orders</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
//       <header className="px-6 py-5 border-b border-white/60 backdrop-blur-sm bg-white/70 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//           <div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
//               Admin Dashboard
//             </h1>
//             <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
//               <Package className="w-4 h-4" />
//               Total: <span className="font-bold text-indigo-700">{orders.length}</span> orders
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate("/report")}
//               className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-sm font-bold rounded-xl shadow-lg"
//             >
//               View Report
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
//             >
//               <LogOut className="w-4 h-4" />
//               Logout
//             </motion.button>
//           </div>
//         </div>
//       </header>

//       <div className="px-6 py-4">
//         <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
//           {["All", "Paid", "Delivered"].map((status) => {
//             const count =
//               status === "All"
//                 ? orders.filter((o) => o.status !== "Pending").length
//                 : orders.filter((o) => o.status === status).length;

//             return (
//               <motion.button
//                 key={status}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => {
//                   setFilter(status);
//                   setCurrentPage(1);
//                 }}
//                 className={`px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${
//                   filter === status
//                     ? "bg-indigo-600 text-white shadow-md"
//                     : "bg-white text-gray-700 border hover:bg-gray-50"
//                 }`}
//               >
//                 {status}
//                 <span
//                   className={`px-2 py-0.5 rounded-full text-xs font-bold ${
//                     filter === status
//                       ? "bg-white/30"
//                       : "bg-indigo-100 text-indigo-700"
//                   }`}
//                 >
//                   {count}
//                 </span>
//               </motion.button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="flex-1 px-6 pb-6 overflow-hidden">
//         <div className="h-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
//           <div className="overflow-x-auto flex-1">
//             <table className="w-full min-w-[1000px]">
//               <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs font-bold uppercase">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Customer</th>
//                   <th className="px-4 py-3 text-left">Items</th>
//                   <th className="px-4 py-3 text-left">Total</th>
//                   <th className="px-4 py-3 text-left">Payment</th>
//                   <th className="px-4 py-3 text-left">Order ID</th>
//                   <th className="px-4 py-3 text-center">Status</th>
//                   <th className="px-4 py-3 text-left">Address</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100 text-sm">
//                 {paginatedOrders.map((order) => (
//                   <motion.tr
//                     key={order._id}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.2 }}
//                     className="hover:bg-indigo-50/60 transition-colors"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                           <User className="w-4 h-4 text-indigo-700" />
//                         </div>
//                         <span className="font-medium text-gray-800 truncate max-w-[100px]">
//                           {order.userId.name}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         {order.items.slice(0, 2).map((item) => (
//                           <div key={item.productId} className="flex items-center gap-2">
//                             <img
//                               src={item.image}
//                               alt=""
//                               className="w-8 h-8 object-cover rounded"
//                             />
//                             <span className="text-xs">×{item.quantity}</span>
//                           </div>
//                         ))}
//                         {order.items.length > 2 && (
//                           <span className="text-xs text-indigo-600 font-medium">
//                             +{order.items.length - 2}
//                           </span>
//                         )}
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 font-bold text-indigo-700">
//                       <IndianRupee className="w-4 h-4 inline" />
//                       {order.totalAmount.toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-4 py-3">
//                       <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
//                         {order.paymentId.slice(-8)}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3 font-mono text-xs font-semibold">
//                       {order.orderId}
//                     </td>

//                     <td className="px-4 py-3 text-center">
//                       {order.status === "Delivered" ? (
//                         <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
//                           <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
//                         </span>
//                       ) : (
//                         <motion.button
//                           whileHover={{ scale: 1.08 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => markAsDelivered(order._id)}
//                           className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow hover:shadow-md"
//                         >
//                           Mark Delivered
//                         </motion.button>
//                       )}
//                     </td>

//                     <td className="px-4 py-3 text-gray-600 text-xs max-w-[180px]">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-3.5 h-3.5 text-purple-600" />
//                         <span className="truncate">
//                           {order.userId.address || "—"}
//                         </span>
//                       </div>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center text-sm">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className={`px-5 py-2 rounded-lg font-medium flex items-center gap-1.5 ${
//                 currentPage === 1
//                   ? "bg-gray-200 text-gray-500"
//                   : "bg-white text-indigo-700 shadow-sm"
//               }`}
//             >
//               <ChevronLeft className="w-4 h-4" />
//               Prev
//             </motion.button>

//             <span className="font-medium text-gray-700">
//               Page <span className="text-indigo-600 font-bold">{currentPage}</span> / {totalPages}
//             </span>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className={`px-5 py-2 rounded-lg font-medium flex items-center gap-1.5 ${
//                 currentPage === totalPages
//                   ? "bg-gray-200 text-gray-500"
//                   : "bg-indigo-600 text-white shadow-sm"
//               }`}
//             >
//               Next
//               <ChevronRight className="w-4 h-4" />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// ! orginal code 

import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MapPin,
  IndianRupee,
  Package,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const fetchAdminOrders = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/admin/fetchadmin");
  return res.data.orders;
};

const fetchContacts = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/contact/allcontact");
  return res.data.contacts;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("orders"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchAdminOrders,
  });

  const { data: contacts = [], isLoading: loadingContacts } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const totalPagesOrders = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPagesContacts = Math.ceil(contacts.length / itemsPerPage);
  const paginatedContacts = contacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const markAsDelivered = async (orderId) => {
    await axios.put(`http://localhost:5000/api/v1/admin/update-status/${orderId}`, {
      status: "Delivered",
    });
    queryClient.invalidateQueries(["adminOrders"]);
  };

  if (loadingOrders || loadingContacts) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-6 border-t-indigo-600 border-indigo-100 rounded-full"
        />
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
     
      <header className="px-6 py-5 border-b border-white/60 backdrop-blur-sm bg-white/70 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <Package className="w-4 h-4" />
            Total Orders: <span className="font-bold text-indigo-700">{orders.length}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/report")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-sm font-bold rounded-xl shadow-lg"
          >
            View Report
          </motion.button>
                 {/* produvt edit option */}

                 <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/edit")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-sm font-bold rounded-xl shadow-lg"
          >
            Product edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </header>

      {/* Tabs */}
      
      <div className="px-6 py-4 flex gap-3 max-w-7xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setTab("orders"); setCurrentPage(1); }}
          className={`px-5 py-2 rounded-lg font-medium ${
            tab === "orders" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-700 border hover:bg-gray-50"
          }`}
        >
          Orders
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setTab("contacts"); setCurrentPage(1); }}
          className={`px-5 py-2 rounded-lg font-medium ${
            tab === "contacts" ? "bg-indigo-600 text-white shadow-md" : "bg-white text-gray-700 border hover:bg-gray-50"
          }`}
        >
           Customers Feedback
        </motion.button>
      </div>

      {/* Content */}
      <div className="px-6 py-4 max-w-7xl mx-auto overflow-auto">
        {tab === "orders" ? (
          <table className="w-full min-w-[1000px] bg-white rounded-2xl shadow-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs font-bold uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-indigo-50/60 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-700" /> {order.userId.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                          <span className="text-xs">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-indigo-700">
                    <IndianRupee className="w-4 h-4 inline" />
                    {order.totalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">{order.paymentId.slice(-8)}</td>
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">
                    {order.status === "Delivered" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                      </span>
                    ) : (
                      <motion.button  
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => markAsDelivered(order._id)}
                        className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full shadow hover:shadow-md"
                      >
                        Mark Delivered
                      </motion.button>
                    )}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" /> {order.userId.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full min-w-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs font-bold uppercase">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {paginatedContacts.map((contact) => (
                <tr key={contact._id}>
                  <td className="px-4 py-3">{contact.name}</td>
                  <td className="px-4 py-3">{contact.email}</td>
                  <td className="px-4 py-3">{contact.phone}</td>
                  <td className="px-4 py-3">{contact.message}</td>
                  <td className="px-4 py-3">{new Date(contact.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-lg bg-white shadow-sm border"
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            disabled={tab === "orders" ? currentPage === totalPagesOrders : currentPage === totalPagesContacts}
            onClick={() =>
              setCurrentPage((p) =>
                tab === "orders" ? Math.min(totalPagesOrders, p + 1) : Math.min(totalPagesContacts, p + 1)
              )
            }
            className="px-4 py-2 rounded-lg bg-white shadow-sm border"
          >
            Next
          </button>
        </div>
      </div>
    </div>
   
    
  );
};

export default AdminDashboard;

