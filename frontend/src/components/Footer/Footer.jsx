

import React from 'react'
import "./Footer.css"
export default function Footer() {


  return (
    <footer className=" text-white p-3">
      <div className="container-fluid d-flex gap-5 ">


        <div className=" col-3">
          {/* <a href="#"  className="text-white mx-2 text-decoration-none" > */}
          <h3 className='pt-2 pb-2'>Book Flare</h3>
          {/* </a> */}
           <hr/>
          <p>Book flare draws book lovers of all ages into a community,
            engage with booklovers and meet their favourite literary personalities.</p>
          <p><span className='fw-bold'>Email :</span> book.flare12@gmail.com</p>  
          <p><span className='fw-bold'>phone number :</span> 01021023512</p>    
        </div>

        <div className="col-2 ms-5">
          <a href="#" className="text-white mx-2 text-decoration-none">
           <h3>Information</h3>
          </a>
          <hr/>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>About Us</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Contact Us</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Careers</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>FQA</p>
          </a>
        </div>

        <div className="col-2 ">
          <a href="#" className="text-white mx-2 text-decoration-none">
           <h3>Our Policies</h3>
          </a>
          <hr/>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Shipping Policy</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Refund Policy</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Privacy Policy</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Terms of Service</p>
          </a>
        </div>


        <div className="col-2">
          <a href="#" className="text-white mx-2 text-decoration-none">     
           <h3>Follow Us</h3>
          </a>
          <hr/>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Facebook</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Instagram</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>LinkedIn</p>
          </a>
          <a href="#" className="text-white mx-2 text-decoration-none">
            <p>Whatsapp</p>
          </a>
        </div>
        </div>
    </footer>
  )
}










