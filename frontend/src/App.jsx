import React, { useEffect } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp';
import Layout from './components/Layout/Layout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Home from './components/Home/Home';
import { Toaster} from 'react-hot-toast'
import DashBoard from './components/Admin/DashBoard';
import ManageBooks from './components/Admin/ManageBooks';
import ManageUsers from './components/Admin/ManageUsers';
import Category from './components/Category/Category';
import ProductDetails from './components/product/ProductDetails';
import ProductsList from './components/product/ProductsList';
// import Cart from './components/product/Cart';
import ProductReviewsPage from './components/product/ProductReviewsPage';
import Checkout from './components/product/Checkout';
import { api } from './utlis/api';
import { useAuth } from './components/Contexts/AuthContext';
import { SearchResult } from './components/SearchResult/SearchResult';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';




function App() {
  
  let routes= createBrowserRouter([{
    path:'/', element:<Layout/>,
    children:[
      {path:'login', element:<Login/>, index:true},
      {path:'signup', element:<SignUp/>},
      // {path:'forgetpassword', element:<ForgetPassword/>},
      {path:'/', element:<Home/>, index: true},
      {path: '/admin/dashboard', element: < DashBoard/>},
      {path:"products", element:<ManageBooks />},
      {path:"admin/users", element:<ManageUsers />},
      {path:"category/:categoryId", element:<Category/>},
      {path:"/shop" ,element:<ProductsList />},
      {path:"/products/:id" ,element:<ProductDetails />},
      {path:"/cart", element:<Cart />},
      {path:"reviews/:productId", element:<ProductReviewsPage/>},
      {path:"checkout", element:<Checkout />},
      {path: "/users/profile", element: <Profile/>},
      {path:"search-result", element:<SearchResult />},
    ]
  }])


  const { setToken, setisAuth, setuser } = useAuth();

  useEffect(() => {
    
    const fetchMe = async()=>{
      try {
        const res = await api.get('/auth/me')
        setuser(res.data.user)
        setisAuth(true)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMe()
    
    return () => {
    }
  }, [])
  

  return (
  <>
    <RouterProvider  router={routes}/>
    <Toaster />
  </>
  )
}

export default App
