import React, { useEffect, useRef, useState } from "react";
import "./Activity.Module.css";
import { RiDownload2Fill } from "react-icons/ri";
import { BsBank } from "react-icons/bs";

const Activity = () => {
  // Sample data to use
  const [transactions, setTransactions] = useState([
    
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("Last 90 Days");
  const [filterType, setFilterType] = useState("Type");
  const [filterStatus, setFilterStatus] = useState("Status");
  const [hasOutline, setHasOutline] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const inputRef = useRef(null);
  const divRef = useRef(null);

  // Options for date
  const dateOptions = [
    "This Month",
    "Last Month",
    "Last 90 Days",
    "This Year",
    "Last Year",
  ];

  //Options for type
  const typeOptions = [
    "Automatic Payments",
    "Payments",
    "Payments Received",
    "Refunds",
    "Transfers",
    "Reported Transactions",
  ];

  // Options for status
  const statusOptions = [
    "Incoming payments to review",
    "Tracking numbers to add",
    "Shipping labels to print",
    "Payment requests to review",
    "Invoices to pay",
    "Holds",
  ];

  // Handle pop up toggle for date
  function handleButtonClick() {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
    setIsOpen3(false);
  }

  // Handle pop up toggle for type
  function handleButtonClick1() {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
    setIsOpen3(false);
  }

  // Handle pop up toggle for status
  function handleButtonClick2() {
    setIsOpen3(!isOpen3);
    setIsOpen2(false);
    setIsOpen1(false);
  }

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Date change
  const handleFilterDateChange = (option) => {
    setFilterDate(option);
    setIsOpen1(false);
  };

  // Handle type change
  const handleFilterTypeChange = (option) => {
    setFilterType(option);
    setIsOpen2(false);
  };

  // Handle status change
  const handleFilterStatusChange = (option) => {
    setFilterStatus(option);
    setIsOpen3(false);
  };

  const handleDownload = () => {
    // Implement download functionality here
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const searchTermLowerCase = searchTerm.toLowerCase();

    // Check if transaction date matches filter
    if (filterDate !== "all" && transaction.date !== filterDate) {
      return false;
    }

    // Check if transaction type matches filter
    if (filterType !== "Type" && transaction.type !== filterType) {
      return false;
    }

    // Check if transaction status matches filter
    if (filterStatus !== "Status" && transaction.status !== filterStatus) {
      return false;
    }

    // Check if transaction name or email matches search term
    if (
      !transaction.name.toLowerCase().includes(searchTermLowerCase) &&
      !transaction.email.toLowerCase().includes(searchTermLowerCase)
    ) {
      return false;
    }

    return true;
  });

  // Handle click event for input
  useEffect(() => {
    // Add event listener to detect clicks outside of input element
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setHasOutline(false);
    }
  };

  // Handle click event for filter buttons and toggle div
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (divRef.current && !divRef.current.contains(e.target)) {
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
    }
  };

  // Handle outline for search input field
  const handleOutline = () => {
    setHasOutline(true);
  };

  return (
   <div class="main mt-4">
<div class="filters">
  <div class="header">
    <input
      type="text"
      className="searchInput"
      placeholder="Search by name or email"
      value={searchTerm}
      onChange={handleSearchTermChange}
   
      onClick={handleOutline}
      ref={inputRef}
    />
    <button onClick={handleDownload}>
      <RiDownload2Fill size={20} />
    </button>
  </div>
    <div class="filterBy">
      <p class="filterText">Filter by</p>
      <div class="allFilters">
        <div>
          <button onClick={handleButtonClick} class="button1">
            Date: {filterDate}
          </button>
          {isOpen1 && (
            <div class="options" id="options3" ref={divRef}>
              <p class="optionsDate">Date</p>
              {dateOptions.map((option) => (
                <label key={option} style={{ display: "block" }}>
                  <input
                    key={option}
                    onClick={() => handleFilterDateChange(option)}
                    type="radio"
                    value={option}
                    name="option"
                    checked={filterDate === option}
                    class="optionsInput"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
        <div id="hide">
          <button onClick={handleButtonClick1} class="button1">
            {filterType !== "Type" ? `Type: ${filterType}` : "Type"}
          </button>
          {isOpen2 && (
            <div class="options button2" ref={divRef}>
              <p class="optionsDate">Type</p>
              {typeOptions.map((option) => (
                <label key={option} style={{ display: "block" }}>
                  <input
                    key={option}
                    onClick={() => handleFilterTypeChange(option)}
                    type="radio"
                    value={option}
                    checked={filterType === option}
                    name="option"
                    class="optionsInput"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <div id="hide">
          <button onClick={handleButtonClick2} class="button1">
            {filterStatus !== "Status"
              ? `Status: ${filterStatus}`
              : "Status"}
          </button>
          {isOpen3 && (
            <div class="options" ref={divRef}>
              <p class="optionsDate">Status</p>
              {statusOptions.map((option) => (
                <label key={option} style={{ display: "block" }}>
                  <input
                    key={option}
                    onClick={() => handleFilterStatusChange(option)}
                    type="radio"
                    value={option}
                    checked={filterStatus === option}
                    name="option"
                    class="optionsInput"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  <div class="transactionContainer">
    {filteredTransactions.length !== 0 ? (
      <p class="transactionStatus">Completed</p>
    ) : (
      <></>
    )}
    <div class="month">
      {filteredTransactions.length !== 0 ? (
        <p class="eachMonth">Mar 2023</p>
      ) : (
        <></>
      )}
      {filteredTransactions.length !== 0 ? (
        filteredTransactions.map((transaction) => (
          <div class="transaction">
          <div class="transactionHistory">
            <p class="bankIcon">
              <BsBank size={22} />
            </p>
            <div class="transactionDetails">
              <p class="name">{transaction.name.toUpperCase()}</p>
              <div class="details">
                <p>{transaction.date}</p> <p class="dot">.</p>{" "}
                <p>{transaction.type}</p>
              </div>
            </div>
          </div>
          <p class="amount">
            - ${parseFloat(transaction.amount).toFixed(2)}
          </p>
        </div>
      ))
    ) : (
      <div class="notAvailable">
        <p class="noTransaction">No transaction yet.</p>
        <p class="tryAgain">
          Want to try again with different dates?
        </p>
      </div>
    )}
  </div>
  </div>
  </div>
  );
};

export default Activity;