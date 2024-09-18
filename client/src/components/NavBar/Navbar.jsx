import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('');  // State for search input
  const [products, setProducts] = useState([]);      // State to store products fetched from MongoDB
  const [filteredProducts, setFilteredProducts] = useState([]);  // State for filtered products

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);  // Store products in state
        setFilteredProducts(data);  // Initially set all products as filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search input change and filter products using regex
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);  // Update search term

    try {
      const regex = new RegExp(term, 'i');  // Create regex from search term
      const filtered = products.filter(product => regex.test(product.ProductName));  // Filter products by name
      setFilteredProducts(filtered);  // Update filtered products
    } catch (error) {
      console.error('Invalid regex:', error);
      setFilteredProducts([]);  // Set filtered products to empty array if there's an error
    }
  };
  const handleCartButton = () => {
    navigate('/cart')
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="../../Screens/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input" 
            value={searchTerm}
            onChange={handleSearch} 
          />
        </div>
      </div>

      {/* Dropdown/Search Result Section */}
      {searchTerm && (
        <ul className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <li key={product._id} className="search-item">
                <img 
                  src={product.Image} 
                  alt={product.ProductName} 
                  style={{ width: '50px', height: '50px' }} 
                />
                <div className="product-info">
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

      <div className="navbar-icons">
        <Link to="/profile">
          <FaUser className="icon" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart className="icon" />
        </Link>
        {/* <button onClick={handleCartButton}>
          <FaShoppingCart className="icon" />
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
