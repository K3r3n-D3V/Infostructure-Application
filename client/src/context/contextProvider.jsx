import React, { useState } from "react";
import { InfostructureContext } from "./context";

const ContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isLogged, setLoggedIn] = useState(false);
  const [user, setUser] = useState(false); //use the setter in login and signup

  const ContextValues = {
    cartCount,
    setCartCount,
    isLogged,
    setLoggedIn,
    user,
    setUser,
    AuthenticatedStatus: (val) => {
      sessionStorage.setItem("AuthStatus", val);
    },
  };

  return (
    <InfostructureContext.Provider value={ContextValues}>
      {children}
    </InfostructureContext.Provider>
  );
};

export default ContextProvider;
