import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useUser } from "./context";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const handleLogout = () => {
      logout();
      setTimeout(() => {
        navigate("/login");
      }, 50);
    };
    return (
        <div className="sidebar">
          <div className="logo">
            <a href="/home" className="brand-icon">
              <span className="logo-text">RavelMobile</span>
            </a>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to="/" className="menu-item active">
                  <i className="bi bi-house menu-item-icon"></i>
                  <span className="menu-item-text">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="menu-item">
                  <i className="bi bi-wallet menu-item-icon"></i>
                  <span className="menu-item-text">Wallet</span>
                </Link>
              </li>
              <li>
                <Link to="/loan" className="menu-item">
                  <i className="bi bi-cash menu-item-icon"></i>
                  <span className="menu-item-text">Loan</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts" className="menu-item">
                  <i className="bi bi-person menu-item-icon"></i>
                  <span className="menu-item-text">Accounts</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="menu-item">
                <i className="bi bi-shield-lock menu-item-icon"></i>
                  <span className="menu-item-text">Security</span>
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="menu-item">
                  <i className="bi bi-ticket menu-item-icon"></i>
                  <span className="menu-item-text">Tickets</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="menu-item">
                  <i className="bi bi-box-arrow-right menu-item-icon"></i>
                  <span className="menu-item-text">Signout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    };      

export default Sidebar;
