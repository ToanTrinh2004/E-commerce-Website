import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import budget from '../../assets/budget.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration: "none"}}>
        <div className='sidebar-item'>
          <img src={add_product_icon} alt=''/>
          <p>Add product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration: "none"}}>
        <div className='sidebar-item'>
          <img src={list_product_icon} alt=''/>
          <p>Product list</p>
        </div>
      </Link>
      <Link to={'/report'} style={{textDecoration: "none"}}>
        <div className='sidebar-item'>
          <img src={budget} alt=''/>
          <p> Financial Report</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar