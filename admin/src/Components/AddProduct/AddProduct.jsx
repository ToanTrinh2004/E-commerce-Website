import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const[image,setImage]= useState(false);
  const[productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
    quantity:"",
  })
  const[promotionDetails, setPromotionDetails] = useState({
    code :"",
    value:""
  })
  const imageHandle = (e)=>{
    setImage(e.target.files[0]);
  }
  const changeHandle = (e)=>{
  setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }
  const changeHandle1 = (e)=>{
    setPromotionDetails({...promotionDetails,[e.target.name]:e.target.value})
    }
  const Add_Product = async()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
           Accept :'application/json',
        },
        body : formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success ? alert("Product Added"):alert("Failed")
        })
    }
  }
  const Add_Promotion = async()=>{
    console.log(promotionDetails);
    let responseData;
    let promotion = promotionDetails;
        console.log(promotion);
        await fetch('http://localhost:4000/addpromotecode',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(promotion),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success ? alert("Promotion Added"):alert("Failed")
        })
  }

    return (
        <div className='add-product'>
          <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandle} type='text' name='name' placeholder='Type here'/>
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input value={productDetails.old_price} onChange={changeHandle} type='text' name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
              <p> Offer Price</p>
              <input value={productDetails.new_price} onChange={changeHandle} type='text' name='new_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
              <p> quantity</p>
              <input value={productDetails.quantity} onChange={changeHandle} type='text' name='quantity' placeholder='Type here'/>
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandle} name='category' className='add-product-selector'>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <label htmlFor='file_input'>
                <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt=''/>
            </label>
                 <input onChange={imageHandle} type='file' name='image' id='file_input' hidden/>
            </div>
          <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
          <div className="addproduct-itemfield">
              <p> Promotion Code</p>
              <input value={promotionDetails.code} onChange={changeHandle1} type='text' name='code' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
              <p> value</p>
              <input value={promotionDetails.value} onChange={changeHandle1} type='text' name='value' placeholder='Type here'/>
            </div>
            <button onClick={()=>{Add_Promotion()}} className='addproduct-btn'>ADD</button>
          
        </div>
      )
    }
export default AddProduct