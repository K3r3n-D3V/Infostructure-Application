// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import ProductNavbar from './ProductNavbar'
// import './ProductScreen.css';


// const ProductScreen = () => {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]); 

//   useEffect(() => {
//     fetch('http://localhost:3000/products')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('data', data);
//         setProducts(data);
//       })
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);


//   const goHome = () => {
//     navigate('/')
//   }

//   const handleAddToCart = (item)=>{
    
//     console.log(item)
//     if(sessionStorage.getItem("CartItems")){
//        var currentItems = JSON.parse(sessionStorage.getItem("CartItems"))
//        var updateNewItems = [...currentItems]

//        updateNewItems.push(item)
//        console.log(updateNewItems)
//        sessionStorage.setItem("CartItems",JSON.stringify(updateNewItems))
//     }else{
//       var emptyCart= []
//       emptyCart.push(item)
//       sessionStorage.setItem("CartItems",JSON.stringify(emptyCart))
//     }
//   }
//   return (
//     <div className="all">
//       <ProductNavbar/>
//       <div className='heading'>
//       <FaArrowLeft 
//         className="arrow-icon" onClick={goHome}
//       />
//       <h1>Products</h1>
//       </div>
//     <div className="image-gallery">
//       <div className="product-list">
//         <div className="product">

//       {products.length > 0 ? (
//         products.map((product) => (
//           <div key={product._id} className="image-item">
//             <img src={product.Image} alt={product.ProductName} /> 
//             <div className="product-info">

//             <p className="product-name">{product.ProductName}</p> 
//             <h3>Description</h3>
//             <p className="product-description">{product.Description}</p> 
//             <p className="product-price">${product.Price}</p>
//             <button onClick={()=> handleAddToCart(product)} className='addToCartBtn'>Add To Cart</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No products found</p>
//       )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ProductScreen;


import React, { useEffect, useState, useContext } from 'react';
import { InfostructureContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ProductNavbar from './ProductNavbar';
import './ProductScreen.css';


const ProductScreen = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]); 
  const {cartCount,setCartCount} = useContext(InfostructureContext)

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  const goHome = () => {
    navigate('/')
  }

  const handleAddToCart = (item)=>{
    
    console.log(item)
    if(sessionStorage.getItem("CartItems")){
       var currentItems = JSON.parse(sessionStorage.getItem("CartItems"))
       var updateNewItems = [...currentItems]

       updateNewItems.push(item)
       console.log(updateNewItems)
       sessionStorage.setItem("CartItems",JSON.stringify(updateNewItems))
       setCartCount(cartCount + 1)
    }else{
      var emptyCart= []
      emptyCart.push(item)
      sessionStorage.setItem("CartItems",JSON.stringify(emptyCart))
    }
  }
  return (
    <div className="all">
      <ProductNavbar/>
      <div className='heading'>
      <FaArrowLeft 
        className="arrow-icon" onClick={goHome}
      />
      <h1>Products</h1>
      </div>
    <div className="image-gallery">
      <div className="product-list">
        <div className="product">

      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="image-item">
            <img src={product.Image} alt={product.ProductName} /> 
            <div className="product-info">

            <p className="product-name">{product.ProductName}</p> 
            <h3>Description</h3>
            <p className="product-description">{product.Description}</p> 
            <p className="product-price">${product.Price}</p>
            <button onClick={()=> handleAddToCart(product)} className='addToCartBtn'>Add To Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductScreen;