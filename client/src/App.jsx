// import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import About from './components/About'
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
// import axios from "axios";
// import { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// // import NotFound from './Pages/404'
// import Home from "./components/Home/Home";
// import BankDetails from "./components/BankDetails/BankDetails";
// import ProtectedRoutes from "./Pages/ProtectedRoutes";
// import Profile from "./components/Profile/Profile.jsx/Profile";
// import ProductScreen from "./components/ProductScreen/ProductScreen";
// import CheckOut from "./components/CheckOut/CheckOut";
// import Locations from "./components/Locations/Locations";
// import Cart from "./components/Cart/Cart";

// function App() {
//   const [signedIn, setSignedIn] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(null);

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     //check if user signed in after refresh
//     var bool = JSON.parse(sessionStorage.getItem("AuthStatus"))

//     setSignedIn(bool);
  
//     console.log("running");

//     try {
//       axios
//         .get("http://localhost:3000/users")
//         .then((res) => res?.json())
//         .then((data) => {
//           console.log("my result", data);
//           setUsers(data);
//         });
//     } catch (err) {
//       console.log(err.message);
//     }
//   }, []);

//   return (
//     <BrowserRouter>
//       <div className="className"></div>
//       <header className="App-header"></header>

//       <Routes>
//         <Route path="/locations" element={<Locations />} />
//         <Route
//           path="productscreen"
//           element={<ProductScreen name="Log In" setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="checkout"
//           element={<CheckOut name="Log In" setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="/signup"
//           element={<Signup name="Sign up" setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="/login"
//           element={<Login name="Log In" setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="/checkout"
//           element={<CheckOut name="Log In" setSignedIn={setSignedIn} />}
//         />
//         {/* <Route path='/bankdetails' element= {<BankDetails name="About to protect"/>}/> */}
//         <Route path="/" element={<Home />} />
//         <Route path="/" element={<Home name="Homeee" />} />
//         <Route element={<ProtectedRoutes signedIn={signedIn} />}>
//           {/* <Route path='checkout' element={signedIn ? <CheckOut name="protected" /> : <Login />} /> */}
//           <Route path="/cart" element={<Cart name="protected" />} />
//           <Route path="/profile" element={<Profile signedIn={signedIn} />} />
//         </Route>
//         {/* <Route path='*' element={<NotFound name="Hehe you like thingz"/>}/> */}
//       </Routes>
//     </BrowserRouter>

//     //Uncomment later
//     //   <div>
//     //     <Signup/>

//     //   </div>
//   );
// }

// export default App;



//The one that was def working

// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./components/Home/Home";
// import BankDetails from "./components/BankDetails/BankDetails";
// import ProtectedRoutes from "./Pages/ProtectedRoutes";
// import Profile from "./components/Profile/Profile.jsx/Profile";
// import ProductScreen from "./components/ProductScreen/ProductScreen";
// import CheckOut from "./components/CheckOut/CheckOut";
// import Locations from "./components/Locations/Locations";
// import Cart from "./components/Cart/Cart";

// function App() {
//   const [signedIn, setSignedIn] = useState(() => {
//     // Initialize state from sessionStorage on first render
//     return JSON.parse(sessionStorage.getItem("AuthStatus")) || false;
//   });

//   useEffect(() => {
//     // Update sessionStorage whenever signedIn changes
//     sessionStorage.setItem("AuthStatus", JSON.stringify(signedIn));
//   }, [signedIn]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/locations" element={<Locations />} />
//         <Route
//           path="productscreen"
//           element={<ProductScreen setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="checkout"
//           element={<CheckOut setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="/signup"
//           element={<Signup setSignedIn={setSignedIn} />}
//         />
//         <Route
//           path="/login"
//           element={
//             signedIn ? <Navigate to="/" replace /> : <Login setSignedIn={setSignedIn} />
//           }
//         />
//         <Route path="/" element={<Home />} />

//         {/* Protected routes */}
//         <Route element={<ProtectedRoutes signedIn={signedIn} />}>
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/profile" element={<Profile signedIn={signedIn} />} />
//         </Route>

//         {/* Redirect all unknown routes to home */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


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
        <Route path="/locations" element={<Locations />} />
        <Route
          path="/productscreen"
          element={<ProductScreen setSignedIn={setSignedIn} />}
        />
        <Route
          path="/checkout"
          element={<CheckOut setSignedIn={setSignedIn} />}
        />
        <Route
          path="/bankdetails"
          element={<BankDetails setSignedIn={setSignedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setSignedIn={setSignedIn} />}
        />
        <Route
          path="/login"
          element={<Login setSignedIn={setSignedIn} />} // Allow access to login
        />
        <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile signedIn={signedIn} />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoutes signedIn={signedIn} />}>
        </Route>

        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
