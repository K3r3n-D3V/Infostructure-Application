import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import BankDetails from "./components/BankDetails/BankDetails";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import Profile from "./components/Profile/Profile.jsx/Profile";
import ProductScreen from "./components/ProductScreen/ProductScreen";
import CheckOut from "./components/CheckOut/CheckOut";
import Locations from "./components/Locations/Locations";
import Cart from "./components/Cart/Cart";

function App() {
  const [signedIn, setSignedIn] = useState(() => {
    // Initialize state from sessionStorage on first render
    return JSON.parse(sessionStorage.getItem("AuthStatus")) || false;
  });

  useEffect(() => {
    // Update sessionStorage whenever signedIn changes
    sessionStorage.setItem("AuthStatus", JSON.stringify(signedIn));
  }, [signedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:id" component={ProductScreen} />
        <Route path="/locations" element={<Locations />} />
        <Route
          path="/productscreen"
          element={<ProductScreen setSignedIn={setSignedIn} />}
        />
        <Route path="/signup" element={<Signup setSignedIn={setSignedIn} />} />
        <Route
          path="/login"
          element={<Login setSignedIn={setSignedIn} />} // Allow access to login
        />
        <Route path="/" element={<Home />} />

        <Route path="/profile" element={<Profile signedIn={signedIn} />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoutes signedIn={signedIn} />}></Route>
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={<CheckOut setSignedIn={setSignedIn} />}
        />
        <Route
          path="/bankdetails"
          element={<BankDetails setSignedIn={setSignedIn} />}
        />

        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
