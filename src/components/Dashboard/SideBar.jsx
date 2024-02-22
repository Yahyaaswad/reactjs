import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './bars.css'

const Sidebar = () => {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='side-bar pt-3'>
        <Link
        to='DashCat'
        className={`align-items-center gap-2 side-bar-link ${activeButton === 'Categories' && 'active'}`}
        onClick={() => handleButtonClick('Categories')}
      >
        <h6>Categories</h6>
      </Link>
      <Link
        to='Dashprod'
        className={`align-items-center gap-2 side-bar-link ${activeButton === 'Product' && 'active'}`}
        onClick={() => handleButtonClick('Product')}
      >
        <h6>Product</h6>
      </Link>
    
      <Link
        to='DashOrd'
        className={`align-items-center gap-2 side-bar-link ${activeButton === 'Orders' && 'active'}`}
        onClick={() => handleButtonClick('Orders')}
      >
        <h6>Orders</h6>
      </Link>
    </div>
  );
};

export default Sidebar;
