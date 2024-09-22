import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import Navbar from "../NavBar/Navbar";
import { Link } from "react-router-dom";

function CheckOut() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    paymentMethod: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];
    setItems(cartItems);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    let validationErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName)
        validationErrors.firstName = "First name is required.";
      if (!formData.lastName)
        validationErrors.lastName = "Last name is required.";
    } else if (currentStep === 2) {
      if (!formData.address) validationErrors.address = "Address is required.";
      if (!formData.city) validationErrors.city = "City is required.";
      if (!formData.state) validationErrors.state = "State is required.";
      if (!formData.zip) validationErrors.zip = "Zip code is required.";
    } else if (currentStep === 3 && !formData.paymentMethod) {
      validationErrors.paymentMethod = "Please select a payment method.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateFields()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    sessionStorage.setItem("CartItems", JSON.stringify(updatedItems));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    const paymentDetails = preparePaymentDetails();
    try {
      const response = await sendPaymentDetailsToServer(paymentDetails);
      if (response.ok) {
        setSuccessMessage("Order placed successfully!");
        sessionStorage.removeItem("CartItems");
        setItems([]);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      setErrorMessage("There was an error placing your order.");
    } finally {
      setLoading(false);
    }
  };

  const preparePaymentDetails = () => {
    const PaymentDate = new Date().toLocaleDateString();
    const TotalPrice = items
      .reduce((total, item) => total + parseFloat(item.Price), 0)
      .toFixed(2);

    return {
      PaymentDate,
      PaymentMethod: formData.paymentMethod,
      TotalPrice: `R${TotalPrice}`,
    };
  };

  const sendPaymentDetailsToServer = async (paymentDetails) => {
    return await fetch("http://localhost:3000/payment-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });
  };

  return (
    <div className="every">
      <Navbar />
      <h2 className="checkout-heading">Ready to pay?</h2>
      <form className="content" onSubmit={handleSubmit}>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {currentStep === 1 && (
          <div className="personal-info">
            <h3>1. Personal Information</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="personal-info">
            <h3>2. Shipping Information</h3>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            {errors.city && <p className="error">{errors.city}</p>}
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              required
            />
            {errors.state && <p className="error">{errors.state}</p>}
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleInputChange}
              required
            />
            {errors.zip && <p className="error">{errors.zip}</p>}
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}

        {currentStep === 3 && (
          <div className="personal-info">
            <h3>3. Payment Method</h3>
            {["PayPal", "Credit Card", "Bank Transfer"].map((method) => (
              <label key={method} className="checkbox-label">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={formData.paymentMethod === method}
                  onChange={() => {
                    setFormData({ ...formData, paymentMethod: method });
                    setErrors({ ...errors, paymentMethod: "" });
                  }}
                  required
                />
                {method}
              </label>
            ))}
            {errors.paymentMethod && (
              <p className="error">{errors.paymentMethod}</p>
            )}
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="personal-info">
            <h3>4. Review Order</h3>
            <p>
              <strong>Name:</strong> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <strong>Address:</strong> {formData.address}, {formData.city},{" "}
              {formData.state} {formData.zip}
            </p>
            <p>
              <strong>Payment Method:</strong> {formData.paymentMethod}
            </p>
            <h4>Items in Cart:</h4>
            <ul>
              {items.map((item, index) => (
                <li key={index}>
                  {item.ProductName} - R{item.Price}
                  <button type="button" onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <h4>
              Total Price: R
              {items
                .reduce(
                  (total, item) => total + (parseFloat(item.Price) || 0),
                  0
                )
                .toFixed(2)}
            </h4>
            <button type="button" onClick={handlePreviousStep}>
              Previous
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        )}
      </form>
      <div className="return-cart">
        <Link to="/cart">
          <button>Return to cart</button>
        </Link>
      </div>
    </div>
  );
}

export default CheckOut;
