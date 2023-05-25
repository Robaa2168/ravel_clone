import React, { useState, useEffect } from 'react';
import { useUser } from "./context";
import api from '../api';
import AnimatedCheckmark from "./AnimatedCheckmark";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import { BsCheckCircle } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import Confetti from 'react-confetti';
import UpdateBalanceModal from "./wallet1/modals/UpdateBalanceModal";



// Add this helper function for creating avatars with the first letter of the name
const generateAvatar = (name) => {
  const firstLetter = name ? name[0].toUpperCase() : "";
  return (
    <div
      style={{
        backgroundColor: "gray",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "20px",
      }}
    >
      {firstLetter}
    </div>
  );
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

const Wallet = () => {
  const { user } = useUser();
  const accounts = user?.accounts;
  const { login } = useUser();
  const [transferType, setTransferType] = useState(1); // 1 for Transfer, 2 for Request
  const [withdrawConvert, setWithdrawConvert] = useState(1); // 1 for Transfer, 2 for Request
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [step, setStep] = useState(1);
  const [payID, setPayID] = useState("");
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [amountdeposit, setAmountdeposit] = useState('');
  const [amountwithdrawal, setamountwithdrawal] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState(null);
  const [withdrawerror, setWithdrawError] = useState(null);
  const [transferError, setTransferError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessCheckmark, setShowSuccessCheckmark] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [showConfetti2, setShowConfetti2] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);
  const [isUpdateBalanceModalVisible, setUpdateBalanceModalVisible] = useState(false);

  // This function toggles the visibility of the UpdateBalanceModal
  const toggleUpdateBalanceModal = () => {
    setError(null);
    setUpdateBalanceModalVisible(!isUpdateBalanceModalVisible);
    
  };

  const onUpdateBalance = async (mpesaReceiptNumber) => {
    console.log("Update balance with Mpesa Receipt Number:", mpesaReceiptNumber);
  
    // Add a check to ensure a valid receipt number is provided
    if (!mpesaReceiptNumber || !mpesaReceiptNumber.trim()) {
      throw new Error('Invalid Mpesa Receipt Number');
    }
  
    try {
      // Send the receipt number to your server
      const response = await api.post(
        "/api/manual_deposit",
       
          {
            mpesaReceiptNumber,
            userId: user?.primaryInfo?._id,
            PhoneNumber: user?.phoneNumber,  // add this line
          },
        
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "user-id": user?.primaryInfo?._id,
          },
        }
      );
  
      // Check if the response status is not 2xx
      if (response.status !== 200) {
        const errorMessage = response.data && response.data.error
          ? response.data.error
          : 'Error with the deposit';
        throw new Error(errorMessage);
      }
  
      console.log('Deposit successful:', response.data);
  
      // Fetch the updated balances after the deposit
      const balanceResponse = await api.get('/api/getUserBalances', {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'user-id': user?.primaryInfo?._id,
        },
      });
  
      // Check if the balanceResponse status is not 2xx
      if (balanceResponse.status !== 200) {
        const balanceErrorMessage = balanceResponse.data && balanceResponse.data.error
          ? balanceResponse.data.error
          : 'Error fetching updated balances';
        throw new Error(balanceErrorMessage);
      }
  
      console.log('Fetched updated balances:', balanceResponse.data);
  
      // Update the user's balances in the local state
      const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      login(updatedUser); // You would need to have a login function that updates the user state globally
    } catch (error) {
      console.error("Error processing the deposit:", error);
      throw error;
    }
  };
  
  
  

  const currentDate = new Date();
  const transactionDate = currentDate.toLocaleString();
  // Adjust these values as needed
  const minimumWithdrawal = 10;
  const networkFeeMin = 0.00000;
  const networkFeeMax = 0.00000;
  const dailyLimit = 5000;

  const fetchPendingWithdrawal = async () => {
    try {
      const response = await api.get('/api/pending-withdrawal', {
        headers: { Authorization: `Bearer ${user.token}` }, // Pass the user token
        params: { userId: user?.primaryInfo?._id }, // Pass the userId in the params
      });

      if (response.status === 200) {
        setPendingWithdrawal(response.data.withdrawal);
      }
    } catch (error) {
      console.error("Error fetching pending withdrawal:", error);
    }
  };

  useEffect(() => {
    fetchPendingWithdrawal();
  }, []);

  const handleTransferTypeChange = (type) => {
    setTransferType(type);
  };
  const handleWithdrawConvert = (type) => {
    setWithdrawError("");
    setWithdrawConvert(type);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Allow only digits
    setPhoneNumber(value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Allow only digits
    setAmountdeposit(value);
  };

  const handleWitAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ''); // Allow only digits
    setamountwithdrawal(value);
  };

  const handleCurrencyChange = (e) => {
    setError("");
    setCurrency(e.target.value);

  };


  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setWithdrawError('');
    setSuccessMessage('');

    if (!selectedCurrency) {

      setWithdrawError("Please select a currency.");
      return;
    }

    try {

      const response = await api.post('/api/withdrawal', {
        amount: parseFloat(amountwithdrawal),
        currency: selectedCurrency,
        userId: user.primaryInfo?._id,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }, // Pass the user token
      });

      if (response.status === 201) {
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id, // Pass the userId as a custom header
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          console.log(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
        }
        setSuccessMessage('Withdrawal created successfully');
      } else {
        setWithdrawError('An error occurred while processing your withdrawal.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setWithdrawError(error.response.data.message);
      } else {
        setWithdrawError('An error occurred while processing your withdrawal.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setWithdrawError('');
    setSuccessMessage('');

    // Check if fromCurrency and toCurrency are the same
    if (fromCurrency === toCurrency) {
      setWithdrawError("From currency and to currency cannot be the same.");
      setIsLoading(false);
      return;
    }

    // Check if the amount is less than the minimum conversion amount
    if (parseFloat(amount) < 10) {
      setWithdrawError("Minimum conversion amount is 10.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.post('/api/conversion', {
        fromCurrency,
        toCurrency,
        amount,
        userId: user.primaryInfo?._id,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.status === 201) {
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id,
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          console.log(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
        }
        setSuccessMessage('Conversion completed successfully');
      } else {
        setWithdrawError('An error occurred while processing your conversion.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setWithdrawError(error.response.data.message);
      } else {
        setWithdrawError('An error occurred while processing your conversion.');
      }
    } finally {
      setIsLoading(false);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber === '') {
      setError('Phone number is required.');
      setSuccessMessage(null);
      return;
    }
    if (amountdeposit < 100) {
      setError('Minimum amount is KES 100.');
      setSuccessMessage(null);
      return;
    }
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);


    try {
      setIsLoading(true);
      const response = await api.post('/api/deposit', {
        phoneNumber: formattedPhoneNumber,
        amount: amountdeposit,
        currency: currency,
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
              setIsLoading(false);
              setIsPolling(false); // set isPolling to false here
              setShowConfetti2(true);
              setIsLoading(false);
              setIsPolling(false);
              setShowSuccessCheckmark(true);
              setSuccessMessage(null);

              setTimeout(() => {
                setShowConfetti2(false);
                setShowSuccessCheckmark(false);
              }, 10000);
            } else if (deposit.error && !deposit.isSuccess) {
              clearInterval(pollDepositStatus);
              setIsLoading(false);
              setIsPolling(false); // set isPolling to false here
              setError(deposit.error);
              setSuccessMessage(null);
            }

            retries++;
            if (retries >= maxRetries) {
              clearInterval(pollDepositStatus);
              setIsLoading(false);
              setIsPolling(false); // set isPolling to false here
              setError('Transaction timeout. Please try again.');
              setSuccessMessage(null);
            }
          } catch (error) {
            console.error('Error polling deposit status:', error);
            clearInterval(pollDepositStatus);
            setIsLoading(false);
            setIsPolling(false); // set isPolling to false here
            setError('Error checking deposit status. Please try again.');
            setSuccessMessage(null);
          }
        }, pollInterval);
      }
    } catch (error) {
      setIsLoading(false);
      setSuccessMessage(null);
      setError('An error occurred while processing the transaction.');
      console.error('Error:', error);
    }
  };


  const getAccountByCurrency = (currency) => {
    return accounts?.find((account) => account.currency === currency);
  };

  // Hardcoded conversion rates
  const conversionRates = {
    USD: 1,
    EUR: 1.09019,
    GBP: 1.24180,
    CAD: 1.351745,
    AUD: 1.30172, // Australian Dollar
    KES: 1 / 131.08,
    ZAR: 1 / 14.87, // South Africa
    UGX: 1 / 3725, // Uganda
    ZMW: 1 / 19.98, // Zambia
    NGN: 1 / 413.34, // Nigeria
    RWF: 1 / 1010, // Rwanda
  };



  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const selectedAccount = getAccountByCurrency(selectedCurrency);

  const handleCurrencySelection = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleCurrencySelect = (cur) => {
    setSelectedCurrency(cur);
    setError(null);
  };


  const convertToUSD = (currency, amount) => {
    return amount * (conversionRates[currency] || 1);
  };

  const getUniqueCurrencies = (accounts) => {
    const currenciesSet = new Set(accounts.map((account) => account.currency));
    return Array.from(currenciesSet);
  };


  // Retrieve accounts from localStorage
  const storedAccounts = JSON.parse(localStorage.getItem('user')).accounts;
  const currencies = getUniqueCurrencies(storedAccounts); // Fetch unique currencies from user's accounts


  const fetchReceiverInfo = async (payID) => {
    try {
      const response = await api.post(`/api/check/${payID}`);

      if (response.status !== 200) {
        const message = response.data?.message;
        throw new Error(`Error fetching receiver info: ${message || response.status}`);
      }

      const receiverInfo = response.data;

      setReceiverInfo(receiverInfo);
      setTransferError("");
      return receiverInfo;

    } catch (error) {
      if (error.name === 'AbortError') {
        // Handle fetch AbortError, in case you decide to abort the request later
        console.error('Fetch request was aborted:', error);
      } else if (navigator.onLine === false) {
        // Check if the user is offline
        console.error('Network error:', error);
        setTransferError('Network error: Please check your internet connection and try again.');
      } else {
        // Handle other errors
        console.error('Error fetching receiver info:', error);
        setTransferError(`Error fetching receiver info: ${error.message}`);
      }
    }
  };

  const handleMax = () => {
    // Logic for handling max amount
  };



  const handleNumericInput = (e, setValue) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setValue(value);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!payID || !amount || !fromCurrency) {
      setTransferError("Please complete all fields.");
      return;
    }

    if (step === 1) {
      setIsLoading(true); // Set the loading state
      const receiverInfo = await fetchReceiverInfo(payID);
      if (receiverInfo) {
        setStep(2); // Proceed to step 2
      } else {
        setTransferError("Receiver info not found.");
      }
      setIsLoading(false); // Reset the loading state
    } else if (step === 2) {
      if (transferType === 1) {
        await handleTransferSubmit(e);
      } else if (transferType === 2) {
        await handleRequestSubmit(e);
      }
    }
  };


  async function handleTransferSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/api/transfer", {
        userId: user.primaryInfo?._id,
        fromCurrency,
        payID,
        amount,
      });
      if (response.status === 200) {
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id, // Pass the userId as a custom header
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          console.log(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
        }
        setIsLoading(false);
        setIsTransactionSuccess(true);
        setTransferError("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setTransferError(error.response.data.message);
        setIsLoading(false);
      } else {
        setTransferError("Error during transfer.");
        setIsLoading(false);
      }
    }
  }

  async function handleRequestSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/request", {
        userId: user.primaryInfo?._id,
        PayID: payID,
        amount,
      });
      if (response.status === 200) {
        setIsTransactionSuccess(true);
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id, // Pass the userId as a custom header
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          console.log(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
        }
        setIsLoading(false);
        setTransferError("");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setTransferError(error.response.data.message);
        setIsLoading(false);
      } else {
        setTransferError("Error sending request.");
        setIsLoading(false);
      }
    }
  }

  return (
    <div>
      <div className="body-header border-bottom d-flex py-3">
        <div className="container-xxl">

        </div>
      </div>
      {/* Body: Body */}
      <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row g-3 mb-3 row-deck">
            <div className="col-xl-12 col-xxl-7 d-none d-sm-block">
              <div className="card">
                <ToastContainer />

                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                  <h6 className="fw-bold m-2">Balance Details</h6>
                  <ul className="nav nav-tabs tab-body-header rounded d-inline-flex" role="tablist">
                    {currencies.map((currency) => (
                      <li className="nav-item" key={currency}>
                        <a className={`nav-link${selectedCurrency === currency ? " active" : ""}`} data-bs-toggle="tab" href={`#${currency}`} role="tab" onClick={() => handleCurrencySelection(currency)}>
                          {currency}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    {currencies.map((currency) => {
                      const account = getAccountByCurrency(currency);
                      return (
                        <div key={currency} className={`tab-pane fade${selectedCurrency === currency ? " show active" : ""}`} id={currency}>
                          <div className="row g-3">
                            <div className="col-lg-6">
                              <div>Account balance:</div>
                              <h4>
                                {account?.balance.toFixed(2)} {currency}≈${convertToUSD(currency, account?.balance).toFixed(2)}
                              </h4>
                              <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Received this month:</div>
                              <h5>
                                {account?.balance.toFixed(2)} {currency}
                              </h5>
                              <div className="mt-3 text-uppercase text-muted small">Transfered this month:</div>
                              <h5>
                                {account?.balance.toFixed(2)} {currency}
                              </h5>
                              <div className="mt-3 text-uppercase text-muted small">Estimated Value:</div>
                              <h5>${convertToUSD(currency, account?.balance).toFixed(2)}</h5>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12 col-xxl-5">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                  <h6 className=" fw-bold">  {withdrawConvert === 1 ? "Withdraw" : "Convert"}</h6>
                  <ul className="nav nav-tabs tab-body-header rounded d-inline-flex" role="tablist">
                    <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#Withdraw" role="tab" onClick={() => handleWithdrawConvert(1)}>Withdraw</a></li>
                    <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#convert" role="tab" onClick={() => handleWithdrawConvert(2)}>Convert</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  {withdrawerror && <div className="alert alert-danger">{withdrawerror}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  {pendingWithdrawal && (
                    <div className="alert alert-success">
                      Your withdrawal request ({pendingWithdrawal.transactionId}) of {pendingWithdrawal.amount} {pendingWithdrawal.currency} will be completed soon.
                    </div>


                  )}
                  {withdrawConvert === 1 ? (
                    <form onSubmit={handleWithdrawSubmit}>
                      <div className="row g-3 mb-3">
                        <div className="col-sm-12">
                          <label className="form-label">Enter amount & currency</label>
                          <div className="input-group">
                            <input type="tel" placeholder="Amount"
                              value={amountwithdrawal}
                              onChange={handleWitAmountChange}
                              className="form-control" min="100" required />
                            <button
                              className="btn btn-outline-secondary dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {selectedCurrency}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              {currencies.map((cur) => (
                                <li
                                  key={cur}
                                  className="dropdown-item"
                                  onClick={() => handleCurrencySelect(cur)}
                                >
                                  {cur}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                        <div className="col-sm-12">
                          <label className="form-label">Bank/Phone</label>
                          {user && user.userInfo && (
                            <select className="form-control">
                              <option value={user.userInfo.phoneNumber}>{user.userInfo.phoneNumber}</option>
                            </select>
                          )}
                        </div>

                        <div className="col-sm-12">
                          <label className="form-label">Select Withdraw Network</label>
                          <select className="form-select" aria-label="Default select example">
                            <option selected> INT (Arrival time ≈ 2 mins)</option>

                          </select>
                        </div>
                        <div className="col-sm-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <div>
                              <div className="truncated">Balance</div>
                              <div className="text-muted truncated">  {selectedAccount?.balance?.toFixed(2)} {selectedCurrency}</div>
                            </div>
                            <div>
                              <div className="truncated">Minimum withdrawal</div>
                              <div className="text-muted  truncated">10.00 USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="d-flex justify-content-between flex-wrap">
                            <div>
                              <div className="truncated">Network fee</div>
                              <div className="text-muted truncated"> {networkFeeMin.toFixed(2)} ~ {networkFeeMax.toFixed(2)} {selectedCurrency}</div>
                            </div>
                            <div>
                              <div className="truncated">24h remaining limit</div>
                              <div className="text-muted  truncated"> 5000.00 USD</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                            style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                            disabled={isLoading}
                          >
                            {isLoading ? 'Processing...' : 'Withdraw'}
                          </button>

                        </div>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleConvertSubmit}>
                      <div className="row g-3 mb-3">
                        <div className="col-sm-12">
                          <label className="form-label">From</label>
                          <select
                            className="form-select"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                          >
                            {currencies.map((cur) => (
                              <option key={cur} value={cur}>
                                {cur}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-sm-12">
                          <label className="form-label">To</label>
                          <select
                            className="form-select"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                          >
                            {currencies.map((cur) => (
                              <option key={cur} value={cur}>
                                {cur}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-sm-12">
                          <label className="form-label">Amount</label>
                          <input
                            type="tel"
                            placeholder="Amount"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                            style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                            disabled={isLoading}
                          >
                            {isLoading ? 'Processing...' : 'Convert'}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-3 mb-3 row-deck">
            <div className="col-xl-6 col-xxl-7">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                  <h6 className="mb-2 fw-bold">Deposit</h6>
                  <ul className="nav nav-tabs tab-body-header rounded d-inline-flex" role="tablist">
                    <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#cash" role="tab">local</a></li>
                    <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#crypto" role="tab">International</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane fade show " id="crypto">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Currency</label>
                          <div className="row row-cols-3 row-cols-md-3 row-cols-lg-6 row-cols-xl-6">
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaultbtc" defaultChecked />
                                <label className="form-check-label" htmlFor="flexRadioDefaultbtc">
                                  USD
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaulteth" />
                                <label className="form-check-label" htmlFor="flexRadioDefaulteth">
                                  GBP
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaultusdt" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultusdt">
                                  EUR
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaultbnb" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultbnb">
                                  AUD
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaulteos" />
                                <label className="form-check-label" htmlFor="flexRadioDefaulteos">
                                  JPY
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefaultsol" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultsol">
                                  CAD
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Choose Network</label>
                          <div className="row row-cols-3 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaulterc" defaultChecked />
                                <label className="form-check-label" htmlFor="flexRadioDefaulterc">
                                  Creditcard
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaultcry" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultcry">
                                  Paypal
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaultsep" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultsep">
                                  Stripe
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaultsolana" />
                                <label className="form-check-label" htmlFor="flexRadioDefaultsolana">
                                  Worldpay
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaulttron" />
                                <label className="form-check-label" htmlFor="flexRadioDefaulttron">
                                  Amazon Pay
                                </label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefaultnetwork" id="flexRadioDefaulterr" />
                                <label className="form-check-label" htmlFor="flexRadioDefaulterr">
                                  Payoneer
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label d-block">Select Network <span className="text-primary">USD</span></label>
                          <div className="d-flex flex-wrap align-items-center">
                            <img src="assets/images/qr-code.png" alt="Download App" className="img-fluid" />
                            <div className="d-flex flex-wrap px-lg-2">
                              <div>
                                <div className="truncated">Minimum Deposit</div>
                                <div className="text-muted truncated mb-1"> 1.00 USD </div>
                                <div className="truncated">Expected Arrival</div>
                                <div className="text-muted truncated mb-1"> 1 network confirm</div>
                                <div className="truncated">Expected Unlock</div>
                                <div className="text-muted truncated"> 1 network confirm</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button type="submit"
                            className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                            style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                            disabled={isLoading}
                          >Confirm</button>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade show active" id="cash">
  {error && <div className="alert alert-danger mt-3">{error}</div>}
  {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
  {showSuccessCheckmark ? (
    <div className="text-center my-5">
      {showConfetti2 && <Confetti />}
      <BsCheckCircle size="7em" color="green" />
      <p>Deposit to {currency || "USD"} completed successfully.</p>
    </div>
  ) : (
    <>
      <p>
        Deposit Amount from your bank account or Mobile Money and receive funds in <span className="text-primary">{currency}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Mode</label>
          <select className="form-select">
            <option selected>Mpesa</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Currency to Deposit</label>
          <select className="form-select" value={currency} onChange={handleCurrencyChange}>
            {currencies.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <div className="input-group">
            <input
              type="tel"
              placeholder="e.g 254792340510"
              className="form-control"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <div className="input-group">
            <input
              type="tel"
              placeholder='e.g 1000'
              className="form-control"
              value={amountdeposit}
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn flex-fill py-2 fs-5 text-uppercase px-5"
            style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Processing  <i className="fas fa-spinner fa-spin"></i>
              </>
            ) : (
              'Deposit'
            )}
          </button>
        </div>
        <p onClick={toggleUpdateBalanceModal} style={{cursor: "pointer"}} className="text-primary">
  Balance not updated<svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="16" 
    viewBox="0 0 24 24" 
    width="16"
    style={{marginLeft: "3px", marginBottom: "3px"}}
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path fill="currentColor" d="M11 17h2v-2h-2v2zm1-16C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
  </svg>
</p>



      <UpdateBalanceModal
        isVisible={isUpdateBalanceModalVisible}
        onClose={toggleUpdateBalanceModal}
        onUpdateBalance={onUpdateBalance}
      />
      </form>
    </>
  )}
</div>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-xxl-5">
              <div className="card">
                <div className="card-header  d-flex justify-content-between bg-transparent align-items-center">
                  <h6 className="mb-0 fw-bold">
                    {transferType === 1 ? "Transfer" : "Request"}
                  </h6>
                  <div>
    <button
        className={`btn ${transferType === 1 ? "btn-primary" : "btn-light"}`}
        style={{ marginRight: "10px", backgroundColor: transferType === 1 ? "#0070ba" : "inherit"}}
        onClick={() => handleTransferTypeChange(1)}
    >
        Transfer
    </button>
    <button
        className={`btn ${transferType === 2 ? "btn-primary" : "btn-light"}`}
        style={{ marginRight: "10px", backgroundColor: transferType === 2 ? "#0070ba" : "inherit"}}
        onClick={() => handleTransferTypeChange(2)}
    >
        Request
    </button>
</div>

                </div>
                <div className="card-body d-flex flex-column ">

                  {transferError && <div className="alert alert-danger">{transferError}</div>}
                  {isTransactionSuccess ? (
                    <div className="transaction-success" style={{ backgroundColor: "#f5f5f5", fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif", fontSize: "16px", border: "1px solid #e5e5e5", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)", padding: "20px", margin: "20px auto", maxWidth: "500px" }}>
                      <div className="text-center">
                        <div className="mt-5 py-2 d-flex flex-column align-items-center justify-content-center">
                          <AnimatedCheckmark />
                          <h2 className="fw-bold mt-2 text-success" style={{ fontSize: "24px" }}>
                            {transferType === 1 ? "Payment" : "Request"} Successful</h2>
                        </div>
                      </div>
                      <div className="transaction-details mx-auto d-flex flex-column align-items-start" style={{ flexWrap: 'nowrap' }}>
                        <h3 className="text-muted fw-bold text-center" style={{ fontSize: "18px", marginTop: "20px", marginBottom: "10px" }}>Transaction Details</h3>
                        <div className="detail-row text-start" style={{ marginBottom: "10px" }}>
                          <span className="text-muted fw-bold" style={{ marginRight: "10px" }}>Sender:</span>
                          <span>{user?.userInfo?.firstName}</span>
                        </div>
                        <div className="detail-row text-start" style={{ marginBottom: "10px" }}>
                          <span className="text-muted fw-bold" style={{ marginRight: "10px" }}>Receiver:</span>
                          <span>{receiverInfo?.firstName}</span>
                        </div>
                        <div className="detail-row text-start" style={{ marginBottom: "10px" }}>
                          <span className="text-muted fw-bold" style={{ marginRight: "10px" }}>Amount:</span>
                          <span>{fromCurrency} {amount}</span>
                        </div>
                        <div className="detail-row text-start" style={{ marginBottom: "10px" }}>
                          <span className="text-muted fw-bold" style={{ marginRight: "10px" }}>Transaction ID:</span>
                          <span>{user?.userInfo?._id}</span>
                        </div>
                        <div className="detail-row text-start" style={{ marginBottom: "10px" }}>
                          <span className="text-muted fw-bold" style={{ marginRight: "10px" }}>Date:</span>
                          <span>{transactionDate}</span>
                        </div>
                      </div>
                    </div>




                  ) : (
                    <>

                      {step === 2 && (
                        <div className="text-center mb-3 col-sm-12">
                          <div className="d-flex justify-content-center">
                            {generateAvatar(receiverInfo?.firstName)}
                          </div>
                          <p>You're about to {transferType === 1 ? "send" : "request"}:</p>
                          <h3>
                            {amount} {fromCurrency}
                          </h3>
                          <p>{transferType === 1 ? "to" : "from"}:</p>
                          <p>{receiverInfo?.firstName}</p>
                        </div>
                      )}
                      {step === 1 && (
                        <>
                          {transferType === 1 && (
                            <form>
                              <div className="row g-3 mb-3">
                                <div className="col-sm-12">
                                  <label className="form-label">From</label>
                                  <select
                                    className="form-select"
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                  >
                                    {currencies.map((currency) => (
                                      <option key={currency} value={currency}>
                                        {currency}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="col-sm-12">
                                  <label className="form-label">To</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      pattern="[0-9]*"
                                      maxLength="6" // Set maximum length to 6 digits
                                      className="form-control"
                                      value={payID}
                                      onChange={(e) => setPayID(e.target.value)}
                                      placeholder="Pay ID e.g., 786341"
                                    />

                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <label className="form-label">Amount</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      pattern="[0-9]*"
                                      maxLength="5" // Set maximum length to 5 digits
                                      className="form-control"
                                      value={amount}
                                      onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                    >
                                      Max
                                    </button>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <button
                                    onClick={handleConfirm}
                                    className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                                    style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Processing..." : "Transfer"}
                                  </button>
                                </div>
                              </div>
                            </form>


                          )}
                          {transferType === 2 && (
                            <div className=" col-sm-12 col-lg-12" style={{ width: "100%" }}>
                              <form>

                                <div className="col-sm-12">
                                  <label className="form-label">From</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      pattern="[0-9]*"
                                      maxLength="6" // Set maximum length to 6 digits
                                      className="form-control"
                                      value={payID}
                                      onChange={(e) => setPayID(e.target.value)}
                                      placeholder="Pay ID e.g., 786341"
                                    />

                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <label className="form-label">Amount</label>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      pattern="[0-9]*"
                                      maxLength="5"
                                      className="form-control"
                                      value={amount}
                                      onChange={(e) => setAmount(e.target.value)}
                                    />

                                  </div>
                                </div>
                                <div className="col-sm-12 mt-3">
                                  <button
                                    onClick={handleConfirm}
                                    className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                                    style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Processing..." : "Request"}
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}
                        </>
                      )}
                      {transferType === 1 && (
                        <div className="table-responsive mt-1 col-sm-12 col-lg-12" style={{ width: "100%" }}>
                          <table className="table border">
                            <tbody>
                              <tr>
                                <td>Total Transfer</td>
                                <td>
                                  {isNaN(parseFloat(amount)) ? '0' : parseFloat(amount).toFixed(2)} {fromCurrency}
                                </td>

                              </tr>
                              <tr>
                                <td>Available</td>
                                <td>
                                  {getAccountByCurrency(fromCurrency)?.balance?.toFixed(2)}{" "}
                                  {fromCurrency}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      {step === 2 && (
                        <div className="d-flex justify-content-center">
                          <button
                            onClick={handleConfirm}
                            className="btn flex-fill py-2 fs-5 text-uppercase px-5"
                            style={{ backgroundColor: "#EAF3FD", color: "#0070BA" }}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span>Processing...</span>
                            ) : (
                              <span>{transferType === 1 ? "Send" : "Request"} Now</span>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




  );
}

export default Wallet;
