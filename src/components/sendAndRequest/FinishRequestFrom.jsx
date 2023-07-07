import React, { useState } from "react";
import "./FinishRequestFrom.css";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

function FinishRequestFrom() {
  const [searchTerm, setSearchTerm] = useState("0.00");
  const [searchTerm1, setSearchTerm1] = useState("");

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTermChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const isNextButtonDisabled = searchTerm1 === "";

  return (
    <div className="request-now">
      <div className="request-div1">
        <div className="dolla-sign1">
          <FaDollarSign className="d-sign1" />
          <input
            type="text"
            className="searchInput55"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <p className="us-currency1">USD</p>
        <div className="for-username2">
          <div className="for-username2-div">
            <FaUser className="for-username11" />
            <p className="for-usernameP">stanleymayore@gmail.com</p>
          </div>
          <div className="for-username2-div1">
            <FaDollarSign className="d-sign1" /> <p>0.00</p>
          </div>
        </div>
        <Link className="someone" to="/send-and-request/request-from">
          +Add someone else?
        </Link>
        <input
          type="text"
          className="searchInput8"
          placeholder="+ What's this payment for?"
          value={searchTerm1}
          onChange={handleSearchTermChange1}
        />
      </div>

      <div className="btns-2">
        <button className="continue3" disabled={isNextButtonDisabled}>
          Request Payment
        </button>
        <Link className="continue4" to="/send-and-request/request-from">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default FinishRequestFrom;
