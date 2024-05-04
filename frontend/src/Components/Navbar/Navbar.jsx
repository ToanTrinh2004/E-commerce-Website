import React, { useCallback, useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import shopping_cart from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContex'

export const Navbar = () => {
  const [menu,setMenu] = useState("shop");
  const {getTotalCart} = useContext(ShopContext);
  return (
    <div className='navbar'>
    <div className='nav-logo'>
        <img src={logo} alt=""></img>
        <p>SHOPPER</p>
    </div>
    <ul className='nav-menu'>
    <li onClick={()=>{setMenu("Shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>{menu === "Shop" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("men")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu === "men" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("women")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu === "women" ? <hr/>:<></>}</li>
    <li onClick={()=>{setMenu("kid")}}><Link style={{textDecoration:'none'}} to='/kids'>kid</Link>{menu === "kid" ? <hr/>:<></>}</li>

    </ul>
    <div className='nav-login-cart'>
    <Link style={{textDecoration:'none'}} to='/Signup'><button>Login</button></Link>
    <Link style={{textDecoration:'none'}} to='/Cart'><img src={shopping_cart} alt=""></img></Link>
        <div className='nav-cart-count'>{getTotalCart()}</div>
    </div>
    </div>
  )
}
