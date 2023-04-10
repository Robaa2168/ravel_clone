import React, { useEffect, useState } from "react";
import { useUser } from "./context";
import { Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import '../App.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    console.log("User state changed", user);
  }, [user]);

  // Your existing useEffect for the login redirect
  useEffect(() => {
    console.log("Inside useEffect");
    console.log(user);
    if (!user && !localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    console.log("User state changed", user);
    console.log("Email:", user?.email);
    console.log("PayID:", user?.payID);
    console.log("Phone number:", user?.phoneNumber);
  }, [user]);




  return (
    <div className="body d-flex py-3">
    <div className="container-xxl">
      <div className="row g-3 mb-3">
        <div className="col-lg-12">
          <div className="card">
         
            <div className="card-body">
              
              <div className="row g-3 align-items-center">
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="d-flex">
                    <img className="avatar rounded-circle" src="assets/images/profile_av.svg" alt="profile" />
                    <div className="flex-fill ms-3">
                      <p className="mb-0"><span className="font-weight-bold">{user?.userInfo?.firstName} {user?.userInfo?.lastName}
</span></p>
                      <small className>{user?.userInfo?.email}</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-3">
                  <div className="d-flex flex-column">
                    <span className="text-muted mb-1">Pay ID:{user?.primaryInfo?.payID}</span>
                    <span className="small text-muted flex-fill text-truncate">
  Last login time: {new Date(user?.primaryInfo?.lastLogin).toLocaleString()}
</span>

                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-2">
                  <div className="d-flex-inline">
                 </div>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-4">
                  <a title="invite" className="btn btn-primary text-dark mb-1">25% commission:Invite friends now!</a>
                  <a title="invite" className="d-block"><i class="fas fa-share-alt  m-2"></i>{user?.primaryInfo?.referralId}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* Row End */}
      <div className="row g-3 mb-3 row-cols-1 row-cols-md-2 row-cols-lg-4">
  {user?.accounts?.map(account => (
    <div className="col" key={account.currency}>
      <div className="card">
        <div className="card-body d-flex align-items-center">
          <div className="flex-fill text-truncate">
            <span className="text-muted small text-uppercase">{account.currency}</span>
            <div className="d-flex flex-column">
              <div className="price-block">
                <span className="fs-6 fw-bold color-price-up">0.00</span>
                <span className="small text-muted px-2">$0</span>
              </div>
              <div className="price-report">
                <span className="small text-success">0.00%</span>
                <span className="small text-muted px-2">Volume: 0.00</span>
                {account.isActive ? (
                  <span className="text-success">
                    <i className="bi bi-check-circle-fill me-2"></i>
                  </span>
                ) : (
                  <span className="badge bg-careys-pink mb-1">Inactive</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


      
      <div className="row g-3 mb-3 row-deck">
      <div className="col-xl-7">
      <div className="card">
      <div className="card-header py-3 d-flex justify-content-between">
        <h6 className="mb-0 fw-bold">Recent Transactions</h6>
      </div>
      <div className="card-body" style={{ overflowX: 'auto' }}>
        {transactions.length === 0 ? (
          <p className="text-center">No Recent transactions</p>
        ) : (
          <table
            id="ordertabthree"
            className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0"
            style={{ maxWidth: '100%' }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Pair</th>
                <th>Side</th>
                <th>Price</th>
                <th>Executed</th>
                <th>Fee</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.pair}</td>
                  <td>{transaction.side}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.executed}</td>
                  <td>{transaction.fee}</td>
                  <td>{transaction.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
        </div>
       
        <div className="col-xl-12 col-xxl-5">
        <div className="card card-custom">
  <div className="card-body">
    <div className="row row-cols-2 g-0">
      <div className="col">
        <div className="settings border-bottom border-end settings-custom">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green mx-2 my-2" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Enable 2FA</span>
                        <span>Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings border-bottom">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-red  m-1" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Identity Verification</span>
                        <Link to="/settings" title="setup" className="text-decoration-underline">verify</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings border-bottom border-end">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green  m-1" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Anti-phishing Code</span>
                        <Link to="/settings" title="setup" className="text-decoration-underline">Setup</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings border-bottom">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green m-1" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Withdrawal Whitelist</span>
                        <Link to="/settings" title="setup" className="text-decoration-underline">Turn on</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings border-bottom border-end">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green m-1" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">settings Key</span>
                        <Link to="/settings" title="setup" className="text-decoration-underline">Setup</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings border-bottom">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green m-2" />
                     
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Google Authenticator</span>
                        <Link to="/settings" title="setup" className="text-decoration-underline">Setup</Link>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings  border-end">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-green mx-2 my-2" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Phone Number</span>
                        <span>{user?.userInfo?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="settings ">
                    <div className="d-flex align-items-start px-2 py-3">
                      <div className="dot-red mx-2 my-2" />
                      <div className="d-flex flex-column">
                        <span className="flex-fill text-truncate">Email Address </span>
                        <span>{user?.userInfo?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* Row End */}
  
    </div>
  </div>
  );
};

export default Home;
