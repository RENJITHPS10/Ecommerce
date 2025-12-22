// import { motion } from "framer-motion";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const getProducts = async () => {
//   const res = await axios.get("http://localhost:5000/api/v1/product/all");
//   return res.data;
// };

// function Collection() {
//   const navigate = useNavigate();
//   const { search } = useContext(ShopContext);

//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["products"],
//     queryFn: getProducts,
//   });

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
//       </div>
//     );

//   if (isError)
//     return (
//       <div className="text-center mt-10 font-semibold text-red-600">
//         Failed to load products.
//       </div>
//     );

//   const products = data?.readproduct || [];

 
//   const filteredProducts = products.filter((p) => {
//     const matchCat =
//       selectedCategory === "All"
//         ? true
//         : p.category.toLowerCase() === selectedCategory.toLowerCase();

//     const matchSearch =
//       p.pname.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase());

//     return matchCat && matchSearch;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-6 py-12">

      
//       <motion.div
//         className="text-center mb-14"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm">
//           Latest Collection
//         </h1>
//         <p className="text-gray-600 mt-2 text-lg">
//           Fresh styles. Premium vibes. Made for you.
//         </p>
//       </motion.div>

     
//       <motion.div
//         className="flex justify-center mb-10 gap-4 flex-wrap"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {["All", "Mens", "Womens", "Kids"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-6 py-2.5 rounded-full font-medium shadow-md transition-all duration-200 backdrop-blur-md ${
//               selectedCategory === cat
//                 ? "bg-indigo-600 text-white scale-105 shadow-indigo-300"
//                 : "bg-white/70 text-gray-700 hover:bg-indigo-100"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </motion.div>

      
//       <motion.div
//         className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((p, i) => (
//             <motion.div
//               key={p._id}
//               onClick={() => navigate(`/product/${p._id}`)}
//               className="bg-white/70 backdrop-blur-lg shadow-lg rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.06 }}
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="relative">
//                 <img
//                   src={p.image}
//                   alt={p.pname}
//                   className="w-full h-64 object-cover"
//                 />
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity"
//                 />
//               </div>

//               <div className="p-5 text-center">
//                 <h2 className="font-bold text-xl text-gray-800">{p.pname}</h2>
//                 <p className="text-indigo-600 font-semibold mt-1 text-lg">
//                   ₹{p.price}
//                 </p>
//                 <p className="text-gray-500 mt-1 text-sm tracking-wide">
//                   {p.category}
//                 </p>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <motion.p
//             className="col-span-full text-center text-gray-500 text-xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             No matching products found.
//           </motion.p>
//         )}
//       </motion.div>
//     </div>
//   );
// }

// export default Collection;

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const getProducts = async () => {
  const res = await axios.get("http://localhost:5000/api/v1/product/all");
  return res.data;
};

function Collection() {
  const navigate = useNavigate();
  const { search } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold text-lg">Failed to load products</p>
      </div>
    );
  }

  const products = data?.readproduct || [];

  const filteredProducts = products.filter((p) => {
    const matchCat =
      selectedCategory === "All" ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch =
      !search ||
      p.pname.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    return matchCat && matchSearch;
  });

  const categories = ["All", "Mens", "Womens", "Kids"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-16 px-6 lg:px-12">

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h6 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
          Latest <span className="text-indigo-600">Collection</span>
        </h6>
        {/* <p className="text-xl text-gray-600 mt-4 font-light tracking-wide">
          Curated with elegance. Designed for you.
        </p> */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-8 rounded-full"
        />
      </motion.header>

      {/* Category Tabs */}
      <div className="flex justify-center gap-10 mb-20 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span
              className={`text-lg font-medium transition-all duration-300 px-2 py-1 rounded-lg ${
                selectedCategory === cat
                  ? "text-indigo-600 font-bold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {cat}
            </span>

            {selectedCategory === cat && (
              <motion.div
                layoutId="activeCategory"
                className="absolute -bottom-2 left-0 right-0 h-1 bg-indigo-600 rounded-full shadow-lg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <motion.div
              className="absolute inset-0 rounded-lg bg-indigo-100 opacity-0 group-hover:opacity-30 -z-10 blur-xl transition-opacity"
            />
          </motion.button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p, i) => (
            <motion.div
              key={p._id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.03 }}
              onClick={() => navigate(`/product/${p._id}`)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.pname}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay (kept) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info */}
                <div className="p-6 text-center bg-white">
                  <h3 className="font-semibold text-xl text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {p.pname}
                  </h3>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-3">
                    ₹{p.price}
                  </p>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-300/50 pointer-events-none transition-all duration-500"
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-32">
            <p className="text-3xl font-light text-gray-500">No products found</p>
            <p className="text-gray-400 mt-3">Try adjusting your filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Collection;
