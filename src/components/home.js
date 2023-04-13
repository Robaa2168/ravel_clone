import React, { useEffect, useState } from "react";
import { useUser } from "./context";
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { createPopper } from '@popperjs/core';

import './home.css';
import api from '../api';


function generateAvatarBackgroundColor(initial) {
  const baseHue = (initial.charCodeAt(0) * 39) % 360;
  return `hsl(${baseHue}, 50%, 50%)`;
}

const Home = () => {
  const navigate = useNavigate();
  const { user,login } = useUser();
  const [transactions, setTransactions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 300); // Add a 300ms delay before hiding the dropdown
  };
  

  


  const fetchBalance = async () => {
    try {
      const balanceResponse = await api.get('/api/getUserBalances', {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'user-id': user?.primaryInfo?._id, // Pass the userId as a custom header
        },
      });

      if (balanceResponse.status === 200) {
        // Update the local storage with the new balances
        const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Update the context
        login(updatedUser);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchBalance();
      }
    };

    // Initial fetch
    fetchBalance();

    // Add event listener to update balance when the page becomes visible
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  const dummyActivities = [
 ]

  const creditCardSVG = (
    <svg className="credit-card" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      {/* Background gradient */}
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor: '#00008B', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#7F7F7F', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient)" />

      {/* Rounded corners */}
      <rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" fill="none" stroke="white" strokeWidth="3" />

      {/* Card Logo */}
      <circle cx="45" cy="45" r="30" fill="#ffffff" />
      <text x="45" y="50" fontFamily="Arial" fontSize="22" textAnchor="middle" fill="#00008B">AE</text>

      {/* Card Number */}
      <text x="50" y="135" fontFamily="Arial" fontSize="18" textAnchor="start" fill="#ffffff">1234 5678 9012 3456</text>

      {/* Cardholder Name */}
      <text x="50" y="185" fontFamily="Arial" fontSize="16" textAnchor="start" fill="#ffffff">CARDHOLDER NAME</text>

      {/* Expiration Date */}
      <text x="280" y="185" fontFamily="Arial" fontSize="14" textAnchor="start" fill="#ffffff">EXP: 12/25</text>
    </svg>
  );

  const accounts = user.accounts;
  let usdBalance = 0;
  let accountStatus = "";
  let isHeld = false;
  
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].currency === 'USD') {
      usdBalance = accounts[i].balance;
  
      if (accounts[i].isBanned) {
        accountStatus = "banned";
      } else if (accounts[i].isActive) {
        accountStatus = "active";
      } else {
        accountStatus = "inactive";
      }
  
      isHeld = accounts[i].isHeld; // Add this line
      break;
    }
  }
  


  return (
    <div className="dashboard">
      <div className="dashboard-info-message">
        <p>Note: This site undergoes frequent changes, and users may experience major visual updates. However, functionality remains intact.</p>
      </div>
      <div className="dashboard-header">
      <h1 className="dashboard-title d-none d-md-block">Dashboard</h1>
        <div className="dashboard-actions">
          <button onClick={() => navigate('/wallet')} className="dashboard-send-btn">Send</button>
          <button onClick={() => navigate('/wallet')} className="dashboard-request-btn">Request</button>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-summary">
          <h2>Summary</h2>
          <div className="dashboard-account-summary">
          <div className="dashboard-account-balance" style={{ position: 'relative' }}>
          <div className="dashboard-currency-menu">
          <button id="dashboard-currency-btn" className="dashboard-currency-btn">⋮</button>
        <div className="dashboard-currency-dropdown">
          <p>Add currency</p>
          <p>Remove currency</p>
          <p>Change primary currency</p>
        </div>
     
    </div>

  {accountStatus === "active" && (
    <span className="dashboard-status-pill active">Active</span>
  )}
  {accountStatus === "inactive" && (
    <span className="dashboard-status-pill inactive">Inactive</span>
  )}
  {accountStatus === "banned" && (
    <span className="dashboard-status-pill banned">Banned</span>
  )}
  <p>Available Balance</p>
  <h3  className="mb-2"> ${isHeld ? "0.00" : usdBalance} USD</h3>
</div>

            <div className="dashboard-account-hold">
              <p>Money on Hold</p>
              <h3>  ${isHeld ? usdBalance: "0.00"} USD</h3>
            </div>
            <div className="dashboard-payid-and-currency">
  <div className="dashboard-payid">
    <p>Pay ID: {user?.primaryInfo?.payID}</p>
  </div>

</div>

          </div>

          <div className="dashboard-banks-cards">
            <h3>Banks and Cards</h3>
            {creditCardSVG}
            {/* Add your bank and card content here */}
          </div>
         
        </div>
        <div className="dashboard-activity-list ">
          <h3 className="mb-3 " >Recent Activity</h3>
          {dummyActivities.length === 0 ? (
            <p>No data found</p>
          ) : (
            dummyActivities.map((activity) => (
              <div key={activity.id} className="dashboard-activity-item">
                <div
                  className="dashboard-activity-avatar"
                  style={{
                    backgroundColor: generateAvatarBackgroundColor(activity.initial),
                  }}
                >


                </div>

                <div className="dashboard-activity-info">
                  <p className="dashboard-activity-title">{activity.title}</p>
                  <p className="dashboard-activity-user">{activity.user}</p>
                </div>
                <div className="dashboard-activity-date">
                  <p>{activity.date}</p>
                </div>
                <div className="dashboard-activity-amount">
                  <p>{activity.amount}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="dashboard-tools">
          <h2>Tools</h2>
          <div className="dashboard-tool-cards">
            {/* Add your tool cards or links here */}
          </div>
        </div>
      </div>
      <div className="dashboard-footer">
        <div>
          <i  onClick={() => navigate('/')} className="fas fa-home"></i>
        </div>
        <div>
          <i onClick={() => navigate('/wallet')} className="fas fa-paper-plane"></i>
        </div>
        <div>
          <i onClick={() => navigate('/wallet')} className="fas fa-hand-holding-usd"></i>
        </div>
      </div>

    </div>

  );
};

export default Home;

