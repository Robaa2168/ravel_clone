import React, { useState } from 'react';
import { useUser } from "./context";
import api from '../api';
import AnimatedCheckmark from "./AnimatedCheckmark";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';


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

const Wallet = () => {
  const { user } = useUser();
  const accounts = user.accounts;
  const [transferType, setTransferType] = useState(1); // 1 for Transfer, 2 for Request
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('');
  const [step, setStep] = useState(1);
  const [payID, setPayID] = useState("");
  const [amount, setAmount] = useState("90");
  const [receiverInfo, setReceiverInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);



  // Adjust these values as needed
  const minimumWithdrawal = 10;
  const networkFeeMin = 0.00000;
  const networkFeeMax = 0.00000;
  const dailyLimit = 5000;

  const handleTransferTypeChange = (type) => {
    setTransferType(type);
  };


  const getAccountByCurrency = (currency) => {
    return accounts.find((account) => account.currency === currency);
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
    // Replace this code with an API call to get the actual receiver data using Pay ID
    const dummyReceiverInfo = {
      id: payID,
      firstName: "John",
    };

    setReceiverInfo(dummyReceiverInfo);
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
      toast.error("Please complete all fields.");
      return;
    }

    if (step === 1) {
      setIsLoading(true); // Set the loading state
      await fetchReceiverInfo(payID)
        .then(() => {
          setStep(2); // Proceed to step 2
        })
        .catch((error) => {
          toast.error("Error fetching receiver info.");
        });
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

    try {
      const response = await api.post("/api/transfer", {
        userId: user.primaryInfo?._id,
        fromCurrency,
        payID,
        amount,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsTransactionSuccess(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error during transfer.");
      }
    }
  }

  async function handleRequestSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/api/request", {
        userId: user.primaryInfo?._id,
        PayID: payID,
        amount,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsTransactionSuccess(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error sending request.");
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
            <div className="col-xl-12 col-xxl-7">
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
                <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center">
                  <h6 className="mb-0 fw-bold">Withdraw Money</h6>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row g-3 mb-3">
                      <div className="col-sm-12">
                        <label className="form-label">Enter amount & currency</label>
                        <div className="input-group">
                          <input type="text" placeholder='Amount' className="form-control" />
                          <button
                            className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {selectedCurrency}
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            {['USD', 'GBP', 'AUD', 'CAD', 'EUR', 'KES'].map((currency) => (
                              <li key={currency}>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleCurrencySelection(currency)}
                                >
                                  {currency}
                                </button>
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
                            <div className="text-muted  truncated">{minimumWithdrawal.toFixed(2)} {selectedCurrency}{' '}</div>
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
                            <div className="text-muted  truncated"> {dailyLimit.toFixed(2)} {selectedCurrency}{' '}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
                    <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#crypto" role="tab">International</a></li>
                    <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#cash" role="tab">Local</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="crypto">
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
                          <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5">Confirm</button>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade" id="cash">
                      <p>Deposit Amount from your bank account or Mobile Money and receive funds in <span className="text-primary">USD</span></p>
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Select Mode</label>
                          <select className="form-select">
                            <option selected>Mpesa</option>

                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Currency to Deposit</label>
                          <select className="form-select">
                            <option selected>USD</option>
                            <option value={1}>AUD</option>
                            <option value={2}>GBP</option>
                            <option value={3}>CAD</option>
                            <option value={4}>EUR</option>
                            <option value={5}>JPY</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Amount</label>
                          <div className="input-group">
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="mb-3">
                          <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5">Deposit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-xxl-5">
              <div className="card">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  {isTransactionSuccess ? (
                    <div>
                      <AnimatedCheckmark />
                      <h2 className="success-muted">Transaction Successful</h2>
                    </div>
                  ) : (
                    <>
                      <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center">
                        <h6 className="mb-0 fw-bold">
                          {transferType === 1 ? "Transfer" : "Request"}
                        </h6>
                        <div>
                          <button
                            className={`btn btn-light ${transferType === 1 ? "active" : ""}`}
                            onClick={() => handleTransferTypeChange(1)}
                          >
                            Transfer
                          </button>
                          <button
                            className={`btn btn-light ${transferType === 2 ? "active" : ""}`}
                            onClick={() => handleTransferTypeChange(2)}
                          >
                            Request
                          </button>
                        </div>
                      </div>
                      {step === 2 && (
                        <div className="text-center mb-3">
                          <div className="d-flex justify-content-center">
                            {generateAvatar(receiverInfo.firstName)}
                          </div>
                          <p>You're about to {transferType === 1 ? "send" : "request"}:</p>
                          <h3>
                            {amount} {fromCurrency}
                          </h3>
                          <p>{transferType === 1 ? "to" : "from"}:</p>
                          <p>{receiverInfo.firstName}</p>
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
                                      className="form-control"
                                      value={amount}
                                      onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <button
                                      className="btn btn-outline-secondary"
                                      type="button"
                                      onClick={handleMax}
                                    >
                                      Max
                                    </button>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <button
                                    onClick={handleConfirm}
                                    className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5"
                                    disabled={isLoading}
                                  >
                                    {isLoading ? "Processing..." : "Confirm"}
                                  </button>
                                </div>
                              </div>
                            </form>
                          )}
                          {transferType === 2 && (
                            <form>
                              <div className="col-sm-12">
                                <label className="form-label">From</label>
                                <div className="input-group">
                                  <input
                                    type="text"
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
                                    className="form-control"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12 mt-3">
                                <button
                                  onClick={handleConfirm}
                                  className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5"
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Processing..." : "Confirm"}
                                </button>
                              </div>
                            </form>
                          )}
                        </>
                      )}
                      {transferType === 1 && (
                        <div className="table-responsive mt-1">
                          <table className="table border">
                            <tbody>
                              <tr>
                                <td>Total Transfer</td>
                                <td>
                                  {parseFloat(amount).toFixed(2)} {fromCurrency}
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
                            className="btn btn-primary text-uppercase"
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
