// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/authSlice";

// const AdminNavbar = () => {
//   const navigate = useNavigate();
// const dispatch=useDispatch()

//   const handleLogout = () => {
    
//     localStorage.removeItem("token")
//    dispatch(logout())
    
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-white text-2xl font-bold tracking-wide">
//           Admin Dashboard
//         </h1>

//         <button
//           onClick={handleLogout}
//           className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default AdminNavbar;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg">
      <div className="px-8 py-5 flex justify-between items-center">
        {/* Title */}
        <h1 className="text-white text-2xl font-extrabold tracking-tight">
          Admin Dashboard
        </h1>

        {/* Logout Button - Clean & Professional */}
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Subtle bottom shine */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </nav>
  );
};

export default AdminNavbar;