// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { Star, ShoppingCart, Facebook, Twitter, Instagram } from "lucide-react";
// import { motion } from "framer-motion";

// // Fetch single product
// const fetchProductById = async (id) => {
//   const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
//   const productData = res.data.product;

//   productData.images = productData.images || [productData.image || ""];
//   return productData;
// };

// const Product = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState(0);

 
//   const [reviews, setReviews] = useState([]);

//   // Fetch product
//   const { data: product, isLoading, isError } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => fetchProductById(productId),
//   });

  
//   const autoDiscount =
//     product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : null;

  
//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/v1/rate/productreview/${productId}`);
//       setReviews(res.data.reviews);
//     } catch (err) {
//       console.log(err);
//     }
//   };

  
//   const addToCartMutation = useMutation({
//     mutationFn: async () => {
//       return axios.post("http://localhost:5000/api/v1/cart/addcart", {
//         productId: product._id,
//         name: product.pname,
//         price: product.price,
//         image: product.images[0],
//         size: selectedSize,
//         quantity,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart"]);
//       navigate("/cart");
//     },
//     onError: () => alert("Failed to add item to cart"),
//   });

//   const handleAddToCart = async () => {
//     if (!selectedSize) return alert("Please select a size");
//     await addToCartMutation.mutateAsync();
//   };

  
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
//       </div>
//     );

//   if (isError || !product)
//     return <div className="text-center mt-10 font-semibold">Failed to load.</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="px-6 py-12 max-w-6xl mx-auto flex-1">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          
//           <div>
//             <motion.img
//               key={activeImage}
//               src={product.images[activeImage]}
//               alt={product.pname}
//               className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border border-gray-200"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0.7, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             />

//             <div className="flex gap-4 mt-4 justify-center">
//               {product.images.map((img, idx) => (
//                 <motion.img
//                   key={idx}
//                   src={img}
//                   onClick={() => setActiveImage(idx)}
//                   whileHover={{ scale: 1.2 }}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
//                     activeImage === idx
//                       ? "border-indigo-600 shadow-lg"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

          
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
//               {product.pname}
//             </h1>

//             <div className="flex items-center gap-4 mt-3">
//               <p className="bg-gray-100 px-3 py-1 rounded-full shadow-sm text-gray-700">
//                 Category: {product.category}
//               </p>

//               {/* <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full shadow-sm">
//                 <Star className="text-yellow-400" fill="gold" />
//                 <p className="font-semibold text-gray-700">{product.rating || 5}/5</p>
//               </div> */}
//             </div>

           
//             <div className="mt-5 flex items-center gap-4">
//               <p className="text-3xl font-bold text-indigo-600 drop-shadow-md">₹{product.price}</p>
//               {product.oldPrice && <p className="line-through text-gray-400">₹{product.oldPrice}</p>}
//               {(product.discount || autoDiscount) && (
//                 <p className="text-white bg-green-500 px-3 py-1 rounded-full font-semibold">
//                   {product.discount ? `${product.discount}% OFF` : `${autoDiscount}% OFF`}
//                 </p>
//               )}
//             </div>

//             <p className="mt-5 text-gray-700">{product.description}</p>

            
//             <div className="mt-6">
//               <p className="font-semibold text-gray-800 mb-2">Select Size</p>
//               <div className="flex gap-3">
//                 {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-5 py-2 rounded-full border font-medium transition-all ${
//                       selectedSize === size
//                         ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
//                         : "bg-white border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

           
//             <div className="mt-6 flex items-center gap-4">
//               <p className="font-semibold text-gray-800">Quantity:</p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setQuantity((p) => Math.max(1, p - 1))}
//                   className="px-4 py-2 bg-gray-300 rounded-md"
//                 >
//                   -
//                 </button>
//                 <span>{quantity}</span>
//                 <button
//                   onClick={() => setQuantity((p) => p + 1)}
//                   className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

            
//             <button
//               onClick={handleAddToCart}
//               disabled={!selectedSize}
//               className={`mt-8 w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-xl transition-all 
//                 ${
//                   selectedSize
//                     ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }
//               `}
//             >
//               <ShoppingCart size={22} /> Add to Cart
//             </button>

