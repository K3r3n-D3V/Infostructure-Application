// import './Locations.css';
// import { useNavigate, Link } from 'react-router-dom';  // Import Link from react-router-dom
// import React, { useState, useEffect } from 'react';
// import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

// function Locations({ setSignedIn }) {
//   const navigate = useNavigate();  

//   const [searchTerm, setSearchTerm] = useState('');  
//   const [locations, setLocations] = useState([]);     
//   const [filteredLocations, setFilteredLocations] = useState([]);  
  
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/locations');  
//         const data = await response.json();
//         console.log("data", data)
//         setLocations(data);  
//         setFilteredLocations(data);  
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };
//     fetchLocations();
//   }, []);

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);  

//     try {
//       const regex = new RegExp(term, 'i');  
//       const filtered = locations.filter(location => regex.test(location.Province));  
//       setFilteredLocations(filtered); 
//     } catch (error) {
//       console.error('Invalid regex:', error);
//       setFilteredLocations([]);  
//     }
//   };

//   const navbar = [
//     "Home",
//     "New Items",
//     "Support",
//     "About",
//     "Contact"
//   ];

//   const goHome = () => {
//     navigate("/");  // Use navigate for redirection
//   };

//   let navItems = navbar.map((e, index) => (
//     <li key={index}>{e}</li>
//   ));

//   return (
//     <div>
//       <nav className="navbar2">
//         <div className="navbar-logo2">
//           <Link to="/">
//             <img src="../../Screens/logo.png" alt="Logo" className="logo2" />
//           </Link>
//         </div>

//         <div className="navbar-search2">
//           <div className="search-container2">
//             <FaSearch className="search-icon2" style={{ color: 'white' }} />
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               className="search-input2" 
//               value={searchTerm}
//               onChange={handleSearch} 
//             />
//           </div>
//         </div>

//         {/* Dropdown/Search Result Section */}
//         {searchTerm && (
//           <ul className="search-results2">
//             {filteredLocations.length > 0 ? (
//               filteredLocations.map(location => (
//                 <li key={location._id} className="search-item2"> {/* Use location._id */}
//                   <div className="product-info2">
//                     <p>{location.Province}</p>
//                     <p>Town: {location.Town}</p> 
//                     <p>City: {location.City}</p>  
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <li>No matching locations found</li>  
//             )}
//           </ul>
//         )}
        
//       <div className="navbar-icons2">
//         <Link to="/profile">
//           <FaUser className="icon2" />
//         </Link>
//         <Link to="/cart2">
//           <FaShoppingCart className="icon2" />
//         </Link>
//       </div>  
//       </nav>
//     </div>
//   );
// }

// export default Locations;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import './Locations.css'; 

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3000/locations');
        const data = await response.json();
        console.log(data)
        setLocations(data);
        setFilteredLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const regex = new RegExp(term, 'i');
      const filtered = locations.filter(location =>
        regex.test(location.Province) ||
        regex.test(location.Town) ||
        regex.test(location.City)
      );
      setFilteredLocations(filtered);
    } catch (error) {
      console.error('Invalid regex:', error);
      setFilteredLocations([]);
    }
  };

  const navbar = [
    "Home",
    "New Items",
    "Support",
    "About",
    "Contact"
  ]
  let navItems = navbar.map((e)=>
    <li>{e}</li>
  )

  return (
    <div className='whole'>
      <div className="check-nav">
       <ul>
      {navItems}
        </ul>
      </div>
      <h1 className='head'>DISCOVER YOUR AMAZING CITY</h1>
      <nav className="navbar3">
          <div className="navbar-search2">
          <div className="search-container2">
            <FaSearch className="search-icon2" style={{ color: 'white' }} />
            <input
              type="text"
              placeholder="Search Locations..."
              className="search-input2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Dropdown/Search Result Section */}
        {searchTerm && (
          <ul className="search-results3">
            {filteredLocations.length > 0 ? (
              filteredLocations.map(location => (
                <li key={location._id} className="search-item3">
                  <div className="location-info2">
                    <p>{location.Province}</p>
                    <p>Town: {location.Town}</p>
                    <p>City: {location.City}</p>
                    {/* Add more fields if needed */}
                  </div>
                </li>
              ))
            ) : (
              <li>No matching locations found</li>
            )}
          </ul>
        )}

        <div className="navbar-icons2">
          <Link to="/profile">
            <FaUser className="icon2" />
          </Link>
          <Link to="/cart">
            <FaShoppingCart className="icon2" />
            {/* Add cart count if needed */}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Locations;