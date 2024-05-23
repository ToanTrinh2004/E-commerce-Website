import React, { useContext,useState,useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContex'
import { Item } from '../Components/Items/Item'
import { NewsLetter } from '../Components/NewsLetter/NewsLetter'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import { Footer } from '../Components/Footer/Footer'
export const ShopCategory = (props) => {
  
  const[all_product,setAll_product] = useState([]);
  
  useEffect(() => {
      // Fetch all products
       fetch('http://localhost:4000/allproducts')
          .then(response => response.json())
          .then(data => setAll_product(data))
          .catch(error => console.error('Error fetching products:', error));
  }, []);
  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src = {props.banner} ></img>
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='category-sort'>
          Sort by <img src = {dropdown_icon}></img>
        </div>
      </div>
      <div className='shopcategory-products'>
        {all_product.map((item,i)=>{
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price = {item.old_price}></Item>
            }
            else{
              return null
            }
        })}
      </div>
      <div className='shopcategory-loadmore'>
        Explore more

      </div>
      <Footer/>
    </div>
  )
}
