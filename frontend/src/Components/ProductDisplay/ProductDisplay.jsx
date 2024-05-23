import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import { Product } from '../../Pages/Product'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContex'
import { useSearchParams } from 'react-router-dom'
export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [number,setNumber] = useState(1);
  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src = {product.image}/>
                <img src = {product.image}/>
                <img src = {product.image}/>
                <img src = {product.image}/>
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image}></img>
            </div>

        </div>
        <div className='productdisplay-right'>
            <h1 >{product.name}</h1>
            <div className='productdisplay-right-stars'>
                <img src ={star_icon}></img>
                <img src ={star_icon}></img>
                <img src ={star_icon}></img>
                <img src ={star_icon}></img>
                <img src ={star_dull_icon}></img>
                <p>{122}</p>
            </div>
            <div className='productdisplay-right-prices'>
                <div className='productdisplay-right-price-old'>${product.old_price}</div>
                <div className='productdisplay-right-new-old'>${product.new_price}</div>
            </div>
            <div className='productdisplay-right-decription'>
            Elevate your everyday style with our Classic Comfort Crew Neck T-Shirt. This versatile wardrobe essential combines effortless style with ultimate comfort, making it perfect for any occasion.

            </div>
            <div className='productdisplay-right-size'>
                <h1>Quantity</h1>
                <div className='productdisplay-right-sizes'>
                    <input type='number' value={number} onChange={(e)=>{setNumber(e.currentTarget.value)}}></input>
                </div>

            </div>
            <button onClick={()=>{addToCart(product.id,number)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category : </span>Women, T-shirt, Crop Top</p>
            <p className='productdisplay-right-category'><span>Tags : </span>Morden, Latest</p>

        </div>
    </div>
  )
}
