import React, { useEffect } from "react";
import { useUser } from "./context"; 
import { Spinner } from "react-bootstrap"; // import Spinner component
import { useNavigate,Link  } from "react-router-dom";

const Header = () => {
  const userContext = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userContext, navigate]);

  if (!userContext || !userContext.user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status" variant="success">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const { user } = userContext;
  return (
<div>
    <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row align-item-center mb-3">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center ">
                  <h6 className="mb-0 fw-bold">Authentication (2FA)</h6>
                </div>
                <div className="card-body">
                  <div className="border-bottom py-2 mb-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-key fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">settings Key</span>
                            <span className="text-muted small">Protect your account with a settings key.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">ON</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#EnableModal" disabled>Enabled</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom py-2 mb-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-network fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Google Authenticator (Recommended)</span>
                            <span className="text-muted small">Protect your account and transactions.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">ON</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#EnableModal" disabled>Enabled</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom py-2 mb-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-smart-phone fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Phone Number Verification</span>
                            <span className="text-muted small">Protect your account and transactions.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">{user.userInfo.phoneNumber}</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-danger py-2 fs-6 text-uppercase px-3 m-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#RemoveModal" disabled>Remove</button>
                        <button type="button" className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3 float-lg-end mx-2" data-bs-toggle="modal" data-bs-target="#ChangeModal">Change</button>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-email fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Email Address Verification</span>
                            <span className="text-muted small">Protect your account and transactions.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">{user.userInfo.email}</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-danger py-2 fs-6 text-uppercase px-3 m-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#RemoveModal" disabled>Remove</button>
                        <button type="button" className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3  float-lg-end mx-2" data-bs-toggle="modal" data-bs-target="#ChangeModal">Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center ">
                  <h6 className="mb-0 fw-bold">Advanced settings</h6>
                </div>
                <div className="card-body">
                  <div className="border-bottom py-2 mb-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-ui-lock fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Login Password</span>
                            <span className="text-muted small">Login password is used to log in to your account.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-success py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#ChangeModal">Change</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom py-2 mb-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-tasks fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Withdrawal Whitelist</span>
                            <span className="text-muted small">whitelisted withdrawal addresses.</span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">ON</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#EnableModal" disabled>Enabled</button>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="row justify-content-between">
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex">
                          <i className="icofont-anchor fs-5 text-primary" />
                          <div className="d-flex flex-column px-2">
                            <span className="fw-bold">Anti-Phishing Code</span>
                            <span className="text-muted small">Protect your account from phishing attempts </span>
                          </div>
                        </div>   
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <div className="d-flex align-items-center">
                          <i className="icofont-check-circled fs-5 text-success" />
                          <span className="px-2">ON</span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-xl-4">
                        <button type="button" className="btn flex-fill btn-light-warning py-2 fs-6 text-uppercase px-3 mt-2 mt-lg-0 float-lg-end" data-bs-toggle="modal" data-bs-target="#EnableModal" disabled>Enabled</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> {/* Row end  */}
        </div>
        </div>
   

       <div className="body d-flex py-3">
       <div className="container-xxl">
         <div className="row mb-3">
           <div className="col-xl-12">
             <div className="card">
               <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center ">
                 <h6 className="mb-0 fw-bold">Verification</h6>
               </div>
               <div className="card-body">
                 <div className="row g-3">
                   <div className="col-xl-3">
                     <div className="d-flex flex-column">
                       <h6 className="mb-3">Not Verified</h6>
                       <span className="text-muted my-1"><i className="icofont-close-circled fs-5 text-danger px-2" />Personal information</span>
                       <span className="text-muted my-1"><i className="icofont-close-circled fs-5 text-danger px-2" />Government-issued ID</span>
                       <span className="text-muted my-1"><i className="icofont-close-circled fs-5 text-danger px-2" />Facial recognition</span>
                     </div>
                   </div>
                   <div className="col-xl-9">
                     <h6 className="mb-3">Current Features</h6>
                     <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-3">
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted"> Deposit &amp; Withdrawal Limits</span>
                             <span className="fw-bold">$5K Daily</span>
                           </div>
                         </div>
                       </div>
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted">Transfer Limit</span>
                             <span className="fw-bold">$5K Daily</span>
                           </div>
                         </div>
                       </div>
                       
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted">Receive Limits</span>
                             <span className="fw-bold">$5K Daily</span>
                           </div>
                         </div>
                       </div>
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted">Other Features</span>
                             <span className="fw-bold">LPD/OTC/RavelMobile card</span>
                           </div>
                         </div>
                       </div>
                       
                   
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted">Paypal Deposit</span>
                             <span className="fw-bold">$1K Daily</span>
                           </div>
                         </div>
                       </div>
                       <div className="col">
                         <div className="d-flex flex-column">
                           <div className="d-flex flex-column">
                             <span className="text-muted">Bank Withdraw</span>
                             <span className="fw-bold">$5K Daily</span>
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
       </div>
     </div>
     <div>
        {/* Modal Enable*/}
        <div className="modal fade" id="EnableModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enable Settings</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Set Your Code</label>
                    <input type="text" className="form-control" />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirm Your Code</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Check me out</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Activate</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Change*/}
        <div className="modal fade" id="ChangeModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Settings</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Old Detail</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Detail</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Check me out</label>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save Change</button>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Remove*/}
        <div className="modal fade" id="RemoveModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Settings</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <i className="icofont-ui-delete fs-2 text-danger d-flex justify-content-center" />
                <h2 className="my-3 text-center">Are you sure you want to remove?</h2>
                <p className="text-muted">Withdrawals and P2P selling will be disabled for 24 hours after you make this change to protect your account.</p>
                <p className="text-muted">Two settings verification methods are required for withdrawals and other actions. Using only one verification method will limit your withdrawals.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

export default Header;