//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-16 bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

//           {reviews.length === 0 ? (
//             <p className="text-gray-600 text-lg">No reviews yet.</p>
//           ) : (
//             <div className="space-y-6">
//               {reviews.map((r) => (
//                 <motion.div
//                   key={r._id}
//                   whileHover={{ scale: 1.02 }}
//                   className="border border-gray-200 p-6 rounded-xl shadow-sm"
//                 >
//                   {/* <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full shadow-sm">
//                 <Star className="text-yellow-400" fill="gold" />
//                 <p className="font-semibold text-gray-700">{product.rating || 5}/5</p>
//               </div> */}
//                   <div className="flex justify-between items-center">
//                     <p className="font-semibold text-gray-900">{r.userId?.name}</p>
//                     <p className="text-yellow-500 font-bold text-xl">⭐ {r.rating}</p>
//                   </div>
//                   <p className="mt-3 text-gray-700">{r.comment}</p>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>

      
//       <footer className="bg-gray-800 text-gray-300 mt-auto">
//         <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
//           <p>© 2025 MyShop. All rights reserved.</p>
//           <div className="flex gap-4">
//             <Facebook size={20} />
//             <Twitter size={20} />
//             <Instagram size={20} />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Product;




// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { Star, ShoppingCart, Facebook, Twitter, Instagram } from "lucide-react";
// import { motion } from "framer-motion";

// // ----------------- FETCH PRODUCT -----------------
// const fetchProductById = async (id) => {
//   const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
//   const product = res.data.product;

//   product.images = product.images || [product.image || ""];
//   return product;
// };

// const Product = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState(0);
//   const [reviews, setReviews] = useState([]);

//   // ------------ FETCH PRODUCT USING REACT QUERY ------------
//   const { data: product, isLoading, isError } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => fetchProductById(productId),
//   });

//   // ------------ AUTO DISCOUNT ------------
//   const autoDiscount =
//     product?.oldPrice && product?.price
//       ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//       : null;

//   // ------------ FETCH REVIEWS ------------
//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/v1/rate/productreview/${productId}`
//       );
//       setReviews(res.data.reviews || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ------------ ADD TO CART ------------
//   const addToCartMutation = useMutation({
//     mutationFn: async () => {
//       return axios.post("http://localhost:5000/api/v1/cart/addcart", {
//         productId: product._id,
//         name: product.pname,
//         price: product.price,
//         image: product.images[0],
//         size: selectedSize,
//         quantity,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart"]);
//       navigate("/cart");
//     },
//     onError: () => alert("Failed to add item to cart"),
//   });

//   const handleAddToCart = async () => {
//     if (!selectedSize) return alert("Please select a size");
//     await addToCartMutation.mutateAsync();
//   };

//   // ------------ LOADING & ERROR UI ------------
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
//       </div>
//     );

//   if (isError || !product)
//     return <div className="text-center mt-10 font-semibold">Failed to load.</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="px-6 py-12 max-w-6xl mx-auto flex-1">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

//           {/* ---------------- IMAGE SECTION ---------------- */}
//           <div>
//             <motion.img
//               key={activeImage}
//               src={product.images[activeImage]}
//               alt={product.pname}
//               className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border border-gray-200"
//               whileHover={{ scale: 1.05 }}
//               initial={{ opacity: 0.7, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.4 }}
//             />

//             <div className="flex gap-4 mt-4 justify-center">
//               {product.images.map((img, idx) => (
//                 <motion.img
//                   key={idx}
//                   src={img}
//                   onClick={() => setActiveImage(idx)}
//                   whileHover={{ scale: 1.2 }}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${
//                     activeImage === idx
//                       ? "border-indigo-600 shadow-lg"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ---------------- PRODUCT DETAILS ---------------- */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
//               {product.pname}
//             </h1>

