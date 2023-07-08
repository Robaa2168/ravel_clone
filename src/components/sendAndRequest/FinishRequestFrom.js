import React, { useState, useEffect, useContext } from "react";
import styles from "./FinishRequestFrom.module.css";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";
import api from "../../api";
import { useUser } from "../context";

function FinishRequestFrom() {
  const location = useLocation();
  const { id, firstName, lastName } = location.state.receiverInfo;
  const { user, login } = useUser();
  const [requestAmount, setRequestAmount] = useState("0.00");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestDate, setRequestDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [purpose, setPurpose] = useState("");

  const getUniqueCurrencies = (accounts) => {
    const currenciesSet = new Set(accounts.map((account) => account.currency));
    return Array.from(currenciesSet);
  };

  const storedAccounts = JSON.parse(localStorage.getItem("user")).accounts;
  const currencies = getUniqueCurrencies(storedAccounts);

  const isNextButtonDisabled = requestAmount === "0.00" || requestAmount === "";

  async function handleRequestSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/request", {
        userId: user.primaryInfo?._id,
        PayID: id,
        amount: requestAmount,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setShowSuccess(true);
        setRequestDate(new Date().toLocaleString());
        setRequestError("");
        const balanceResponse = await api.get("/api/getUserBalances", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "user-id": user?.primaryInfo?._id,
          },
        });

        if (balanceResponse.status === 200) {
          const updatedUser = {
            ...user,
            accounts: balanceResponse.data.accounts,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          login(updatedUser);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setRequestError(error.response.data.message);
        setIsLoading(false);
      } else {
        setRequestError("Error sending request.");
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
        <h2>Request Successful</h2>
        <p><strong>Request ID:</strong> {id}</p>
        <p><strong>Receiver:</strong> {`${firstName} ${lastName}`}</p>
        <p><strong>Amount:</strong> {`${requestAmount} ${selectedCurrency}`}</p>
        <p><strong>Date:</strong> {requestDate}</p>
      </div>
    </div>
  ) : (
    <div className={styles.buy}>
      <div className={styles.buyDiv1}>
        {requestError && <p className={styles.errorMessage}>{requestError}</p>}
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
            className={styles.finishRequestFromInput}
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value)}
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
          className={styles.finishRequestFromInput1}
          placeholder="+ What's this request for?"
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
          onClick={handleRequestSubmit}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>

        <Link className={styles.continue2} to="/send-and-request/request-from">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default FinishRequestFrom;
