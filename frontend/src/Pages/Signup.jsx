import React, { useState } from 'react'
import './CSS/Signup.css'
import { Link } from 'react-router-dom';
export const Signup = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [ConfirmPassword,setConfirmPassword] = useState('');
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <div className='loginsignup-fields'>
          <input type='text' placeholder='Your Name' value={username} onChange={(e)=>{setUsername(e.currentTarget.value)}}/>
          <input type='email' placeholder='Email Address'  value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
          <input type='password' placeholder='Password'  value={password} onChange={(e)=>{setPassword(e.currentTarget.value)}}/>
          <input type='password' placeholder='Confirm Password'  value={ConfirmPassword} onChange={(e)=>{setConfirmPassword(e.currentTarget.value)}}/>
        </div>
        <Link to = '/' ><button onClick={()=>{alert(email,password)}}>Sign Up</button></Link>
        <p className='loginsignup-login'>Already have an account ? <span>Login</span></p>
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id=''></input>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>

    </div>
  )
}
