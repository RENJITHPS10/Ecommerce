import React from 'react'
import {Routes,Route, Router} from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Navbar from './Components/Navbar'
import About from './Pages/About'
import Login from './Pages/Login'
import Register from './Pages/Register'
import SearchBar from './Components/SearchBar'
import AdminDashboard from './Pages/AdminDashboard'
import AuthPage from './Pages/Login'
import LatestCollection from './Components/LatestCollection'
import CartPage from './Pages/CartPage'
import Logout from './Pages/Logout'
import OrderDetails from './Pages/OrderDetails'
import Placeorder from './Pages/PlaceOrder'
import ProtectedRoute from './Components/ProtectedRoute'
import { useNavigate } from "react-router-dom";
import Pagenotfound from './Pages/Pagenotfound'
import { useSelector } from 'react-redux'

import ReportPage from './Components/ReportPage'
import ProductEdit from './Components/ProductEdit'











const App = () => {
  const user=useSelector((state)=>state.auth.user)
 
  
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    {user?.role=="user"&&<Navbar/>}
     
      <SearchBar />
      <Routes>
          
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path="/register" element={<Register />} />
          <Route path='/authpage' element={<AuthPage/>} />
          <Route path='/latestCollection' element={<LatestCollection/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/order' element={<OrderDetails/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/placeOrder" element={<Placeorder/>}/>
          <Route path="/report" element={<ReportPage/>}/>
          <Route path="/edit" element={<ProductEdit/>}/>
          

          {/* protect All logged in users */}
          <Route path='/' element={
            <ProtectedRoute>

              <Home/>

            </ProtectedRoute>}
          />

          {/* admin */}
           <Route path='/admin' element={
            <ProtectedRoute role="admin">
              
              <AdminDashboard/>

            </ProtectedRoute>
            }/>
          
         <Route path='/not-authorized' element={<Pagenotfound/>}/>

      </Routes>
    </div>
  )
}

export default App

