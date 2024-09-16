import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './ProductNavbar.css';

const ProductNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');  
  const [products, setProducts] = useState([]);     
  const [filteredProducts, setFilteredProducts] = useState([]);  
  
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

  const getCartCount = ()=>{
    var cartItems = JSON.parse(sessionStorage.getItem("CartItems"))

    return cartItems.length
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

    <nav className="navbar2">
      <div className="navbar-logo2">
        <Link to="/">
          <img src="../../Screens/logo.png" alt="Logo" className="logo2" />
        </Link>
      </div>

      <div className="navbar-search2">
        <div className="search-container2">
          <FaSearch className="search-icon2" style={{color:'white'}}/>
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input2" 
            value={searchTerm}
            onChange={handleSearch} 
          />
        </div>
      </div>

      {/* Dropdown/Search Result Section */}
      {searchTerm && (
        <ul className="search-results2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li key={product._id} className="search-item2">
                <img 
                  src={product.Image} 
                  alt={product.ProductName} 
                  style={{ width: '50px', height: '50px' }} 
                />
                <div className="product-info2">
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

      <div className="navbar-icons2">
        <Link to="/profile">
          <FaUser className="icon2" />
        </Link>
        <Link to="/cart2">
          <FaShoppingCart className="icon2" />
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
