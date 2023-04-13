import React from 'react';
import { FaBars, FaExchangeAlt } from 'react-icons/fa';
import './header.css';

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
 
          <FaExchangeAlt className="header-logo-icon" />
         
        </div>
        <nav className="header-nav">
          <ul className="header-nav-list">
            <li className="header-nav-item">
              <a href="#personal" className="header-nav-link">Personal</a>
            </li>
            <li className="header-nav-item">
              <a href="#business" className="header-nav-link">Business</a>
            </li>
            <li className="header-nav-item">
              <a href="#developer" className="header-nav-link">Developer</a>
            </li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button className="header-login-button">Log In</button>
          <button className="header-signup-button">Sign Up</button>
        </div>
        <button onClick={onToggleSidebar}  className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" data-bs-toggle="collapse" data-bs-target="#mainHeader">
        <FaBars className="header-menu-icon" />
          </button>
 
      </div>
    </header>
  );
}

export default Header;
