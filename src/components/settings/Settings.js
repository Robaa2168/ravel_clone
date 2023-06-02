import React from "react";
import SettingsHeader from "./SettingsHeader";
import { Route, Routes } from "react-router-dom";
import Security from "./Security";
import Account from "./Account";

function Settings() {
  return (
    <div>
      <SettingsHeader />
      <Routes>
        <Route path="/" element={<Security />} />
        <Route path="/profile" element={<Account />} />
      </Routes>
    </div>
  );
}

export default Settings;
