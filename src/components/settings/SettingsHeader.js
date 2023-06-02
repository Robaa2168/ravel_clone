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
          to="/settings/profile"
          className={styles.account}
          activeClassName={styles.active}
        >
          Account
        </NavLink>
        <NavLink
          to="/settings"
          className={styles.account}
          activeClassName={styles.active}
        >
          Security
        </NavLink>
        <NavLink
          to="/settings/privacy"
          className={styles.account}
          activeClassName={styles.active}
        >
          Data & Privacy
        </NavLink>
        <NavLink
          to="/settings/payments"
          className={styles.account}
          activeClassName={styles.active}
        >
          Payments
        </NavLink>
        <NavLink
          to="/settings/notifications"
          className={styles.account}
          activeClassName={styles.active}
        >
          Notifications
        </NavLink>
        <NavLink
          to="/settings/seller-tools"
          className={styles.account}
          activeClassName={styles.active}
        >
          Seller Tools
        </NavLink>
      </div>
    </div>
  );
}

export default SettingsHeader;
