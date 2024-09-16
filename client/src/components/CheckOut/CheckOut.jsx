import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

import './CheckOut.css'

function CheckOut() {
  const navbar = [
    "Home",
    "New Items",
    "Support",
    "About",
    "Contact"
  ]
  let navItems = navbar.map((e)=>
    <li>{e}</li>
  )

const goHome = () => {
  Navigate("/")
}

  return (
    <div className='every'>
      <div className="check-nav">
        <img src="../../Screens/logo.png" alt="" onClick={goHome}/>
        <ul>
      {navItems}
        </ul>
      </div>
      <h1 className='h1'>Ready to pay?</h1>
      <div className="content">
      <div className="information">
      <h3>1.Personal Information</h3>
      <div className="btns">
    <input type="text" placeholder='First Name' required/>
    <input type="text" placeholder='Last Name' required/>
      </div>
      </div>
      <div className="information">
      <h3>2.Delivery Method</h3>
      <div className="btns">
      <button className='info-btn'>Same Day</button>
      <button className='info-btn'>Express</button>
      <button className='info-btn'>Normal</button>
      <button className='info-btn'>Zip Code</button>
      </div>
      </div>
      <div className="information">
      <h3>3.Payment Method</h3>
      <div className="btns">
      <button className='info-btn'>Pay</button>
      <button className='info-btn'>Pay</button>
      <button className='info-btn'>Pay</button>
      </div>
      </div>
      </div>
    </div>
  )
}

export default CheckOut