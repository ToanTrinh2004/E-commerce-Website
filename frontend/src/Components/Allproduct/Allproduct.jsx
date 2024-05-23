import React, { useEffect, useState, useRef } from 'react';
import './Allproduct.css';
import { Item } from '../Items/Item';
import dropdown_icon from '../Assets/dropdown_icon.png';
import { Footer } from '../Footer/Footer';
import find from '../Assets/find.png';

export const Allproduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Number of products to show initially
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const productsContainerRef = useRef(null); // Ref for the products container

  useEffect(() => {
    // Fetch all products
    fetch('http://localhost:4000/allproducts')
      .then(response => response.json())
      .then(data => setAllProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 8); // Load more products
    setTimeout(() => {
      if (productsContainerRef.current) {
        // Scroll to the current bottom of the products container
        const { offsetTop, offsetHeight } = productsContainerRef.current;
        window.scrollTo({
          top: offsetTop + offsetHeight,
          behavior: 'smooth'
        });
      }
    }, 100); // Adjust the timeout as needed
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='shop-category'>
      <h1>All Products</h1>
      <div className='shopcategory-indexSort'>
        <div className='search-bar'>
        <img src={find}></img>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className='shopcategory-products' ref={productsContainerRef}>
        {filteredProducts.slice(0, visibleCount).map((item, i) => (
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
      {visibleCount < filteredProducts.length && (
        <div onClick={handleLoadMore} className='shopcategory-loadmore'>
          Load More
        </div>
      )}
      <Footer />
    </div>
  );
};
