import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
import { RiSettings5Fill } from "react-icons/ri";
import { SlMenu } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { useUser } from "./context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const popUpRef = useRef(null);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 50);
  };
  // Detect the click outside the sidebar pop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popUpRef.current && !popUpRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the sidebar pop when the route changes
  const location = useLocation();
  useEffect(() => {
    setToggle(false);
  }, [location]);

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <div className="header-container">
      <div
        className="navbar"
        style={{
          transform: toggle ? "translateX(60%)" : "translateX(0)",
          transition: "all 0.3s",
        }}
      >
        {!toggle ? (
          <SlMenu className="sideMenu" onClick={handleToggle} />
        ) : (
          <RxCross2 className="sideMenu" onClick={handleToggle} />
        )}

        <div className="dashboardheader">

          <div className="navLinks">
            <Link to="/" className="navLink">
              Dashboard
            </Link>
            <Link to="/send-and-request" className="navLink">
              Send and Request
            </Link>
            <Link to="/wallet" className="navLink">
              Wallet
            </Link>
            <Link to="/Currencies" className="navLink">
              Currencies
            </Link>
            <Link to="/Activity" className="navLink">
              Activity
            </Link>
            <Link to="/help" className="navLink">
              Help
            </Link>

          </div>
        </div>
        <div className="logOut">
          <IoNotifications className="settings" />
          <Link to="/settings" className="settings1">
            <RiSettings5Fill className="settings" />
          </Link>
          <Link onClick={handleLogout} className="logout">LOG OUT</Link>
        </div>
      </div>
      {toggle ? (
        <div className="popUp" ref={popUpRef}>
          <div className="popUp1">
            <Link onClick={handleLogout} className="popUp2">LOG OUT</Link>
            <Link to="/settings" className="popUp2">
              <RiSettings5Fill className="" />
            </Link>
          </div>

          <p className="popUpP">{user?.userInfo?.firstName} {user?.userInfo?.lastName}</p>


          <div className="popLinks">
            <Link to="/" className="popLink">
              Dashboard
            </Link>
            <Link to="/send-and-request" className="popLink">
              Send and Request
            </Link>
            <Link to="/wallet" className="popLink">
              Wallet
            </Link>
            <Link to="/Currencies" className="popLink">
              Currencies
            </Link>
            <Link to="/Activity" className="popLink">
              Activity
            </Link>
            <Link to="/help" className="popLink">
              Help
            </Link>

          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
