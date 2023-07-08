import React, { useState } from "react";
import styles from "./Contacts.module.css";
import { Link } from "react-router-dom";

function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.sendMoney3}>
      <input
        type="text"
        className={styles.contactInput}
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <Link className={styles.view}>View blocked contacts</Link>
    </div>
  );
}

export default Contacts;
