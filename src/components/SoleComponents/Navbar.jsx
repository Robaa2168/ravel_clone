import React from "react";
import styles from "./SettingsHeader.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function SettingsHeader() {
  const location = useLocation();

  const handleSwipe = (eventData) => {
    if (eventData.dir === "Left") {
      // Handle swipe left logic
    } else if (eventData.dir === "Right") {
      // Handle swipe right logic
    }
  };

  const swipeHandlers = useSwipeable({ onSwiped: handleSwipe });

  return (
    <div className={styles.settingsNav} {...swipeHandlers}>
      <div className={styles.scrollContainer}>
        <NavLink
          to="/ravel-mpesa/deposit"
          className={` ${styles.account} ${
            location.pathname === "/ravel-mpesa/deposit" ? styles.active : ""
          }`}
        >
          Deposit
        </NavLink>
        <NavLink
          to="/ravel-mpesa/withdraw"
          className={` ${styles.account} ${
            location.pathname === "/ravel-mpesa/withdraw" ? styles.active : ""
          }`}
        >
          Withdraw
        </NavLink>
        <NavLink
          to="/ravel-mpesa/history"
          className={` ${styles.account} ${
            location.pathname === "/ravel-mpesa/history" ? styles.active : ""
          }`}
        >
          History
        </NavLink>
      </div>
    </div>
  );
}

export default SettingsHeader;
