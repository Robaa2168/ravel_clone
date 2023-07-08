import React, { useState } from "react";
import styles from "./Help.module.css";

function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.helpMain}>
      <div>
        <div>
          <p>Help Center - Personal Account</p>
          <p>Welcome Stanley, how can we help?</p>
          <input
            type="text"
            className="helpInput"
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Help;
