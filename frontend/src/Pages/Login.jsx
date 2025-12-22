// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import { loginUserAPI, registerUserAPI } from "../services/userServices";
// import { loginSuccess } from "../redux/authSlice"; // FIXED
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const AuthPage = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Login
//   const loginMutation = useMutation({
//     mutationFn: loginUserAPI,
//   });

//   // Register
//   const registerMutation = useMutation({
//     mutationFn: registerUserAPI,
//   });

  
//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       address: "",
//     },

//     validationSchema: Yup.object({
//       name: isRegister
//         ? Yup.string().required("Name is required")
//         : Yup.string(),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string()
//         .min(6, "Minimum 6 characters")
//         .required("Password is required"),
//       address:isRegister&& Yup.string().required("address is required"),
//     }),

//     onSubmit: async (values) => {
//       try {
//         let data;

//         if (isRegister) {
//           // Register
//           data = await registerMutation.mutateAsync(values);
//           alert("Account created successfully!");
//           setIsRegister(false);
//         } else {
//           // Login
//           data = await loginMutation.mutateAsync({
//             email: values.email,
//             password: values.password,
//           });

//           dispatch(loginSuccess(data));

//           const decoded = jwtDecode(data.token);

//           if (decoded.role === "admin") {
//             navigate("/admin");
//           } else {
//             navigate("/");
//           }
//         }
//       } catch (error) {
//         alert(error.response?.data?.message || "Something went wrong");
//       }
//     },
//   });

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-80 bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           {isRegister ? "Create Account" : "Login"}
//         </h2>

