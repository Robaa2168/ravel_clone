import React, { useState } from "react";
import styles from "./Deposit.module.css";
import { Navbar } from "../SoleComponents";
import { useUser } from "../context";
import api from "../../api";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";


function generateRandomTransactionNumber() {
  const prefix = "RGP";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = prefix;
  for (let i = 0; i < 5; i++) { // Adjusted loop to generate 5 random characters
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const Deposit = () => {
  const { user, login } = useUser();
  const accounts = user?.accounts;

  const getUniqueCurrencies = (accounts) => {
    const uniqueCurrencies = Array.from(new Set(accounts.map((account) => account.currency)));
    uniqueCurrencies.sort((a, b) => {
      const balanceA = accounts.find((account) => account.currency === a)?.balance || 0;
      const balanceB = accounts.find((account) => account.currency === b)?.balance || 0;
      return balanceB - balanceA;
    });
    return uniqueCurrencies;
  };

  const currencies = getUniqueCurrencies(accounts);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amountDeposit, setAmountDeposit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [depositResponse, setDepositResponse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const transID = generateRandomTransactionNumber();


  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const getBalanceForCurrency = (currency) => {
    const account = accounts.find((acc) => acc.currency === currency);
    return account ? account.balance : 0;
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("+")) {
      return phoneNumber.slice(1);
    }
    else if (phoneNumber.startsWith("254")) {
      return phoneNumber;
    } else if (phoneNumber.startsWith("0")) {
      return `254${phoneNumber.slice(1)}`;
    } else if (phoneNumber.startsWith("7") || phoneNumber.startsWith("1")) {
      return `254${phoneNumber}`;
    }
  };

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/deposit', {
        amount: parseFloat(amountDeposit),
        currency: selectedCurrency,
        initiatorPhoneNumber: user?.userInfo?.phoneNumber || user?.primaryInfo?.phoneNumber,
        phoneNumber: formattedPhoneNumber,
      });

      if (response.data && response.status === 200) {
        setSuccessMessage('STK sent, enter the PIN to complete the transaction.');

        setIsPolling(true); // set isPolling to true here

        // Start polling for the deposit status
        const checkoutRequestId = response.data.CheckoutRequestID;
        const pollInterval = 5000; // Check every 5 seconds
        const maxRetries = 12; // Maximum retries (e.g., 12 * 5 seconds = 1 minute)
        let retries = 0;

        const pollDepositStatus = setInterval(async () => {
          try {
            const depositResponse = await api.get(`/api/deposit/${checkoutRequestId}`);
            const deposit = depositResponse.data;
            if (deposit.isSuccess) {
              const balanceResponse = await api.get('/api/getUserBalances', {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                  'user-id': user?.primaryInfo?._id, // Pass the userId as a custom header
                },
              });

              if (balanceResponse.status === 200) {
                // Update the local storage with the new balances
                const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
                localStorage.setItem("user", JSON.stringify(updatedUser));

                // Update the context
                login(updatedUser);
              }
              clearInterval(pollDepositStatus);
              setLoading(false);
              setIsPolling(false);;
              setLoading(false);
              setIsPolling(false);
              setSuccessMessage(null);
              setShowSuccess(true);
            } else if (deposit.error && !deposit.isSuccess) {
              clearInterval(pollDepositStatus);
              setLoading(false);
              setIsPolling(false);
              setError(deposit.error);
              setSuccessMessage(null);
            }

            retries++;
            if (retries >= maxRetries) {
              clearInterval(pollDepositStatus);
              setLoading(false);
              setIsPolling(false); // set isPolling to false here
              setError('Transaction timeout. Please try again.');
              setSuccessMessage(null);
            }
          } catch (error) {
            console.error('Error polling deposit status:', error);
            clearInterval(pollDepositStatus);
            setLoading(false);
            setIsPolling(false); // set isPolling to false here
            setError('Error checking deposit status. Please try again.');
            setSuccessMessage(null);
          }
        }, pollInterval);
      }
    } catch (error) {
      setLoading(false);
      setSuccessMessage(null);
      setError('An error occurred while processing the transaction.');
      console.error('Error:', error);
    }
  };

  const handleContinue = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    showSuccess ? (
      <div className={styles.centeredContainer}>
        <div className={styles.animationcontainer}>
          <div className={styles.centeredContent}>
            <Lottie animationData={successAnimation} style={{ width: '200px', height: '200px' }} />
            <div className={styles.transferdetails}>
              <h2>Successful</h2>
              <p>
                <strong>Deposit ID:</strong>{`${transID}`} 
              </p>
              <p>
                <strong>Channel:</strong> Mpesa
              </p>
              <p>
                <strong>Amount:</strong> {`${amountDeposit} ${selectedCurrency}`}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString("en-US", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <>
        <Navbar />
        <section className={styles.pyplDepositSection}>
          <div className={styles.mainDepositContent}>
            <div className={styles.introHeader}>
              <h1>Deposit into your Ravel account</h1>
            </div>
  
            <div className={styles.depositWrapperSplitter}>
              <div className={styles.depositContainer}>
                {currentStep === 1 && (
                  <>
                    <h6>Deposit Amount from your Mobile Money</h6>
                    <p>Please enter your phone number:</p>
                    <div className={styles.inputContainer}>
                      <input
                        type="text"
                        placeholder="Phone Number e.g 254724..."
                        name="phoneNumber"
                        id=""
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.buttonContainer}>
                      <button onClick={handleContinue} disabled={!phoneNumber}>
                        Continue
                      </button>
                      {error && <p className={styles.error}>{error}</p>}
                    </div>
                  </>
                )}
  
                {currentStep === 2 && (
                  <>
                    <div className={styles.stepContent}>
                      <p>Please select the currency:</p>
                      <div>
                        <select
                          className={styles.customSelect}
                          name=""
                          id=""
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                          required
                        >
                          {/* Default option */}
                          <option value="" disabled hidden>
                            Select Currency
                          </option>
  
                          {/* Render the currency options */}
                          {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                              {currency}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
  
                    <div className={styles.buttonContainer}>
                      <button onClick={handleContinue} disabled={!selectedCurrency}>
                        Continue
                      </button>
                      {error && <p className={styles.error}>{error}</p>}
                    </div>
                  </>
                )}
  
                {currentStep === 3 && (
                  <>
                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <p>Please enter the amount you would like to deposit:</p>
                    <div className={styles.inputContainer}>
                      <input
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        id=""
                        value={amountDeposit}
                        onChange={(e) => setAmountDeposit(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        disabled={loading || !selectedCurrency || !phoneNumber || !amountDeposit}
                        onClick={handleSubmit}
                      >
                        {loading ? 'Processing...' : 'Continue to Deposit'}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.svgTransferIllustration}>
                <img src="/ravel-withdraw.png" alt="transfer-illustration" />
              </div>
            </div>
          </div>
          <div className={styles.importantInfo}>
            <p>
              Please note, the currency you select here is where your funds will be deposited.
              If you intend to use this money for currency activation, ensure you select the appropriate currency.
            </p>
          </div>
        </section>
      </>
    )
  );
  
};

export default Deposit;
