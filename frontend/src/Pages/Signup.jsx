import React, { useState } from 'react'
import './CSS/Signup.css'
import { Link } from 'react-router-dom';
export const Signup = () => {
  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    username : "",
    password:"",
    email:"",
    phone:"",
    address:"",
  })
  const ChangeHandle = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async () => {
    console.log(formData);
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('username', responseData.user.name);
            localStorage.setItem('address', responseData.user.address);
            localStorage.setItem('phone', responseData.user.phone);
            localStorage.setItem('email', responseData.user.email);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again later.');
    }
};

const signup = async () => {
  console.log(formData);
  try {
      const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      
      if (response.ok) {
          const responseData = await response.json();

          if (responseData.success) {
              localStorage.setItem('auth-token', responseData.token);
              localStorage.setItem('username', responseData.user.name);
              localStorage.setItem('address', responseData.user.address);
              localStorage.setItem('phone', responseData.user.phone);
              localStorage.setItem('email', responseData.user.email);
              window.location.replace("/");
          } else {
              alert(responseData.errors);
          }
      } else {
          // Handle HTTP error response
          console.error('HTTP error:', response.status);
          alert('Signup failed. Please try again later.');
      }
  } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again later.');
  }
};

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
         {state ==="SignUp"? <input type='text' placeholder='Your Name' name = 'username' value={formData.username} onChange={ChangeHandle}/>:<></>} 
          <input type='email' placeholder='Email Address' name='email'  value={formData.email} onChange={ChangeHandle}/>
          <input type='password' placeholder='Password' name='password'  value={formData.password} onChange={ChangeHandle}/>
          {state ==="SignUp"? <input type='text' placeholder='Phone number' name = 'phone' value={formData.phone} onChange={ChangeHandle}/>:<></>} 
          {state ==="SignUp"? <input type='text' placeholder='Address' name = 'address' value={formData.address} onChange={ChangeHandle}/>:<></>} 
        </div>
       <button onClick={()=>{state==="Login"?login():signup()}}>{state}</button>
        {state ==="SignUp"? <p className='loginsignup-login'>Already have an account ? <span onClick={()=>{setState("Login")}}>Login</span></p>:<p className='loginsignup-login'>Create an account ? <span onClick={()=>{setState("SignUp")}}>Click Here</span></p>}
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id=''></input>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>

    </div>
  )
}
