import React from 'react'
import './LocationNavbar.css'
import { Link } from "react-router-dom";


const LocationNavbar = () => {
  return (
    <div className='location-navbar'>
    <ul>
        <Link to='./home'>
        <li>Home</li>
        </Link>
        <li>New Items</li>
        <li>Support</li>
        <li>About</li>
        <li>Contact</li>
    </ul>
    </div>
  )
}

export default LocationNavbar