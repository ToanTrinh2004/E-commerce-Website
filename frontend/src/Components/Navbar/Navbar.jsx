import React, { useCallback, useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import shopping_cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContex'


export const Navbar = () => {
  const [menu,setMenu] = useState("shop");
  const {getTotalCart} = useContext(ShopContext);
  const getUser = () =>{
    if(localStorage.getItem('auth-token'))
      {

      }
  }
  return (
    <div className='navbar'>
    <div className='nav-logo'  onClick={()=>{window.location.replace('/')}}>
        <img src={logo} alt=""></img>
        <p>SHOPPER</p>
    </div>
    <ul className='nav-menu'>
    <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu === "Shop" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu === "men" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu === "women" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("kid")}}><Link style={{textDecoration:'none'}} to='/kids'>kid</Link>{menu === "kid" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("Support")}}><Link style={{textDecoration:'none'}} to='/support'>Support</Link>{menu === "Support" ? <hr/>:<></>}</li>
    </ul>
    
    <div className='nav-login-cart'>
    <Link style={{textDecoration:'none'}} to='/Find'><button>Search</button></Link>
   
    <Link style={{textDecoration:'none',color:'white'}} to='/User'>  {localStorage.getItem('auth-token')? <div  className='nav-login-user'><p onClick={()=>{}}> {localStorage.getItem('username') || 'User'}</p>  </div>:<></>} </Link>
  
    {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');
            localStorage.removeItem('phone');
            localStorage.removeItem('address');
            localStorage.removeItem('username');
            window.location.replace('/');}}>Logout</button> :<Link style={{textDecoration:'none'}} to='/Signup'><button>Login</button></Link>}
    
   
    <Link style={{textDecoration:'none'}} to='/Cart'><img src={shopping_cart} alt=""></img></Link>
        <div className='nav-cart-count'>{getTotalCart()}</div>
    </div>
    </div>
  )
}