//             <div className="flex items-center gap-4 mt-3">
//               <p className="bg-gray-100 px-3 py-1 rounded-full shadow-sm text-gray-700">
//                 Category: {product.category}
//               </p>
//             </div>

//             <div className="mt-5 flex items-center gap-4">
//               <p className="text-3xl font-bold text-indigo-600 drop-shadow-md">₹{product.price}</p>
//               {product.oldPrice && <p className="line-through text-gray-400">₹{product.oldPrice}</p>}
//               {(product.discount || autoDiscount) && (
//                 <p className="text-white bg-green-500 px-3 py-1 rounded-full font-semibold">
//                   {product.discount ? `${product.discount}% OFF` : `${autoDiscount}% OFF`}
//                 </p>
//               )}
//             </div>

//             <p className="mt-5 text-gray-700">{product.description}</p>

//             {/* ---------------- SIZE SELECT ---------------- */}
//             <div className="mt-6">
//               <p className="font-semibold text-gray-800 mb-2">Select Size</p>
//               <div className="flex gap-3">
//                 {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-5 py-2 rounded-full border font-medium transition-all ${
//                       selectedSize === size
//                         ? "bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105"
//                         : "bg-white border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* ---------------- QUANTITY ---------------- */}
//             <div className="mt-6 flex items-center gap-4">
//               <p className="font-semibold text-gray-800">Quantity:</p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setQuantity((p) => Math.max(1, p - 1))}
//                   className="px-4 py-2 bg-gray-300 rounded-md"
//                 >
//                   -
//                 </button>
//                 <span>{quantity}</span>
//                 <button
//                   onClick={() => setQuantity((p) => p + 1)}
//                   className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* ---------------- ADD TO CART ---------------- */}
//             <button
//               onClick={handleAddToCart}
//               disabled={!selectedSize}
//               className={`mt-8 w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold shadow-xl transition-all ${
//                 selectedSize
//                   ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-pointer"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               <ShoppingCart size={22} /> Add to Cart
//             </button>
//           </motion.div>
//         </div>

//         {/* ---------------- CUSTOMER REVIEWS ---------------- */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mt-16 bg-white p-8 rounded-2xl shadow-2xl"
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

//           {reviews.length === 0 ? (
//             <p className="text-gray-600 text-lg">No reviews yet.</p>
//           ) : (
//             <div className="space-y-6">
//               {reviews.map((r) => (
//                 <motion.div
//                   key={r._id}
//                   whileHover={{ scale: 1.02 }}
//                   className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white"
//                 >
//                   <div className="flex justify-between items-center">
//                     <p className="font-semibold text-gray-900">{r.userId?.name}</p>

//                     {/* STAR DISPLAY */}
//                     <div className="flex items-center gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={20}
//                           className={star <= r.rating ? "text-yellow-400" : "text-gray-300"}
//                           fill={star <= r.rating ? "gold" : "none"}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   <p className="mt-3 text-gray-700">{r.comment}</p>

//                   <p className="mt-2 text-sm text-gray-500">
//                     {new Date(r.createdAt).toLocaleDateString()}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>

//       {/* ---------------- FOOTER ---------------- */}
//       <footer className="bg-gray-800 text-gray-300 mt-auto">
//         <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
//           <p>© 2025 MyShop. All rights reserved.</p>
//           <div className="flex gap-4">
//             <Facebook size={20} />
//             <Twitter size={20} />
//             <Instagram size={20} />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Product;


//  add avage

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { Star, ShoppingCart, Facebook, Twitter, Instagram } from "lucide-react";
// import { motion } from "framer-motion";


// const fetchProductById = async (id) => {
//   const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
//   const product = res.data.product;

//   product.images = product.images || [product.image || ""];
//   return product;
// };

