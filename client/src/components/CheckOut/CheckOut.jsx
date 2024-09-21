import React, { useEffect, useState } from 'react';
import './CheckOut.css';
import Navbar from '../NavBar/Navbar';

function CheckOut() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Retrieve items stored in sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem('CartItems')) ?? [];
    setItems(cartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    sessionStorage.setItem('CartItems', JSON.stringify(updatedItems));
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    deliveryMethod: '',
    paymentMethod: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleNextStep = () => {
    let validationErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName) validationErrors.firstName = "First name is required.";
      if (!formData.lastName) validationErrors.lastName = "Last name is required.";
    } else if (currentStep === 2) {
      if (!formData.address) validationErrors.address = "Address is required.";
      if (!formData.city) validationErrors.city = "City is required.";
      if (!formData.state) validationErrors.state = "State is required.";
      if (!formData.zip) validationErrors.zip = "Zip code is required.";
    } else if (currentStep === 3 && !formData.deliveryMethod) {
      validationErrors.deliveryMethod = "Please select a delivery method.";
    } else if (currentStep === 4 && !formData.paymentMethod) {
      validationErrors.paymentMethod = "Please select a payment method.";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, items }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Error submitting form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.Price, 0);

  return (
    <div className='every'>
      <Navbar />
      <h2 className='checkout-heading'>Ready to pay?</h2>
      <form className="content" onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="personal-info">
            <h3>1. Personal Information</h3>
            <div className="btns">
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
            </div>
            <div className="nav-button">
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Shipping Information */}
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
            <div className="nav-button">
              {errors.zip && <p className="error">{errors.zip}</p>}
              <button type="button" onClick={handlePreviousStep}>Previous</button>
              <button type="button" onClick={handleNextStep}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Delivery Method */}
        {currentStep === 3 && (
          <div className="personal-info">
            <h3>3. Delivery Method</h3>
            <div className="btns">
              {['Same Day', 'Express', 'Normal'].map(method => (
                <label key={method} className="checkbox-label">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={formData.deliveryMethod === method}
                    onChange={() => {
                      setFormData({ ...formData, deliveryMethod: method });
                      setErrors({ ...errors, deliveryMethod: '' });
                    }}
                  />
                  {method}
                </label>
              ))}
            </div>
            <div className="nav-button">
              {errors.deliveryMethod && <p className="error">{errors.deliveryMethod}</p>}
              <button type="button" onClick={handlePreviousStep} className='button'>Previous</button>
              <button type="button" onClick={handleNextStep} className='button'>Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method */}
        {currentStep === 4 && (
          <div className="personal-info">
            <h3>4. Payment Method</h3>
            <div className="btns">
              {['PayPal', 'Credit Card', 'Bank Transfer'].map(method => (
                <label key={method} className="checkbox-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={formData.paymentMethod === method}
                    onChange={() => {
                      setFormData({ ...formData, paymentMethod: method });
                      setErrors({ ...errors, paymentMethod: '' });
                    }}
                  />
                  {method}
                </label>
              ))}
            </div>
            <div className="nav-button">
              {errors.paymentMethod && <p className="error">{errors.paymentMethod}</p>}
              <button type="button" onClick={handlePreviousStep} className='button'>Previous</button>
              <button type="button" onClick={handleNextStep} className='button'>Next</button>
            </div>
          </div>
        )}

        {/* Step 5: Review Order */}
        {currentStep === 5 && (
          <div className="personal-info">
            <h3>5. Review Order</h3>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
            <p><strong>Delivery Method:</strong> {formData.deliveryMethod}</p>
            <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
            <h4>Items in Cart:</h4>
            <ul>
              {items.map(item => (
                <li key={item.ProductId}>
                  {item.ProductName} - ${item.Price.toFixed(2)}
                  <button type="button" onClick={() => handleRemoveItem(items.indexOf(item))}>Remove</button>
                </li>
              ))}
            </ul>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            <div className="nav-button">
              <button type="button" onClick={handlePreviousStep}>Previous</button>
            </div>
            <button type="submit" className="submit-btn">Place Order</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckOut;
