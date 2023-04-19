import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useUser } from "./context";
import classNames from "classnames";

const Sidebar = ({ isOpen, setIsSidebarOpen, onLinkClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const sidebarRef = useRef(); 

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 50);
  };

  const sidebarStyle = {
    left: isOpen || window.innerWidth > 992 ? "0" : "-100%",
    position: "fixed",
    transition: "left 0.3s ease-in-out",
  };
  
  // New useEffect block to handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth <= 992 && isOpen) {
          setIsSidebarOpen(false); // Close the sidebar when clicked outside
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsSidebarOpen, sidebarRef]);

  return (
    <div className="sidebar" style={sidebarStyle} ref={sidebarRef}>
          <div className="logo">
            <a href="/home" className="brand-icon">
              <span className="logo-text">RavelMobile</span>
            </a>
          </div>
          <div className="menu">
            <ul>
              <li>
                <Link to="/" onClick={onLinkClick} className="menu-item active">
                  <i className="bi bi-house menu-item-icon"></i>
                  <span className="menu-item-text">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/wallet" onClick={onLinkClick} className="menu-item">
                  <i className="bi bi-wallet menu-item-icon"></i>
                  <span className="menu-item-text">Wallet</span>
                </Link>
              </li>
              <li>
                <Link to="/loan" onClick={onLinkClick} className="menu-item">
                  <i className="bi bi-cash menu-item-icon"></i>
                  <span className="menu-item-text">Loan</span>
                </Link>
              </li>
              <li>
                <Link to="/accounts" onClick={onLinkClick} className="menu-item">
                  <i className="bi bi-person menu-item-icon"></i>
                  <span className="menu-item-text">Accounts</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={onLinkClick} className="menu-item">
                <i className="bi bi-shield-lock menu-item-icon"></i>
                  <span className="menu-item-text">Security</span>
                </Link>
              </li>
              <li>
                <Link to="/ticket" onClick={onLinkClick} className="menu-item">
                  <i className="bi bi-ticket menu-item-icon"></i>
                  <span className="menu-item-text">Tickets</span>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}  className="menu-item">
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
