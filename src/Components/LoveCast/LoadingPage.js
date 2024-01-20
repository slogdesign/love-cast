import React from 'react';
import logo_icon from '../Assets/logo.png';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
      <div className="loading-container">
        <img src={logo_icon} alt="Love Cast Logo" className="logo" />
        <h1>LOVE CAST</h1>
        <p>Loading...</p>
      </div>
    );
  };
  
  export default LoadingPage;