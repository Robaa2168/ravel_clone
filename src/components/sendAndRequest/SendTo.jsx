import React, { useState } from "react";
import "./SendTo.css";
import { Link, useNavigate } from "react-router-dom";
import { RiBookletLine } from "react-icons/ri";

function SendTo() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBuy = () => {
    navigate("/buy");
  };

  const isNextButtonDisabled = searchTerm === "";

  return (
    <div className="send-money1">
      <div className="payment1">
        <p>Send payment to</p>
        <input
          type="text"
          className="searchInput"
          placeholder="Name, @username, email, or mobile"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />

        <button id="btn1" onClick={handleBuy} disabled={isNextButtonDisabled} >
          Next
        </button>
      </div>

      <div className="more-ways1">
        <p>More ways to send</p>
        <Link className="invoice1">
          <RiBookletLine className="ways-icon1" />
          <div className="div1">
            <p className="p1">Send an invoice</p>
            <p className="p2">Customize, track, and send incoices.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SendTo;
