// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../NavBar/Navbar';
// import './Cart.css';

// const Cart = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Get items stored locally
//     const cartItems = JSON.parse(sessionStorage.getItem('CartItems')) ?? [];
//     setItems(cartItems);
//   }, []);

//   const handleRemoveItem = (index) => {
//     const updatedItems = [...items];
//     updatedItems.splice(index, 1);
//     setItems(updatedItems);

//     // Update the sessionStorage with the new cart items
//     sessionStorage.setItem('CartItems', JSON.stringify(updatedItems));
//   };

//   const handleDecreaseQuantity = (index) => {
//     const updatedItems = [...items];
//     if (updatedItems[index].quantity > 1) {
//       updatedItems[index].quantity -= 1;
//       setItems(updatedItems);
//       sessionStorage.setItem('CartItems', JSON.stringify(updatedItems));
//     }
//   };

//   const handleIncreaseQuantity = (index) => {
//     const updatedItems = [...items];
//     updatedItems[index].quantity += 1;
//     setItems(updatedItems);
//     sessionStorage.setItem('CartItems', JSON.stringify(updatedItems));
//   };

//   return (
//     <div className="Cart-box">
//       <Navbar />
//       <div className="cart">
//         <div className="cart-info">
//           <div className="cart-info-headings">
//             <h1>Shopping Cart</h1>
//             <h1 className='cart-info'>Items: {items.reduce((sum, item) => sum + (item.quantity || 1), 0)}</h1>
//             <hr />
//           </div>
//           <div className="cart-products">
//             <div className="cart-heading">
//               <p>Product Name</p>
//               <p>Product Brand</p>
//               <p>Quantity</p>
//               <p>Price</p>
//             </div>

//             {items.map((product, index) => (
//               <div key={index} className="cart-item">
//                 <p>{product.ProductName}</p>
//                 <p>{product.ProductBrand}</p>
//                 <div className="counter">
//                   <button onClick={() => handleDecreaseQuantity(index)}>-</button>
//                   <h6>{product.quantity || 1}</h6>
//                   <button onClick={() => handleIncreaseQuantity(index)}>+</button>
//                 </div>
//                 <p>{product.Price}</p>
//                 <button
//                   className="remove-btn"
//                   onClick={() => handleRemoveItem(index)}
//                 >
//                   x
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="cart-info2">
//           <h1>Order Summary</h1>
//           <div className="cart-info2-item">
//             <p>Total Items: {items.reduce((sum, item) => sum + (item.quantity || 1), 0)}</p>
//             <p>{items.reduce((sum, item) => sum + (item.quantity || 1) * item.Price, 0)}</p>
//           </div>
//           <div className="shipping-info">

//           <h4>SHIPPING</h4>
//           <form action="/action_page.php">
//   <select id="cars" name="cars">
//     <option value="Standard Delivery">Standard Delivery - $10</option>
//     <option value="saab">Saab</option>
//     <option value="fiat">Fiat</option>
//     <option value="audi">Audi</option>
//   </select>
// </form>
//           </div>
//         <div className="shipping-info2">

//           <h4>PROMO CODE</h4>
//           <input type="text" placeholder='Enter your code' />
//           <button>APPLY</button>
//         </div>
//           <hr />
//           <div className="cart-info2-item">
//             <p>Total Amount: </p>
//             <p>{items.reduce((sum, item) => sum + (item.quantity || 1) * item.Price, 0)}</p>
//           </div>
//           <div className="checkout-btn">

//             <Link to="/checkout">
//             <button>Proceed to Checkout</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Get items stored locally
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setItems(cartItems);
  }, []);

  console.log(items);
  
  let totalSum = items.reduce((curr,item)=>{
    let n = parseInt(item.Price.replace(/\s/g, '')); // Remove all spaces
    console.log(n);

    return curr + ( n * item. quantity)                          
  },0)

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);

    // Update the sessionStorage with the new cart items
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...items];
    const currentQuantity = Number(updatedItems[index].quantity) || 1;

    if (currentQuantity > 1) {
      updatedItems[index].quantity = currentQuantity - 1;
      setItems(updatedItems);
      sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...items];
    const currentQuantity = Number(updatedItems[index].quantity) || 1;

    updatedItems[index].quantity = currentQuantity + 1;
    setItems(updatedItems);
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  return (
    <div className="Cart-box">
      <Navbar />
      <div className="cart">
        <div className="cart-info">
          <div className="cart-info-headings">
            <h1>Shopping Cart</h1>
            <h1 className="cart-info-h1">
              Items:{" "}
              {items.reduce(
                (sum, item) => sum + (Number(item.quantity) || 1),
                0
              )}
            </h1>
            <hr />
          </div>
          <div className="cart-products">
            <div className="cart-heading">
              <p>Product Name</p>
              <p>Product Brand</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>

            {items.map((product, index) => (
              <div key={index} className="cart-item">
                <p>{product.ProductName}</p>
                <p>{product.ProductBrand}</p>
                <div className="counter">
                  <button onClick={() => handleDecreaseQuantity(index)}>
                    -
                  </button>
                  <h6>{Number(product.quantity) || 1}</h6>
                  <button onClick={() => handleIncreaseQuantity(index)}>
                    +
                  </button>
                </div>
                <p>${product.Price}</p>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(index)}
                >
                  x
                </button>
              </div>
            ))}
              <div className="return">
                <Link to='/productscreen'>
              <button>
                Back to Product Screen
              </button>
                </Link>
              </div>
          </div>
        </div>
        <div className="cart-info2">
          <h1>Order Summary</h1>
          <div className="cart-info2-item">
            <p>
              Total Items:{" "}
              {items.reduce(
                (sum, item) => sum + (Number(item.quantity) || 1),
                0
              )}
            </p>
            <p>
              $
              {0}
            </p>
          </div>
          <div className="shipping-info">
            <h4>SHIPPING</h4>
            <form action="/action_page.php">
              <select id="cars" name="cars">
                <option value="Standard Delivery">
                  Standard Delivery - $10
                </option>
                <option value="saab">Saab</option>
                <option value="fiat">Fiat</option>
                <option value="audi">Audi</option>
              </select>
            </form>
          </div>
          <div className="shipping-info2">
            <h4>PROMO CODE</h4>
            <input type="text" placeholder="Enter your code" />
            <button>APPLY</button>
          </div>
          <hr />
          <div className="cart-info2-item">
            <p>Total Amount: </p>
            <p>
              $
              {items
                .reduce(
                  (sum, item) =>
                    sum + (Number(item.quantity)) * Number(item.Price),
                  0
                )
                }
            </p>
          </div>
          <div className="checkout-btn">
            <Link to="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
