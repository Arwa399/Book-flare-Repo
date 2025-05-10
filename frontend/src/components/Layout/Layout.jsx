import React from 'react'
import { Outlet } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import '../../App.css'
import Navbar from '../Navbar/Navbar'


export default function Layout() {



  return (
    <>
      

      <Navbar/>

      <Outlet/>



    </>
  )
}
