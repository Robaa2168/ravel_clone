import React, { useState } from "react";
import "./Contacts.css";
import { Link } from "react-router-dom";

function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="send-money3">
      <input
        type="text"
        className="searchInput"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />

      <Link className="view">View blocked contacts</Link>
    </div>
  );
}

export default Contacts;
