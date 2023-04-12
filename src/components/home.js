import React, { useEffect, useState } from "react";
import { useUser } from "./context";
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import './home.css';


function generateAvatarBackgroundColor(initial) {
  const baseHue = (initial.charCodeAt(0) * 39) % 360;
  return `hsl(${baseHue}, 50%, 50%)`;
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [transactions, setTransactions] = useState([])


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
              <h3>${usdBalance} USD</h3>

            </div>
            <div className="dashboard-account-hold">
              <p>Money on Hold</p>
              <h3>$0.00 USD</h3>
            </div>
            <div className="dashboard-payid">
  <p>Pay ID: {user?.primaryInfo?.payID}</p>
</div>
          </div>

          <div className="dashboard-banks-cards">
            <h3>Banks and Cards</h3>
            {creditCardSVG}
            {/* Add your bank and card content here */}
          </div>
          <div className="dashboard-currency-menu">
            <button className="dashboard-currency-btn">•••</button>
            <div className="dashboard-currency-dropdown">
              {/* Add your currency actions here, such as "Add currency" */}
            </div>
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

