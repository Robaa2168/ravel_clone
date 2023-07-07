import React, { useState } from "react";
import "./FinishRequest.css";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

function FinishRequest() {
  const [searchTerm, setSearchTerm] = useState("0.00");
  const [searchTerm1, setSearchTerm1] = useState("");

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Format input value

  const handleSearchTermChange1 = (event) => {
    setSearchTerm1(event.target.value);
  };

  const isNextButtonDisabled = searchTerm1 === "";

  return (
    <div className="buy">
      <div className="buy-div1">
        <div className="for-username">
          <FaUser className="for-username1" />
          <p className="for-usernameP">stanleymayore@gmail.com</p>
        </div>
        <div className="dolla-sign">
          <FaDollarSign className="d-sign" />
          <input
            type="text"
            className="searchInput5"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <p className="us-currency">USD</p>
        <input
          type="text"
          className="searchInput6"
          placeholder="+ What's this payment for?"
          value={searchTerm1}
          onChange={handleSearchTermChange1}
        />
      </div>

      <div className="eligible">
        <p className="eligible-p1">
          Eligible purchases are covered by{" "}
          <Link className="buyer">Ravel Buyer Protection</Link>
        </p>
        <p className="eligible-p2">
          For more information please read our{" "}
          <Link className="buyer">user agreement.</Link>
        </p>
      </div>

      <div className="btns-2">
        <button className="continue1" disabled={isNextButtonDisabled}>
          Continue
        </button>
        <Link className="continue2" to="/send-and-request/send-to">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default FinishRequest;
