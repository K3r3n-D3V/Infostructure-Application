import React from 'react'
import { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Signup({setSignedIn}) {
    const navigate = useNavigate()
    const handleLogInClick = () => {
        navigate('/login'); 
      };
    const [inputValues, setInputValues] = useState({
        FirstName:"",
        LastName:"",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setInputValues((prevValues) => ({
          ...prevValues,       
          [name]: value         
        }));
      
        //console.log(inputValues); // This will log the state before the update is applied
      };
      
    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log("data",inputValues)
        // everytime we sign in we set signeIn to true and then we go home
        axios.post('http://localhost:3000/users', inputValues)
        .then(result => {
            console.log(result)
            setSignedIn(true)
            navigate('/')
        })
        .catch(err => console.log(err))

    }

  return (
    <div className='signup-container'>
        <div className='signup-box'>
            <h2>Create a new account</h2>
        <p>Already have an account? <a href="" onClick={handleLogInClick}>Log In</a></p>
            <hr />
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="FirstName">
                    <strong>First Name</strong>
                </label>
                <input type="text"
                placeholder='Enter First Name'
                onChange={(e)=>handleChange(e)}
                value={inputValues.FirstName}
                autoComplete='off'
                name='FirstName'
                className='signup-input'
                required
                />
            </div>
            <div>
                <label htmlFor="email">
                    <strong>Last Name</strong>
                </label>
                <input type="text"
                placeholder='Enter Name'
                onChange={(e)=>handleChange(e)}
                value={inputValues.LastName}
                autoComplete='off'
                name='LastName'
                className='signup-input'
                required
                />
            </div>
            <div>
                <label htmlFor="email">
                    <strong>Email Address</strong>
                </label>
                <input type="email"
                onChange={(e)=>handleChange(e)}
                value={inputValues.email}
                placeholder='Enter Email Address'
                autoComplete='off'
                name='email'
                className='signup-input'
                required
                />
            </div>
            <div>
                <label htmlFor="email">
                    <strong>Password</strong>
                </label>
                <input type="password"
                placeholder='Enter Password'
                onChange={(e)=>handleChange(e)}
                value={inputValues.password}
                autoComplete='off'
                name='password'
                className='signup-input'
                required />
            </div>
            <button type='submit' className='signup-btn'>
                Register
            </button>
            </form>
            
        </div>   
    </div>
  )
}


export default Signup



