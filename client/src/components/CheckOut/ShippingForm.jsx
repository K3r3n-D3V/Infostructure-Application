import React from "react";
import "./ShippingForm.css"; // Import the CSS file

function ShippingForm() {
  return (
    <form className="shipping-form" noValidate autoComplete="off">
      <input
        type="text"
        className="form-field"
        placeholder="First Name"
        required
      />
      <input
        type="text"
        className="form-field"
        placeholder="Last Name"
        required
      />
      <input type="text" className="form-field" placeholder="Address" />
      <input type="text" className="form-field" placeholder="City" required />
      <input type="text" className="form-field" placeholder="State" required />
      <input
        type="text"
        className="form-field"
        placeholder="Zip Code"
        required
      />
      <input
        type="text"
        className="form-field"
        placeholder="Country"
        required
      />
    </form>
  );
}

export default ShippingForm;
