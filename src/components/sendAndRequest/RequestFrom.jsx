import React, { useState } from "react";
import "./RequestFrom.css"
import { Link, useNavigate } from "react-router-dom";
import { RiBookletLine } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";

function RequestFrom() {

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequest = () => {
    navigate("/request")
  }

  const isNextButtonDisabled = searchTerm === "";

  return (
    <div className="send-money2">
      <div className="payment2">
        <p>Request payment from</p>
        <p id="multiple">You can request multiple payments from up to 20 people.</p>
        <input
          type="text"
          className="searchInput"
          placeholder="Name, @username, email, or mobile"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="users">
          <div>
            <HiUsers /> 0/20
          </div>
        </div>

        <button id="btn2" onClick={handleRequest} disabled={isNextButtonDisabled} >Next</button>
      </div>

      <div className="more-ways2">
        <p>More ways to request</p>
        <Link className="invoice2">
          <RiBookletLine className="ways-icon2" />
          <div className="div2">
            <p className="p3">Send an invoice</p>
            <p className="p6">Customize, track, and send incoices.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default RequestFrom;