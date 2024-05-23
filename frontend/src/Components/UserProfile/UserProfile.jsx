import React, { useEffect, useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  const user = {
    name: localStorage.getItem('username'),
    phone: localStorage.getItem('phone'),
    address: localStorage.getItem('address'),
    email: localStorage.getItem('email')
  };

  const [allOrderDetails, setAllOrderDetails] = useState([]);

  useEffect(() => {
    // Fetch all order details
    fetch('http://localhost:4000/allorderdetail')
      .then(response => response.json())
      .then(data => setAllOrderDetails(data))           
      .catch(error => console.error('Error fetching order details:', error));
  }, []);

  // Filter order details for the current user
  const userOrderDetails = allOrderDetails.filter(order => order.customerID === user.email);

  return (
    <div>
      <div className='userprofile'>
        <h1>User Profile</h1>
        <div className='userprofile-container'>
          <div className='userprofile-item'>
            <span className='userprofile-label'>Name:</span>
            <span className='userprofile-value'>{user.name}</span>
          </div>
          <div className='userprofile-item'>
            <span className='userprofile-label'>Phone:</span>
            <span className='userprofile-value'>{user.phone}</span>
          </div>
          <div className='userprofile-item'>
            <span className='userprofile-label'>Address:</span>
            <span className='userprofile-value'>{user.address}</span>
          </div>
          <div className='userprofile-item'>
            <span className='userprofile-label'>Email:</span>
            <span className='userprofile-value'>{user.email}</span>
          </div>
        </div>
      </div>
      <div className='userprofile'>
        <h1>Order Details</h1>
        <div className='order-details-container'>
          {userOrderDetails.length > 0 ? (
            userOrderDetails.map(order => (
              <div key={order.orderID} className='order-item'>
                <div className='order-item-detail'>
                  <span className='order-label'>Price:</span>
                  <span className='order-value'>${order.value}</span>
                </div>
                <div className='order-item-detail'>
                  <span className='order-label'>Date:</span>
                  <span className='order-value'>{order.date.slice(0,10)}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No order details found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
