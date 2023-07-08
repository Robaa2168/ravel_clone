import React, { useState } from "react";
import styles from "./FinishRequest.module.css";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";
import api from "../../api";
import { useUser } from "../context";

function FinishRequest() {
  const location = useLocation();
  const { id, firstName, lastName } = location.state.receiverInfo;
  const { user, login } = useUser();
  const [transferamount, setTransferAmount] = useState("0.00");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSuccess, setShowSuccess] = useState(false);
  const [transferDate, setTransferDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transferError, setTransferError] = useState("");
  const [purpose, setPurpose] = useState("");

  const getUniqueCurrencies = (accounts) => {
    const currenciesSet = new Set(accounts.map((account) => account.currency));
    return Array.from(currenciesSet);
  };

  // Retrieve accounts from localStorage
  const storedAccounts = JSON.parse(localStorage.getItem("user")).accounts;
  const currencies = getUniqueCurrencies(storedAccounts); // Fetch unique currencies from user's accounts

  const isNextButtonDisabled =
    transferamount === "0.00" || transferamount === "";

  async function handleTransferSubmit() {
    setIsLoading(true);

    try {
      const response = await api.post("/api/transfer", {
        userId: user.primaryInfo?._id,
        fromCurrency: selectedCurrency,
        payID: id,
        amount: transferamount,
      });
      if (response.status === 200) {
        const balanceResponse = await api.get("/api/getUserBalances", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "user-id": user?.primaryInfo?._id, // Pass the userId as a custom header
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = {
            ...user,
            accounts: balanceResponse.data.accounts,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
        }
        setIsLoading(false);
        setShowSuccess(true);
        setTransferDate(new Date().toLocaleString());
        setTransferError("");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setTransferError(error.response.data.message);
        setIsLoading(false);
      } else {
        setTransferError("Error during transfer.");
        setIsLoading(false);
      }
    }
  }

  return showSuccess ? (
      <div className={styles["animation-container"]}>
        <Lottie 
          animationData={successAnimation}
          style={{ width: '200px', height: '200px' }} 
        />
        <div className={styles["transfer-details"]}>
          <h2>Transfer Successful</h2>
          <p><strong>Transfer ID:</strong> {id}</p>
          <p><strong>Receiver:</strong> {`${firstName} ${lastName}`}</p>
          <p><strong>Amount:</strong> {`${transferamount} ${selectedCurrency}`}</p>
          <p><strong>Date:</strong> {transferDate}</p>
        </div>
      </div>
  ) : (
    <div className={styles.buy}>
      <div className={styles.buyDiv1}>
      {transferError && <p className={styles.errorMessage}>{transferError}</p>}
        <div className={styles.forUsername}>
          <FaUser className={styles.forUsername1} />
          <p className={styles.forUsernameP}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.dollaSign}>
          <div className={styles.currencyContainer}>
            <FaDollarSign className={styles.dSign} />
          </div>
          <input
            type="text"
            className={styles.finishRequestInput}
            value={transferamount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />
        </div>
        <div className={styles.currencyDropdownContainer}>
          <select
            className={styles.currencyDropdown}
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className={styles.finishRequestInput1}
          placeholder="+ What's this payment for?"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      <div className={styles.eligible}>
        <p className={styles.eligibleP1}>
          Eligible purchases are covered by{" "}
          <Link className={styles.buyer}>Ravel Buyer Protection</Link>
        </p>
        <p className={styles.eligibleP2}>
          For more information please read our{" "}
          <Link className={styles.buyer}>user agreement.</Link>
        </p>
      </div>

      <div className={styles.btns2}>
        <button
          className={styles.continue1}
          disabled={isNextButtonDisabled || isLoading}
          onClick={handleTransferSubmit}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>

        <Link className={styles.continue2} to="/send-and-request/send-to">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default FinishRequest;
