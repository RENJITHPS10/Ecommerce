// import React from "react";
// import Title from "../Components/Title";
// import aboutImg from "../assets/Shop2.jpg";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedinIn,
// } from "react-icons/fa";

// const About = () => {
//   return (
//     <>
//       <section className="py-12 px-6 md:px-16 bg-gray-50 text-gray-700">
//         <div className="text-center mb-12">
//           <Title text={"ABOUT"} text2={"ABOUT US"} />
//           <p className="mt-3 text-base text-gray-500">
//             Discover who we are and what drives our passion for innovation
//           </p>
//         </div>

        
//         <div className="flex flex-col md:flex-row items-center gap-12">
         
//           <div className="w-full md:w-1/2 flex justify-center">
//             <img
//               src={aboutImg}
//               alt="About us"
//               className="rounded-2xl shadow-lg w-full md:max-w-[500px] object-cover hover:scale-105 transition-all duration-500"
//             />
//           </div>

//           <div className="md:w-1/2 flex flex-col gap-6 leading-relaxed">
//             <p>
//               <span className="font-semibold text-gray-800">Forever</span> was
//               born out of a passion for innovation and a desire to redefine
//               modern fashion through creativity, comfort, and sustainability.
//             </p>
//             <p>
//               Since our launch, we've been on a mission to design styles that
//               empower confidence and inspire individuality in every person. Each
//               collection we drop is built around self-expression and
//               authenticity—because fashion should feel like *you*.
//             </p>
//             <p>
//               We're not just a brand; we're a movement built on bold ideas,
//               conscious design, and endless creativity.
//             </p>
//           </div>
//         </div>
//       </section>

     
//       <footer className="bg-gray-900 text-gray-200 mt-12">
//         <div className="max-w-7xl mx-auto py-12 px-6 md:px-16 grid md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-xl font-semibold mb-4">Forever</h3>
//             <p className="text-gray-400">
//               Redefining fashion through creativity, comfort, and
//               sustainability. Join our journey of self-expression and bold
//               ideas.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="/about" className="hover:text-white transition">
//                   About Us
//                 </a>
//               </li>
//               <li>
//                 <a href="/collection" className="hover:text-white transition">
//                   Shop
//                 </a>
//               </li>
//               <li>
//                 <a href="/contact" className="hover:text-white transition">
//                   Contact
//                 </a>
//               </li>
//               <li>
//                 <a href="/" className="hover:text-white transition">
//                   FAQ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="#" className="hover:text-white transition">
//                 <FaFacebookF />
//               </a>
//               <a href="#" className="hover:text-white transition">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="hover:text-white transition">
//                 <FaInstagram />
//               </a>
//               <a href="#" className="hover:text-white transition">
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </div>
//         </div>

        
//         <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
//           © {new Date().getFullYear()} Forever. All rights reserved.
//         </div>
//       </footer>
//     </>
//   );
// };

// export default About;
import React from "react";
import { motion } from "framer-motion";
import Title from "../Components/Title";
import aboutImg from "../assets/Shop2.jpg";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaLeaf, FaStar } from "react-icons/fa";

const About = () => {
  return (
    <>
      {/* HERO SECTION - FULLSCREEN ELEGANCE */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 overflow-hidden">
        {/* Floating Decorative Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 50, 0], x: [0, -40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-l from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <Title text1="OUR" text2="STORY" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-light text-gray-600 mt-8 max-w-3xl mx-auto leading-relaxed italic"
            >
              Crafting timeless pieces that speak to your soul — one design at a time.
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Image with Luxury Effects */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={aboutImg}
                  alt="Forever — A Brand with Soul"
                  className="w-full h-[650px] object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>

                {/* Floating Elegant Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-lg px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 font-bold text-indigo-700"
                >
                  <FaHeart className="text-red-500 text-xl animate-pulse" />
                  <span>Est. 2024 — Built on Love</span>
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT: Powerful Text + Values */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <h2 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                We Are <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Forever
                </span>
              </h2>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-indigo-600">Forever</strong> isn't just a brand — it's a promise.
                  A promise to create clothing that makes you feel seen, confident, and truly yourself.
                </p>
                <p>
                  Every collection is designed with intention: sustainable materials, ethical craftsmanship,
                  and styles that transcend trends.
                </p>
                <p>
                  We believe fashion should be a force for good — beautiful on the outside,
                  meaningful on the inside.
                </p>
              </div>

              {/* Values Icons */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                {[
                  { icon: FaLeaf, label: "Sustainable", color: "from-emerald-500 to-teal-600" },
                  { icon: FaHeart, label: "Ethical", color: "from-pink-500 to-rose-600" },
                  { icon: FaStar, label: "Timeless", color: "from-amber-500 to-orange-600" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    className="text-center group cursor-default"
                  >
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-3xl shadow-xl group-hover:shadow-2xl transition-all`}>
                      <item.icon />
                    </div>
                    <p className="mt-4 font-bold text-gray-800 text-lg">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to kryptonian from-indigo-400 to-purple-400">
                Forever
              </h1>
              <p className="text-gray-400 leading-relaxed">
                More than fashion — a lifestyle. Crafted with care, worn with pride.
              </p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Explore</h3>
              <ul className="space-y-4">
                {["Home", "Collection", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-3 group">
                      <span className="w-0 group-hover:w-10 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration30"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Stay Connected</h3>
              <div className="flex gap-6">
                {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.3, rotate: 12 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-xl border border-white/10"
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            
            <motion.div

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 leading-tight">
                Dress like<br />you mean it.
              </p>
            </motion.div>
          </div>


          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20 pt-10 border-t border-gray-800 text-gray-500 text-sm font-light"
          >
            © {new Date().getFullYear()} Forever. Made with passion. Worn with purpose.
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default About;