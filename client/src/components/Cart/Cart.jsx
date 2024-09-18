import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {

const [items , setItems] = React.useState([])

useEffect(()=>{
  //get items stored locally
  var cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
  setItems(cartItems)

},[])

  return (
    <div className='Cart-box'>
      <h1>Cart Page</h1>
      
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
