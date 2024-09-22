import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import "./Cart.css";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [shippingCost, setShippingCost] = useState(10); // Default shipping cost

  useEffect(() => {
    // Get items stored locally
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setItems(cartItems);
  }, []);

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

  // Calculate total sum
  let totalSum = items.reduce((curr, item) => {
    // Remove non-numeric characters and parse price to a number
    let itemPrice = parseFloat(item.Price.replace(/[^0-9.-]+/g, "")) || 0;
    return curr + itemPrice * (Number(item.quantity) || 1);
  }, 0);

  // Update shipping cost based on selected option
  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;

    // Set shipping cost based on the selected option
    if (selectedOption === "Standard Delivery") {
      setShippingCost(10);
    } else if (selectedOption === "Express Delivery") {
      setShippingCost(25);
    } else if (selectedOption === "Free Delivery") {
      setShippingCost(0);
    }
  };

  // Total amount with shipping included
  const totalAmountWithShipping = totalSum + shippingCost;

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
              <Link to="/productscreen">
                <button>Back to Product Screen</button>
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
            <p>${totalSum.toFixed(2)}</p>
          </div>
          <div className="shipping-info">
            <h4>SHIPPING</h4>
            <form>
              <select onChange={handleShippingChange}>
                <option value="Standard Delivery">
                  Standard Delivery - $10
                </option>
                <option value="Express Delivery">Express Delivery - $25</option>
                <option value="Free Delivery">Free Delivery - $0</option>
              </select>
            </form>
          </div>
          <hr />
          <div className="cart-info2-item">
            <p>Total Amount (with shipping): </p>
            <p>${totalAmountWithShipping.toFixed(2)}</p>
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
