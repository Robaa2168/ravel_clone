import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
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
    <div className={styles.headerContainer}>
      <div
        className={styles.navbar}
        style={{
          transform: toggle ? "translateX(60%)" : "translateX(0)",
          transition: "all 0.3s",
        }}
      >
        {!toggle ? (
          <SlMenu className={styles.sideMenu} onClick={handleToggle} />
        ) : (
          <RxCross2 className={styles.sideMenu} onClick={handleToggle} />
        )}

        <div className={styles.dashboardheader}>
          <div className={styles.navLinks}>
            <Link to="/" className={styles.navLink}>
              Dashboard
            </Link>
            <Link to="/send-and-request" className={styles.navLink}>
              Send and Request
            </Link>
            <Link to="/wallet" className={styles.navLink}>
              Wallet
            </Link>
            <Link to="/Currencies" className={styles.navLink}>
              Currencies
            </Link>
            <Link to="/Activity" className={styles.navLink}>
              Activity
            </Link>
            <Link to="/help" className={styles.navLink}>
              Help
            </Link>
          </div>
        </div>
        <div className={styles.logOutDiv}>
          <IoNotifications className={styles.settings} />
          <Link to="/settings" className={styles.settings1}>
            <RiSettings5Fill className={styles.settings} />
          </Link>
          <Link onClick={handleLogout} className={styles.logout}>
            LOG OUT
          </Link>
        </div>
      </div>
      {toggle ? (
        <div className={styles.popUp} ref={popUpRef}>
          <div className={styles.popUp1}>
            <Link onClick={handleLogout} className={styles.popUp2}>
              LOG OUT
            </Link>
            <Link to="/settings" className={styles.popUp2}>
              <RiSettings5Fill className="" />
            </Link>
          </div>

          <p className={styles.popUpP}>
            {user?.userInfo?.firstName} {user?.userInfo?.lastName}
          </p>

          <div className={styles.popLinks}>
            <Link to="/" className={styles.popLink}>
              Dashboard
            </Link>
            <Link to="/send-and-request" className={styles.popLink}>
              Send and Request
            </Link>
            <Link to="/wallet" className={styles.popLink}>
              Wallet
            </Link>
            <Link to="/Currencies" className={styles.popLink}>
              Currencies
            </Link>
            <Link to="/Activity" className={styles.popLink}>
              Activity
            </Link>
            <Link to="/help" className={styles.popLink}>
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
