import React from "react";
import styles from "./SettingsHeader.module.css";
import { NavLink } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

function SettingsHeader() {
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
          className={styles.account}
          activeClassName={styles.active}
        >
          Deposit
        </NavLink>
        <NavLink
          to="/ravel-mpesa/withdraw"
          className={styles.account}
          activeClassName={styles.active}
        >
          Withdraw
        </NavLink>
        <NavLink
          to="/history"
          className={styles.account}
          activeClassName={styles.active}
        >
         History
        </NavLink>
        
      </div>
    </div>
  );
}

export default SettingsHeader;
