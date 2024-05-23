import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import AddProduct from '../AddProduct/AddProduct';
import cross_icon from '../../assets/cross_icon.png'
import { json } from 'react-router-dom';
const ListProduct = () => {
    const [allproducts,setAllproducts] = useState([]);

    const fetchInfo = async ()=>{
        await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllproducts(data)});
    }
    useEffect(()=>{
        fetchInfo();
    },[])
    const remove_product = async(id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Product</p>
        <p>Title</p>
        <p>old_price</p>
        <p>new_price</p>
        <p>Category</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproduct'>
        <hr></hr>
        {allproducts.map((product,index)=>{
            return <> <div key={index} className='listproduct-format-main listproduct-format'>
                <img src={product.image} className='listproduct-product-icon'>
                </img>
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <p>{product.quantity}</p>
                <img src={cross_icon} className='listproduct-remove-icon' onClick={()=>{remove_product(product.id)}}></img>
            </div>
            <hr></hr>
            </>
        })}
      </div>
    </div>
  )
}

export default ListProduct