// const Product = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [activeImage, setActiveImage] = useState(0);

  
//   const [reviews, setReviews] = useState([]);
//   const [avgRating, setAvgRating] = useState(0);

 
//   const { data: product, isLoading, isError } = useQuery({
//     queryKey: ["product", productId],
//     queryFn: () => fetchProductById(productId),
//   });

 
//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/v1/rate/productreview/${productId}`
//       );

//       setReviews(res.data.reviews || []);
//       setAvgRating(res.data.averageRating || 0);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
//   const addToCartMutation = useMutation({
//     mutationFn: async () => {
//       return axios.post("http://localhost:5000/api/v1/cart/addcart", {
//         productId: product._id,
//         name: product.pname,
//         price: product.price,
//         image: product.images[0],
//         size: selectedSize,
//         quantity,
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart"]);
//       navigate("/cart");
//     },
//     onError: () => alert("Failed to add item"),
//   });

//   const handleAddToCart = () => {
//     if (!selectedSize) return alert("Choose size!");
//     addToCartMutation.mutate();
//   };

  
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//       </div>
//     );

//   if (isError || !product)
//     return <p className="text-center mt-10">Failed to load</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <div className="px-6 py-12 max-w-6xl mx-auto flex-1">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          
//           <div>
//             <motion.img
//               key={activeImage}
//               src={product.images[activeImage]}
//               alt={product.pname}
//               className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border"
//               whileHover={{ scale: 1.05 }}
//             />

//             <div className="flex gap-4 mt-4 justify-center">
//               {product.images.map((img, idx) => (
//                 <motion.img
//                   key={idx}
//                   src={img}
//                   onClick={() => setActiveImage(idx)}
//                   className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
//                     activeImage === idx
//                       ? "border-indigo-600 shadow-lg"
//                       : "border-gray-300"
//                   }`}
//                   whileHover={{ scale: 1.2 }}
//                 />
//               ))}
//             </div>
//           </div>

        
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <h1 className="text-4xl font-bold">{product.pname}</h1>

           
//             <div className="flex items-center gap-2 mt-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   size={22}
//                   className={star <= avgRating ? "text-yellow-400" : "text-gray-300"}
//                   fill={star <= avgRating ? "gold" : "none"}
//                 />
//               ))}
//               <p className="text-gray-600">({reviews.length} reviews)</p>
//             </div>

            
//             <div className="mt-4">
//               <p className="text-3xl text-indigo-600 font-bold">₹{product.price}</p>
//             </div>

            
//             <div className="mt-6">
//               <p className="font-semibold mb-1">Size</p>
//               <div className="flex gap-3">
//                 {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-5 py-2 rounded-full border ${
//                       selectedSize === size
//                         ? "bg-indigo-600 text-white"
//                         : "bg-white"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

          
//             <div className="mt-6 flex gap-4 items-center">
//               <p className="font-semibold">Qty:</p>
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="px-4 py-2 bg-gray-300 rounded-md"
//               >
//                 -
//               </button>
//               <span>{quantity}</span>
//               <button
//                 onClick={() => setQuantity((q) => q + 1)}
//                 className="px-4 py-2 bg-indigo-500 text-white rounded-md"
//               >
//                 +
//               </button>
//             </div>

            
//             <button
//               onClick={handleAddToCart}
//               className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-xl flex items-center justify-center gap-2"
//             >
//               <ShoppingCart size={22} /> Add to Cart
//             </button>
//           </motion.div>
//         </div>

       
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-16 bg-white p-6 rounded-2xl shadow-lg border"
//         >
          
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>

           
//             <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
//               <p className="font-semibold text-yellow-700 text-sm">{avgRating}</p>
//               <Star size={16} className="text-yellow-500" fill="gold" />
//             </div>
//           </div>

