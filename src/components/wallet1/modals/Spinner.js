import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="lds-ripple">
        <div style={{ borderColor: '#0070BA' }}></div>
        <div style={{ borderColor: '#0070BA' }}></div>
      </div>
    </div>
  );
};

export default Spinner;
