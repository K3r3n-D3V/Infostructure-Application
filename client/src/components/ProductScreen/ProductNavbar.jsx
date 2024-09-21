import React, { useState, useEffect , useContext } from 'react';
import { InfostructureContext } from '../../context/context';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaHome } from 'react-icons/fa';
import './ProductNavbar.css';

const ProductNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');  
  const [products, setProducts] = useState([]);     
  const [filteredProducts, setFilteredProducts] = useState([]);  
  const { cartCount, setCartCount} =  useContext(InfostructureContext);


  console.log("cart count from context",cartCount);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);  
        setFilteredProducts(data);  
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  //change made to getCartCount()
  const getCartCount = ()=>{
    var cartItems = JSON.parse(sessionStorage.getItem("CartItems")) ?? [];

    setCartCount(cartItems?.length);

    return cartCount
  
  }


  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  

    try {
      const regex = new RegExp(term, 'i');  
      const filtered = products.filter(product => regex.test(product.ProductName));  
      setFilteredProducts(filtered); 
    } catch (error) {
      console.error('Invalid regex:', error);
      setFilteredProducts([]);  
    }
  };

  return (
    <div>

    <nav className="product-navbar">
      <div className="product-navbar-logo">
        <Link to="/">
          <img src="../../Screens/logo.png" alt="Logo" className="logo2" />
        </Link>
      </div>

      <div className="product-navbar-search">
        <div className="search-container2">
          <FaSearch className="product-navbar-search-icon"/>
          <input 
            type="text" 
            placeholder="What are you looking for?" 
            className="product-navbar-search-input" 
            value={searchTerm}
            onChange={handleSearch} 
          />
        </div>
      </div>

      {/* Dropdown/Search Result Section */}
      {searchTerm && (
        <ul className="product-navbar-search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li key={product._id} className="product-navbar-search-item">
                <img 
                  src={product.Image} 
                  alt={product.ProductName} 
                  style={{ width: '50px', height: '50px' }} 
                />
                <div className="product-navbar-info">
                  <p>{product.ProductName}</p>
                  <p>Price: ${product.Price}</p>
                  <p>{product.Description}</p>
                </div>
              </li>
            ))
          ) : (
            <li>No matching products found</li>
          )}
        </ul>
      )}

      <div className="product-navbar-icons">
      <Link to="/">
        <FaHome className='product-navbar-icon' />
        </Link>
        <Link to="/profile">
          <FaUser className="product-navbar-icon" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="product-navbar-icon" />
          <div className='cart-tag'>
            {getCartCount()}
          </div>
        </Link>
      </div>  
    </nav>
    </div>
  );
};

export default ProductNavbar;