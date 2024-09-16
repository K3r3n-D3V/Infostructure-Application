import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div>
      <h1>Cart Page</h1>
      {/* Your cart details go here */}
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
};

export default Cart;
