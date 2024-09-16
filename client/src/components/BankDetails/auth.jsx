const logout = () => {
    // Remove the token from localStorage to log out
    localStorage.removeItem('authToken');
  };
  
  export { logout };
  