//           {reviews.length === 0 ? (
//             <p className="text-gray-500 text-sm">No reviews yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {reviews.map((r) => (
//                 <motion.div
//                   key={r._id}
//                   whileHover={{ scale: 1.01 }}
//                   className="border border-gray-200 p-4 rounded-xl bg-gray-50 shadow-sm"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="font-semibold text-gray-800 text-sm">
//                         {r.userId?.name}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {new Date(r.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>

                    
//                     <div className="flex gap-0.5">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={15}
//                           className={star <= r.rating ? "text-yellow-400" : "text-gray-300"}
//                           fill={star <= r.rating ? "gold" : "none"}
//                         />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Comment */}
//                   <p className="mt-2 text-gray-700 text-sm leading-relaxed">
//                     {r.comment}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>

      
//       <footer className="bg-gray-800 text-gray-300 mt-auto">
//         <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between">
//           <p>© 2025 MyShop</p>
//           <div className="flex gap-4">
//             <Facebook size={20} />
//             <Twitter size={20} />
//             <Instagram size={20} />
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Product;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Star, ShoppingCart, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const fetchProductById = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
  const product = res.data.product;

  product.images = product.images || [product.image || ""];
  return product;
};

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/rate/productreview/${productId}`
      );

      setReviews(res.data.reviews || []);
      setAvgRating(res.data.averageRating || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return axios.post("http://localhost:5000/api/v1/cart/addcart", {
        productId: product._id,
        name: product.pname,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      navigate("/cart");
    },
    onError: () => alert("Failed to add item"),
  });

  const handleAddToCart = () => {
   
    addToCartMutation.mutate();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );

  if (isError || !product)
    return <p className="text-center mt-10">Failed to load</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-6 py-12 max-w-6xl mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

         
          <div>
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.pname}
              className="w-full h-[450px] object-cover rounded-2xl shadow-2xl border"
              whileHover={{ scale: 1.05 }}
            />

            <div className="flex gap-4 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    activeImage === idx
                      ? "border-indigo-600 shadow-lg"
                      : "border-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold">{product.pname}</h1>

          
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  className={star <= avgRating ? "text-yellow-400" : "text-gray-300"}
                  fill={star <= avgRating ? "gold" : "none"}
                />
              ))}
              <p className="text-gray-600">({reviews.length} reviews)</p>
            </div>

           
            <div className="mt-4">
              <p className="text-3xl text-indigo-600 font-bold">₹{product.price}</p>
            </div>

            
            <div className="mt-6">
              <p className="font-semibold mb-1">Size</p>
              <div className="flex gap-3">
                {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full border ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            
            <div className="mt-6 flex gap-4 items-center">
              <p className="font-semibold">Qty:</p>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 bg-indigo-500 text-white rounded-md"
              >
                +
              </button>
            </div>

            {/* Add to Cart Disabled Until Size Selected */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`mt-6 w-full py-4 rounded-xl flex items-center justify-center gap-2 
                ${!selectedSize 
                  ? "bg-gray-400 cursor-not-allowed text-white" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700"}
              `}
            >
              <ShoppingCart size={22} /> Add to Cart
            </button>
          </motion.div>
        </div>

      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-white p-6 rounded-2xl shadow-lg border"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>

            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full shadow-sm">
              <p className="font-semibold text-yellow-700 text-sm">{avgRating}</p>
              <Star size={16} className="text-yellow-500" fill="gold" />
            </div>
          </div>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <motion.div
                  key={r._id}
                  whileHover={{ scale: 1.01 }}
                  className="border border-gray-200 p-4 rounded-xl bg-gray-50 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{r.userId?.name}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={15}
                          className={star <= r.rating ? "text-yellow-400" : "text-gray-300"}
                          fill={star <= r.rating ? "gold" : "none"}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-2 text-gray-700 text-sm">{r.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      
      <footer className="bg-gray-800 text-gray-300 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between">
          <p>© 2025 MyShop</p>
          <div className="flex gap-4">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Product;

