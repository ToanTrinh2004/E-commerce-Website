import React, { useEffect, useState } from 'react';
import './Report.css';

const Report = () => {
  const [allOrderDetails, setAllOrderDetails] = useState([]);
  const [sortField, setSortField] = useState('customerID');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch all order details
    fetch('http://localhost:4000/allorderdetail')
      .then(response => response.json())
      .then(data => setAllOrderDetails(data))
      .catch(error => console.error('Error fetching order details:', error));
  }, []);

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedData = [...allOrderDetails].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setAllOrderDetails(sortedData);
  };

  const totalValue = allOrderDetails.reduce((total, order) => total + order.value, 0);

  return (
    <div className='list-product'>
      <h1>Report</h1>
      <div className='listproduct-format-main'>
        <button onClick={() => handleSort('customerID')}>
          Sort by CustomerID
        </button>
        <button onClick={() => handleSort('date')}>
          Sort by Date
        </button>
      </div>
      <div className='listproduct-allproduct'>
        <table>
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>Value</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {allOrderDetails.map((order, index) => (
              <tr key={index}>
                <td>{order.customerID}</td>
                <td>{order.value}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='total-value'>
          <strong>Total Value:</strong> {totalValue}
        </div>
      </div>
    </div>
  );
};

export default Report;
