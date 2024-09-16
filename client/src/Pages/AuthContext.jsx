import React, { createContext, useReducer, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Define action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Auth reducer to manage authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Initial state for authentication
const initialState = {
  isAuthenticated: false, // Default to false, meaning the user is not logged in
};

// AuthProvider component to wrap your app and provide auth state
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in any component
export const useAuth = () => useContext(AuthContext);

// Action creators for logging in and logging out
export const login = (dispatch) => {
  dispatch({ type: LOGIN });
};

export const logout = (dispatch) => {
  dispatch({ type: LOGOUT });
};
