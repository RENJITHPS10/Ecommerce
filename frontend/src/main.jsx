// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import ShopContextProvider from "./context/ShopContext.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
// import { Provider } from "react-redux";
// import { store } from "./redux/store.js";
// import { CartProvider } from "./context/CartContext.jsx";



// const queryClient = new QueryClient();

// createRoot(document.getElementById("root")).render(
 
//     <CartProvider>
//     <BrowserRouter>
//       <QueryClientProvider client={queryClient}>
//         <ShopContextProvider>
//           <Provider store={store}>
//              <App />
//           </Provider>
//         </ShopContextProvider>
//       </QueryClientProvider>
//     </BrowserRouter>
//     </CartProvider>
  
// );


// // import { StrictMode } from "react";
// // import { createRoot } from "react-dom/client";
// // import "./index.css";
// // import App from "./App.jsx";
// // import { BrowserRouter } from "react-router-dom";
// // import ShopContextProvider from "./context/ShopContext.jsx";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { Provider } from "react-redux";
// // import { store } from "./redux/store.js";

// // const queryClient = new QueryClient();

// // createRoot(document.getElementById("root")).render(
// //   <StrictMode>
// //     <BrowserRouter>
// //       <QueryClientProvider client={queryClient}>
// //         <Provider store={store}>
// //           <ShopContextProvider>
// //             <App />
// //           </ShopContextProvider>
// //         </Provider>
// //       </QueryClientProvider>
// //     </BrowserRouter>
// //   </StrictMode>
// // );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { UserProvider } from "./context/UserContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ShopContextProvider>
            <App />
          </ShopContextProvider>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
