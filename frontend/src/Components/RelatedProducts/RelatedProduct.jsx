import React, { useState, useEffect } from 'react';
import './RelatedProducts.css';
import { Item } from '../Items/Item';

export const RelatedProduct = ({ category }) => {
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const womenResponse = await fetch('http://localhost:4000/popularinwomen');
        const womenData = await womenResponse.json();
        
        const menResponse = await fetch('http://localhost:4000/popularinman');
        const menData = await menResponse.json();
        
        const kidsResponse = await fetch('http://localhost:4000/popularinkid');
        const kidsData = await kidsResponse.json();
        
        setPopularProducts([...womenData, ...menData, ...kidsData]);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);
  
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className='relatedproducts-item'>
        {popularProducts
          .filter(item => item.category === category)
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>
    </div>
  );
};
