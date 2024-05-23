import React, { useContext,useState,useEffect } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContex'
import remove_icon from '../Assets/cart_cross_icon.png'
export const CartItems = () => {
    const [discountCode, setDiscountCode] = useState('');
    const [discountValue, setDiscountValue] = useState(0);
    const[all_promoteCode,setAll_promoteCode] = useState([]);
    const[orderDetails, setOrderDetails] = useState({
      customerID: localStorage.getItem('email'),
      value:"",
      date:""
    })
    useEffect(() => {
      // Fetch all promote codes
      fetch('http://localhost:4000/allpromotecode')
          .then(response => response.json())
          .then(data => setAll_promoteCode(data))
          .catch(error => console.error('Error fetching promote codes:', error));
  }, []);
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    const Discount = (code) => {
      // Find the promotion code in the array
      const promoCode = all_promoteCode.find(promo => promo.code === code);
      // If the code exists, return the value, otherwise return 0
      return promoCode ? promoCode.value : 0;
  };
    const handleApplyDiscount = () => {
      const discount = Discount(discountCode);
      setDiscountValue(discount);
      alert('Successful');
  };
  const Add_OrderDetail = async () => {
    // Set the order value and date
    const totalValue = getTotalCartAmount() - Math.round(discountValue * getTotalCartAmount());
    const currentDate = new Date().toISOString();

    setOrderDetails(prevDetails => ({
        ...prevDetails,
        value: totalValue,
        date: currentDate
    }));

    let order = {
        ...orderDetails,
        value: totalValue,
        date: currentDate
    };

    console.log(order);

    await fetch('http://localhost:4000/addorderdetail', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then((resp) => resp.json())
    .then((data) => {
        if (data.success) {
            alert("Order Added");
            window.location.replace('/Cart')
        } else {
            alert("Failed");
        }
    });
};
  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
      {all_product.map((e)=>{
        if(cartItems[e.id]>0){
            return ( <div>
                        <div className='cartitems-format cartitems-format-main'>
                            <img src = {e.image}  alt='' className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className='carticon-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt = "" ></img>
                        </div>
                        <hr></hr>
                    </div> );
        }
        return null;
       })}
       <div className='cartitems-down'>
        <div className='cartitems-total'>
        <h1>cart Total</h1>
        <div>
          <div className='cartitems-total-item'>
            <p>Subtatal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr></hr>
          <div className='cartitems-total-item'>
              <p>Shipping Fee</p>
              <p>Free</p>
          </div>
          <hr></hr>
          <div className='cartitems-total-item'>
              <p>Discount</p>
              <p>${Math.round(discountValue * getTotalCartAmount())}</p>
          </div>
          <hr></hr>
          <div className='cartitems-total-item'>
              <h3>Total</h3>
              <h3>${getTotalCartAmount()-Math.round(discountValue * getTotalCartAmount())}</h3>
          </div>
        </div>
          <button onClick={Add_OrderDetail}>PROCEED TO CHECK OUT</button>
        </div>
        <div className='cartitems-promocode'>
            <p>If you have a promo code, Enter it here</p>
            <div className='cartitems-promobox'>
              <input type="text" 
                value={discountCode} 
                onChange={(e) => setDiscountCode(e.target.value)} 
                placeholder="Enter discount code" />
              <button onClick={handleApplyDiscount}>
    Submit
</button>

            </div>
        </div>
       </div>
    </div>
  )
}