//         <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
//           {isRegister && (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 className="p-2 border rounded"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//               />
//               {formik.touched.name && formik.errors.name && (
//                 <div className="text-red-500 text-sm">{formik.errors.name}</div>
//               )}
//             </>
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="p-2 border rounded"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <div className="text-red-500 text-sm">{formik.errors.email}</div>
//           )}

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="p-2 border rounded"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password && (
//             <div className="text-red-500 text-sm">{formik.errors.password}</div>
//           )}
//         {isRegister && (  <textarea
//             name="address"
//             placeholder="Address"
//             className="p-2 border rounded h-24 resize-none"
//             value={formik.values.address}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />  )}

//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded"
//             disabled={loginMutation.isLoading || registerMutation.isLoading}
//           >
//             {loginMutation.isLoading || registerMutation.isLoading
//               ? isRegister
//                 ? "Creating..."
//                 : "Logging in..."
//               : isRegister
//               ? "Create Account"
//               : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm mt-4">
//           {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => setIsRegister(!isRegister)}
//           >
//             {isRegister ? "Login" : "Create Account"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;



// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useMutation } from "@tanstack/react-query";
// import { loginUserAPI, registerUserAPI } from "../services/userServices";
// import { loginSuccess } from "../redux/authSlice";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const AuthPage = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const loginMutation = useMutation({ mutationFn: loginUserAPI });
//   const registerMutation = useMutation({ mutationFn: registerUserAPI });

//   const formik = useFormik({
//     initialValues: { name: "", email: "", password: "", address: "" },
//     validationSchema: Yup.object({
//       name: isRegister ? Yup.string().required("Name is required") : Yup.string(),
//       email: Yup.string().email("Invalid email").required("Email is required"),
//       password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
//       address: isRegister ? Yup.string().required("Address is required") : Yup.string(),
//     }),
//     onSubmit: async (values) => {
//       try {
//         let data;
//         if (isRegister) {
//           data = await registerMutation.mutateAsync(values);
//           alert("Account created successfully!");
//           setIsRegister(false);
//         } else {
//           data = await loginMutation.mutateAsync({
//             email: values.email,
//             password: values.password,
//           });
//           dispatch(loginSuccess(data));
//           const decoded = jwtDecode(data.token);
//           navigate(decoded.role === "admin" ? "/admin" : "/");
//         }
//       } catch (error) {
//         alert(error.response?.data?.message || "Something went wrong");
//       }
//     },
//   });

//   return (
//     <>
//       {/* Professional Background */}
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden">
        
//         {/* Animated Floating Orbs */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
//         </div>

//         {/* Glass Card */}
//         <div className="w-full max-w-md">
//           <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 relative overflow-hidden">
            
//             {/* Subtle Inner Glow */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>

//             <div className="relative z-10">
//               {/* Header */}
//               <div className="text-center mb-10">
//                 <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//                   {isRegister ? "Create Account" : "Welcome Back"}
//                 </h1>
//                 <p className="mt-3 text-white/70 text-sm md:text-base font-light">
//                   {isRegister 
//                     ? "Join thousands of happy customers" 
//                     : "Sign in to access your dashboard"}
//                 </p>
//               </div>

//               <form onSubmit={formik.handleSubmit} className="space-y-6">
//                 {/* Name Field */}
//                 {isRegister && (
//                   <div className="space-y-2">
//                     <label className="text-white/90 text-sm font-medium tracking-wide">Full Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       placeholder="John Doe"
//                       className={`w-full px-5 py-4 rounded-2xl bg-white/10 border backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
//                         formik.touched.name && formik.errors.name 
//                           ? "border-red-500" 
//                           : "border-white/30"
//                       }`}
//                       value={formik.values.name}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                       <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <label className="text-white/90 text-sm font-medium tracking-wide">Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="you@example.com"
//                     className={`w-full px-5 py-4 rounded-2xl bg-white/10 border backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
//                       formik.touched.email && formik.errors.email 
//                         ? "border-red-500" 
//                         : "border-white/30"
//                     }`}
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
//                   )}
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <label className="text-white/90 text-sm font-medium tracking-wide">Password</label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       placeholder="••••••••"
//                       className={`w-full px-5 py-4 pr-14 rounded-2xl bg-white/10 border backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
//                         formik.touched.password && formik.errors.password 
//                           ? "border-red-500" 
//                           : "border-white/30"
//                       }`}
//                       value={formik.values.password}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
//                     >
//                       {showPassword ? (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                       ) : (
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                   {formik.touched.password && formik.errors.password && (
//                     <p className="text-red-400 text-xs mt-1">{formik.errors.password}</p>
//                   )}
//                 </div>

//                 {/* Address Field */}
//                 {isRegister && (
//                   <div className="space-y-2">
//                     <label className="text-white/90 text-sm font-medium tracking-wide">Delivery Address</label>
//                     <textarea
//                       name="address"
//                       rows={3}
//                       placeholder="123 Main St, New York, USA"
//                       className={`w-full px-5 py-4 rounded-2xl bg-white/10 border backdrop-blur-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none ${
//                         formik.touched.address && formik.errors.address 
//                           ? "border-red-500" 
//                           : "border-white/30"
//                       }`}
//                       value={formik.values.address}
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                     />
//                     {formik.touched.address && formik.errors.address && (
//                       <p className="text-red-400 text-xs mt-1">{formik.errors.address}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={loginMutation.isPending || registerMutation.isPending}
//                   className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                 >
//                   {loginMutation.isPending || registerMutation.isPending ? (
//                     <>
//                       <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                       </svg>
//                       {isRegister ? "Creating Account..." : "Signing In..."}
//                     </>
//                   ) : (
//                     <>{isRegister ? "Create Account" : "Sign In"}</>
//                   )}
//                 </button>
//               </form>

//               {/* Toggle Link */}
//               <div className="mt-8 text-center">
//                 <p className="text-white/70 text-sm">
//                   {isRegister ? "Already have an account?" : "New here?"}{" "}
//                   <span
//                     onClick={() => setIsRegister(!isRegister)}
//                     className="font-semibold text-purple-300 hover:text-white cursor-pointer underline underline-offset-4 transition-all duration-200"
//                   >
//                     {isRegister ? "Sign In" : "Create an account"}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <p className="text-center text-white/40 text-xs mt-8 font-light">
//             © 2025 YourBrand. All rights reserved.
//           </p>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.4; transform: scale(1); }
//           50% { opacity: 0.6; transform: scale(1.05); }
//         }
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </>
//   );
// };

// export default AuthPage;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginUserAPI, registerUserAPI } from "../services/userServices";
import { loginSuccess } from "../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useMutation({ mutationFn: loginUserAPI });
  const registerMutation = useMutation({ mutationFn: registerUserAPI });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", address: "" },
    validationSchema: Yup.object({
      name: isRegister ? Yup.string().required("Name is required") : Yup.string(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
      address: isRegister ? Yup.string().required("Address is required") : Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        let data;
        if (isRegister) {
          data = await registerMutation.mutateAsync(values);
          alert("Account created successfully!");
          setIsRegister(false);
        } else {
          data = await loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
          });

          dispatch(loginSuccess(data));

          const decoded = jwtDecode(data.token);
          navigate(decoded.role === "admin" ? "/admin" : "/");
        }
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/083/131/large_2x/minimal-shopping-online-concept-colorful-paper-shopping-bag-go-down-from-floating-blue-background-for-copy-space-customer-can-buy-everything-form-home-and-the-messenger-will-deliver-free-photo.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/30"></div>

      <div className="w-full max-w-md">
        <div className="bg-white/12 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                {isRegister ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="mt-3 text-white/80 text-sm md:text-base font-light">
                {isRegister
                  ? "Join thousands of happy customers"
                  : "Sign in to access your dashboard"}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">

              {isRegister && (
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={`w-full px-5 py-4 rounded-2xl bg-white/10 border text-white placeholder-white/50 
                      ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-white/30"}`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className={`w-full px-5 py-4 rounded-2xl bg-white/10 border text-white placeholder-white/50 
                    ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-white/30"}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-white/90 text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className={`w-full px-5 py-4 pr-14 rounded-2xl bg-white/10 border text-white placeholder-white/50 
                      ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-white/30"}`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition"
                  >
                    👁️
                  </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-400 text-xs mt-1">{formik.errors.password}</p>
                )}
              </div>

              {isRegister && (
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">Delivery Address</label>
                  <textarea
                    name="address"
                    rows={3}
                    placeholder="123 Main St, New York, USA"
                    className={`w-full px-5 py-4 rounded-2xl bg-white/10 border text-white placeholder-white/50 resize-none 
                      ${formik.touched.address && formik.errors.address ? "border-red-500" : "border-white/30"}`}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="text-red-400 text-xs mt-1">{formik.errors.address}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loginMutation.isPending || registerMutation.isPending}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-xl hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loginMutation.isPending || registerMutation.isPending ? (
                  <>Loading...</>
                ) : (
                  <>{isRegister ? "Create Account" : "Sign In"}</>
                )}
              </button>

            </form>

            <div className="mt-8 text-center">
              <p className="text-white/70 text-sm">
                {isRegister ? "Already have an account?" : "New here?"}{" "}
                <span
                  onClick={() => setIsRegister(!isRegister)}
                  className="font-semibold text-purple-300 hover:text-white cursor-pointer underline underline-offset-4 transition-all"
                >
                  {isRegister ? "Sign In" : "Create an account"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
