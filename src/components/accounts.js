import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useUser } from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../utils/showToast";
import Confetti from 'react-dom-confetti';
import CheckmarkAnimation from './CheckmarkAnimation';
import api from '../api';


const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith('254')) {
    return phoneNumber;
  } else if (phoneNumber.startsWith('0')) {
    return `254${phoneNumber.slice(1)}`;
  } else if (phoneNumber.startsWith('7') || phoneNumber.startsWith('1')) {
    return `254${phoneNumber}`;
  }
};

function Accounts() {
  const { user, login } = useUser();
  const [balances, setBalances] = useState({});
  const [currency, setCurrency] = useState(null);
  const isBalanceLow = currency && balances[currency] !== undefined && balances[currency] < 5;
  const [time, setTime] = useState(new Date());
  const [processing, setProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showConfetti2, setShowConfetti2] = useState(false);



  useEffect(() => {
    if (user) {
      const newBalances = user.accounts.reduce((acc, account) => {
        acc[account.currency] = account.balance;
        return acc;
      }, {});
      setBalances(newBalances);
    }
  }, [user]);

  

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9]*$/;

    if (regex.test(value) || e.nativeEvent.inputType === 'deleteContentBackward') {
      setPhoneNumber(value);
    }
  };


  const handleActivation = async (e) => {
    e.preventDefault();
    setProcessing(true);
  
    try {
      const response = await api.post('/api/activate', {
        userId: user?.primaryInfo?._id, 
        currency: currency,
      });
  
      if (response.status === 200) { // Check for a 200 status code
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
        setShowConfetti(true);
      } else {
        setError("An error occurred during account activation. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "An error occurred during account activation. Please try again.");
        console.error("An error occurred during account activation. Please try again: ", error);
      }
    } finally {
      setProcessing(false);
    }
  };
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber === '') {
      setError('Phone number is required.');
      return;
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const amount = 630;

    try {
      setIsLoading(true);
      const response = await api.post('/api/deposit', {
        phoneNumber: formattedPhoneNumber,
        amount,
      });

      if (response.data && response.status === 200) {
        setSuccessMessage('STK sent, enter the PIN to complete the transaction.');
        setError(null);
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
              setSuccessMessage('Transaction completed successfully.');
            } else if (deposit.error && !deposit.isSuccess) {
              clearInterval(pollDepositStatus);
              setIsLoading(false);
              setIsPolling(false); // set isPolling to false here
              setError(deposit.error);
            }

            retries++;
            if (retries >= maxRetries) {
              clearInterval(pollDepositStatus);
              setIsLoading(false);
              setIsPolling(false); // set isPolling to false here
              setError('Transaction timeout. Please try again.');
            }
          } catch (error) {
            console.error('Error polling deposit status:', error);
            clearInterval(pollDepositStatus);
            setIsLoading(false);
            setIsPolling(false); // set isPolling to false here
            setError('Error checking deposit status. Please try again.');
          }
        }, pollInterval);
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred while processing the transaction.');
      console.error('Error:', error);
    }
  };




  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  const handleActivate = (currency) => {
    setCurrency(currency);
  };

  const activationDetails = {
    USD: {
      Limit: '$5000',
      fee: '$5',
      bonus: '5% ',
      minDeposit: '$5',
      freeTransfers: '3 free transfers',
      story: 'The US Dollar account is designed for individuals and businesses who frequently transact in USD. With this account, you can easily receive and send payments, shop online, and manage your USD funds efficiently. Take advantage of competitive exchange rates, fast international transfers, and exceptional customer service to make your transactions smoother.',
      features: [
        'Instant and secure USD transfers',
        'Low fees on transactions',
        'User-friendly mobile app for easy account management',
        '24/7 customer support',
      ],
    },
    GBP: {
      Limit: '£4025 ',
      fee: '£5',
      bonus: '7% ',
      minDeposit: '£5',
      freeTransfers: '5 free transfers',
      story: 'Our British Pound account is perfect for those dealing with UK-based businesses or individuals. Experience seamless transfers, attractive exchange rates, and top-notch customer service. Whether youre sending money to friends or family, paying for products and services, or managing your GBP funds, this account is tailored to meet your needs.',
      features: [
        'Efficient and secure GBP transfers',
        'Competitive exchange rates',
        'Easy account management through our mobile app',
        'Dedicated customer support team',
      ],
    },
    AUD: {
      Limit: '$7494',
      fee: '$5',
      bonus: '6% ',
      minDeposit: '$5',
      freeTransfers: '4 free transfers',
      story: 'The Australian Dollar account is an excellent choice for those transacting with businesses or individuals in Australia. This account offers great benefits, such as quick transfers, competitive exchange rates, and a dedicated customer support team. Manage your AUD funds effortlessly, send and receive payments, and enjoy a seamless banking experience.',
      features: [
        'Fast and secure AUD transfers',
        'Attractive exchange rates',
        'Intuitive mobile app for managing your account',
        '24/7 customer support',
      ],
    },
    EUR: {
      Limit: '€4547',
      fee: '€5 ',
      bonus: '8% ',
      minDeposit: '€5',
      freeTransfers: '6 free transfers',
      story: 'Our Euro account is tailored for those who have financial dealings within the Eurozone. This account provides a convenient way to send and receive payments, manage your EUR funds, and access attractive exchange rates. Benefit from low transaction fees, a user-friendly mobile app, and a dedicated customer support team that available around the clock.',
      features: [
        'Instant and secure EUR transfers',
        'Competitive fees and exchange rates',
        'Easy-to-use mobile app for account management',
        'Round-the-clock customer support',
      ],
    },
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card no-bg">
       
          <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
            <h6 className="mb-0 fw-bold ">Currency List</h6>
          </div>
          <div className="card-body">

            <div className="table-responsive">
              <table id="myProjectTable" className="priceTable table table-hover custom-table table-bordered align-middle mb-0">
                <thead>
                  <tr>
                    <th>currency</th>
                    <th>Action</th>
                    <th className="d-none d-sm-block">Id</th>

                    <th>state</th>
                    <th className="d-none d-sm-block">channel</th>
                    <th>limit</th>
                  </tr>
                </thead>
                <tbody>
                  {['USD', 'GBP', 'AUD', 'EUR'].map((currency) => (
                    <tr key={currency}>
                      <td>
                        <span className="text-uppercase fw-bold"> {currency} </span>
                      </td>
                      <td>
                        <button
                          type="submit"
                          className="btn btn-light-success"
                          data-bs-toggle="modal"
                          data-bs-target="#icoModal"
                          onClick={() => handleActivate(currency)}
                        >
                          Activate
                        </button>
                      </td>
                      <td className="d-none d-sm-block">-</td>
                      <td>-</td>
                      <td className="d-none d-sm-block">-</td>
                      <td>$5,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal fade" id="icoModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Account activation</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body custom_setting">
              <ToastContainer />
                <div>
                  <img src="assets/images/coin/AE.png" alt="" className="img-fluid avatar mx-1" /><span className="text-uppercase fw-bold"> {currency} </span>
                  <span className="text-muted d-block small px-2 my-2">{time.toLocaleTimeString()}</span>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-8">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                              
                                <td><span className="text-muted"> Limit</span></td>
                                <td><strong>{activationDetails[currency]?.Limit}</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Cashback</span></td>
                                <td><strong>{activationDetails[currency]?.bonus}</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Min deposit</span></td>
                                <td><strong>{activationDetails[currency]?.minDeposit}</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Fundraising</span></td>
                                <td><strong>NA</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Activation fee</span></td>
                                <td><strong>{activationDetails[currency]?.fee}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="table-responsive">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td><span className="text-muted">Expiration</span></td>
                                <td><strong>NA</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Free Transfer</span></td>
                                <td><strong>5</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">% of Total Supply</span></td>
                                <td><strong>NA</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Accept</span></td>
                                <td><strong>All</strong></td>
                              </tr>
                              <tr>
                                <td><span className="text-muted">Access</span></td>
                                <td><strong>All</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {currency && (
                      <>
                        <h5>Activate {currency} Account</h5>



                        <p>
                          {activationDetails[currency].story}
                        </p>
                        <ul>
                          {activationDetails[currency].features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  <div className="col-lg-12 col-xl-4">
                  <div className="card mb-3">
      <div className="card-body">
      {!showConfetti && (
    <>
        {isBalanceLow && (
          <div className="alert alert-warning">
            Your balance is low. Please credit your account before proceeding.
          </div>
        )}
       
        <div className="checkout-sidebar">
          <div className="checkout-sidebar-price-table mt-30">
            <h5 className="title fw-bold"> {currency} Pricing</h5>
            <div className="sub-total-price">
              <div className="total-price">
                <p className="value">Activation Price:</p>
                <p className="price">{activationDetails[currency]?.fee}</p>
              </div>
              <div className="total-price shipping">
                <p className="value">Conversion:</p>
                <p className="price">KES 630</p>
              </div>
              <div className="total-price discount">
                <p className="value">Acc Balance</p>
                <p className="price">{balances[currency]?.toFixed(2)}</p>
              </div>
            </div>
            <div className="total-payable">
              <div className="payable-price">
                <p className="value fw-bold">Total Payable:</p>
                <p className="price fw-bold">
                  {activationDetails[currency]?.fee}≈KES 630
                </p>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5"
                onClick={handleActivation}
                disabled={processing}
              >
                {processing ? (
                  <>Processing... <i className="fas fa-spinner fa-spin"></i></>
                ) : (
                  <>Activate {currency}</>
                )}
              </button>
            </div>
          </div>
        </div>
        </>
  )}
     {showConfetti && ( // show the Confetti component when showConfetti is true
                              <div className="d-flex justify-content-center flex-column align-items-center text-center">
                                <CheckmarkAnimation />
                                <Confetti />
                                <h1 className="mt-4 text-center">Success!</h1>
                                <p>Your Activation was successful.</p>
                              </div>
                            )}
</div>
</div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <Tabs defaultActiveKey="mpesa" id="payment-options" className="nav-pills m-1">
                          <Tab eventKey="mpesa" title="M-pesa">
                          {showConfetti2 ? (
          <div className="d-flex justify-content-center flex-column align-items-center text-center">
            <CheckmarkAnimation />
            <Confetti />
            <h1 className="mt-4 text-center">Success!</h1>
            <p>Your deposit was successful.</p>
          </div>
        ) : (
          <form className="mt-3" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {isPolling && (
              <div>
                <div className="alert alert-info mt-3">
                  Hang on tight, your transaction is being processed<span className="dots"></span>
                </div>
              </div>
            )}
            <div className="row g-3 align-items-center">
              <div className="col-md-12">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Amount</label>
                <input type="text" className="form-control" value="630" readOnly />
                <span>$1≈KES 126.01</span>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 text-uppercase"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <i className="fa fa-spinner fa-spin" /> Processing...
                </span>
              ) : (
                'Pay Now'
              )}
            </button>
          </form>
        )}
      </Tab>


                          <Tab eventKey="card" title="Debit/Credit Card">
                            <form className="mt-3">
                              <div className="row g-3 align-items-center">
                                <div className="col-md-12">
                                  <label className="form-label">Enter Card Number</label>
                                  <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Valid Date</label>
                                  <input type="date" className="form-control w-100" required />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">CVV</label>
                                  <input type="text" className="form-control" required />
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary mt-4 text-uppercase">
                                Pay Now
                              </button>
                            </form>
                          </Tab>
                          <Tab eventKey="netBanking" title="Net Banking">
                            <form className="mt-3">
                              <div className="row g-3 align-items-center">
                                <div className="col-md-12">
                                  <label className="form-label">Enter Your Name</label>
                                  <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-12">
                                  <label className="form-label">Account Number</label>
                                  <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6">
                                  <label className="form-label">Bank Name</label>
                                  <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6">
                                  <label htmlFor="admittime1" className="form-label">IFC Code</label>
                                  <input type="text" className="form-control" id="admittime1" required />
                                </div>
                              </div>
                              <button type="submit" className="btn btn-primary mt-4 text-uppercase">
                                Pay Now
                              </button>
                            </form>
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Accounts;
