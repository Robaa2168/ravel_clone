import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-footer">
      <div>
        <i onClick={() => navigate('/')} className="fas fa-home"></i>
      </div>
      <div>
        <i onClick={() => navigate('/wallet')} className="fas fa-paper-plane"></i>
      </div>
      <div>
        <i onClick={() => navigate('/Currencies')} className="fas fa-hand-holding-usd"></i>
      </div>
    </div>
  );
}

export default Footer;
