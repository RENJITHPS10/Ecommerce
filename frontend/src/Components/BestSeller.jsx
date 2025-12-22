// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
// import Title from "./Title";
// import { motion } from "framer-motion";

// const BestSeller = () => {
//   const { products } = useContext(ShopContext);
//   const [bestSeller, setBestSeller] = useState([]);

//   useEffect(() => {
//     if (Array.isArray(products)) {
//       const bestProducts = products
//         .filter((item) => item.soldCount > 0) 
//         .sort((a, b) => b.soldCount - a.soldCount) 
//         .slice(0, 5); 

//       setBestSeller(bestProducts);
//     }
//   }, [products]);

//   if (!Array.isArray(products)) {
//     return (
//       <div className="text-center py-10 text-gray-500"></div>
//     );
//   }

//   return (
//     <section className="my-16 px-6 md:px-12">
//       <div className="text-center mb-10">
//         <Title text1="BEST" text2="SELLERS" />
//         <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base mt-3">
//           Our top-selling products, loved by customers worldwide!
//         </p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
//         {bestSeller.length > 0 ? (
//           bestSeller.map((item, index) => (
//             <motion.div
//               key={item._id || index}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
//                 <p className="text-black-500 font-medium mt-1">${item.price}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Sold: {item.soldCount}
//                 </p>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No best sellers found.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default BestSeller;


import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { motion } from "framer-motion";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const bestProducts = products
        .filter((item) => item.soldCount > 0)
        .sort((a, b) => b.soldCount - a.soldCount)
        .slice(0, 5);
      setBestSeller(bestProducts);
    }
  }, [products]);

  if (!Array.isArray(products)) {
    return <div className="text-center py-20 text-gray-500"></div>;
  }

  // Container stagger animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  // Individual card animation
  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.8,
      rotateY: 15,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    hover: {
      y: -16,
      scale: 1.06,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="my-20 px-6 md:px-12 lg:px-24">
      <div className="text-center mb-14">
        <Title text1="BEST" text2="SELLERS" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg mt-4 font-light tracking-wide"
        >
          Our top-selling products, loved by customers worldwide!
        </motion.p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
      >
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <motion.div
              key={item._id || index}
              variants={cardVariant}
              whileHover="hover"
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image with parallax-like zoom */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Shiny overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Rank Badge */}
                {index < 3 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                    className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-10"
                  >
                    #{index + 1} BEST
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <motion.div
                className="p-5 text-center bg-gradient-to-b from-transparent to-gray-50"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                  {item.name}
                </h3>
                <motion.p
                  className="text-2xl font-extrabold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                >
                  ${item.price}
                </motion.p>
                <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
                  <span className="text-amber-500">Star</span> {item.soldCount} sold
                </p>
              </motion.div>

              {/* Floating particles effect on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{ x: 0, y: 0 }}
                    animate={{
                      x: [0, Math.random() * 200 - 100],
                      y: [0, Math.random() * 200 - 100],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 8}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-20 text-lg">
            No best sellers found.
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default BestSeller;