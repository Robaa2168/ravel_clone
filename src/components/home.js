import React, { useEffect, useState } from "react";
import { FaCcApplePay, FaEllipsisV, FaFileInvoice, FaStore, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from "./context";
import api from '../api';
import './home.css';

const Dashboard = () => {

  const [showMore, setShowMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user,login } = useUser();

  const paymentActivity = [

  ];

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


  const accounts = user?.accounts;
  let primaryAccount;
  let accountStatus = "";
  
  for (let i = 0; i < accounts?.length; i++) {
    if (accounts[i].isPrimary) {
      primaryAccount = accounts[i];
  
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

  const getCurrencySymbol = (currency) => {
    const currencySymbols = {
      USD: "$",
      GBP: "£",
      AUD: "A$",
      CAD: "C$",
      EUR: "€",
      ZAR: "R",
      KES: "KSh",
      UGX: "USh",
      ZMW: "ZK",
      NGN: "₦",
      RWF: "FRw",
    };
  
    return currencySymbols[currency] || currency;
  };
  

  return (
<main>
      {user?.primaryInfo?.isBanned ? (
        <div className="dashboard-info-message ">
          <p>
            Attention: Your account has been permanently limited. <br></br>
            You can no longer use Ravel as we've decided to permanently limit your account after a review.
          </p>
        </div>
      ) : primaryAccount && primaryAccount.isHeld && (
        <div className="dashboard-info-message ">
          <p>
            Attention: Your account is temporarily on hold. Please contact{" "}
            <a href="mailto:support@ravelmobile.com" style={{ color: "inherit" }}>
              support@ravelmobile.com
            </a>{" "}
            for further information.
          </p>
        </div>
      )}

 <div className='myapp-dashboard'>
      <section className='myapp-cards-container'>
        <div className="myapp-pypl-card myapp-card-balance-card">
          <div className="myapp-pypl-card-header">
            <h3 className='balance-title'>Ravel balance</h3>
            <div className="pypl-icon-container">
              <FaEllipsisV onClick={() => setShowPopup(!showPopup)} className='pypl-balance-icon' />
            </div>
            {showPopup && <div className="pypl-popup">
              <ul>
                <Link to="/Currencies">Activate currencies</Link>
                <Link to="/Currencies">Manage currencies</Link>
                <Link to="/">Get help</Link>
              </ul>
            </div>}
          </div>
          <div className="myapp-pypl-card-body">
          {primaryAccount && (
      <h1 className={`myapp-pypl-balance ${primaryAccount.isHeld ? "text-danger" : ""}`}>
        <span className="myapp-pypl-currency">{getCurrencySymbol(primaryAccount.currency)}</span> {primaryAccount.balance}
      </h1>
    )}

    <span className='myapp-pypl-card-text'>Status:</span>
    {accountStatus === "active" && (
    <span className='myapp-status-pill myapp-status-active'>Active</span> 
  )}
  {accountStatus === "inactive" && (
   <span className='myapp-status-pill myapp-status-inactive'>Inactive</span> 
  )}
  {accountStatus === "banned" && (
  <span className='myapp-status-pill myapp-status-banned'>Banned</span> 
  )}
  
    <div className="myapp-payid">Pay ID: {user?.primaryInfo?.payID}</div>
  </div>
          <div className="myapp-pypl-card-footer">
          <Link to="/wallet"className='myapp-pypl-primary-btn'>Transfer funds</Link>
          </div>
        </div>

        <div className="myapp-pypl-card myapp-activity-card">
          <div className="myapp-pypl-card-header">
            <h5 className='myapp-activity-heading'>Recent Activity</h5>
            <div className="myapp-pypl-card-body">
              {paymentActivity.length === 0 && <p>See when money comes in, and when it goes out. You’ll find your recent Ravel activity here.</p>}
              <div className='myapp-acitvity-cards'>
                {
                  paymentActivity.map((activity, index) => (
                    <div key={activity.id} className="myapp-activity">
                      <div className='myapp-activity-icon'>
                        <FaStore className='myapp-icon' />
                      </div>
                      <div className='myapp-activity-info'>
                        <div className="myapp-header">
                          <span className="myapp-activity-name">{activity.name}</span>
                          <span className='myapp-payment'>-${activity.amount}</span>
                        </div>
                        <div className="myapp-date">
                          <span>{activity.date} . {activity.type}</span>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="myapp-pypl-card-footer">
              <Link to="/activity" className='myapp-show-all'>Show all</Link>
            </div>
          </div>
        </div>
      </section>

      <section className='myapp-desktop-sidebar'>
        <div className="myapp-links-container">
          <div className="myapp-buttons-container">
            <Link to="/wallet" className="myapp-pypl-secondary-btn">Send</Link>
            <Link to="/wallet" className="myapp-pypl-secondary-btn">Request</Link>
          </div>
          <ul className='myapp-kebab-menu-container'>
            <li>
              <button>
                <span className='myapp-icon-container'>
                  {showMore
                    ? <FaTimes className='myapp-pypl-icon' onClick={() => setShowMore(false)} />
                    : <FaEllipsisV className='myapp-pypl-icon' onClick={() => setShowMore(true)} />
                  }
                </span>
                <span className='myapp-more-info'>{showMore ? "Close" : "More"}</span>
              </button>
            </li>
          </ul>

          {showMore && <div className="myapp-hidden-dropdown">
            <ul>
              <li className='myapp-hidden-dropdown-item'>
                <div className="myapp-icon-container"><span><FaFileInvoice /></span></div>
                <span className='myapp-dropdown-link'>Create an invoice</span>
              </li>
              <li className='myapp-hidden-dropdown-item'>
                <div className="myapp-icon-container"><span><FaFileInvoice /></span></div>
                <span className='myapp-dropdown-link'>Create an estimate</span>
              </li>
              <li className='myapp-hidden-dropdown-item'>
                <div className="myapp-icon-container"><span><FaFileInvoice /></span></div>
                <span className='myapp-dropdown-link'>Go to Resolution Center</span>
              </li>
            </ul>
          </div>}
        </div>

        <div className="myapp-banks-and-cards">
          <div className="myapp-pypl-header">
            <h4>Banks and cards</h4>
            <span>
              <FaEllipsisV />
            </span>
          </div>
          <div className="myapp-pypl-body">
            <span>
              <FaCcApplePay />
            </span>
            <p>Shop and send payments more securely. Link your credit card now</p>
          </div>
          <Link to="/" className='myapp-pypl-footer'>
            Link a Card or Bank
          </Link>
        </div>

      </section>
      </div>
    </main>
  );
}

export default Dashboard;
