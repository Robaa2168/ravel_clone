import React from "react";
import "./SettingsHeader.css";
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
    <div className="settingsNav" {...swipeHandlers}>
      <div className="scrollContainer">
        <NavLink
          to="/settings/profile"
          className="account"
          activeClassName="active"
        >
          Account
        </NavLink>
        <NavLink
          to="/settings/security"
          className="account"
          activeClassName="active"
        >
          Security
        </NavLink>
        <NavLink
          to="/settings/privacy"
          className="account"
          activeClassName="active"
        >
          Data & Privacy
        </NavLink>
        <NavLink
          to="/settings/payments"
          className="account"
          activeClassName="active"
        >
          Payments
        </NavLink>
        <NavLink
          to="/settings/notifications"
          className="account"
          activeClassName="active"
        >
          Notifications
        </NavLink>
        <NavLink
          to="/settings/seller-tools"
          className="account"
          activeClassName="active"
        >
          Seller Tools
        </NavLink>
      </div>
    </div>
  );
}

export default SettingsHeader;
