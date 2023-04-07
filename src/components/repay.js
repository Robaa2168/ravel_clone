import React from 'react';
import { Link } from "react-router-dom";

const Repay = () => {
  return (
    <div>
        {/* Body: Titel Header */}
        <div className="body-header border-bottom d-flex py-3">
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col">
              </div>
              <div className="col-auto">
              <Link to="/loan" title="loan" className="btn btn-dark lift">
      Apply Loan
    </Link>
              </div>
            </div> {/* Row end  */}
          </div>
        </div>
        {/* Body: Body */}
        <div className="body d-flex py-3">
          <div className="container-xxl">
            <div className="row my-5">
              <div className="col">
                <div className="hor-timeline-steps">
                  <div className="hor-timeline-step">
                    <div className="timeline-content">
                      <div className="inner-circle" />
                      <p className="h6 mt-3 text-muted mb-0 mb-lg-0">Set Your Payment </p>
                    </div>
                  </div>
                  <div className="hor-timeline-step">
                    <div className="timeline-content">
                      <div className="inner-circle" />
                      <p className="h6 mt-3 text-muted mb-0 mb-lg-0">Fast Payments</p>
                    </div>
                  </div>
                  <div className="hor-timeline-step">
                    <div className="timeline-content">
                      <div className="inner-circle" />
                      <p className="h6 mt-3 text-muted mb-0 mb-lg-0">With RavelMobile</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* Row: End */}
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center flex-wrap border-bottom">
                    <h6 className="mb-0 fw-bold">Loans</h6>
                    <ul className="nav nav-tabs tab-body-header rounded d-inline-flex mt-2 mt-md-0" role="tablist">
                      <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#Pay" role="tab">Pay</a></li>
                      <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#Receive" role="tab">Receive</a></li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div>Funding Wallet:</div>
                    <h3>0.0 USD</h3>
                    <div className="d-flex my-3 flex-wrap">
                      <div className>
                        <div className="text-uppercase text-muted small">Amount Spent</div>
                        <h5>0.0 USD</h5>
                      </div>
                      <div className="px-4">
                        <div className="text-uppercase text-muted small">Amount Recevied</div>
                        <h5>0.0 USD</h5>
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="Pay">
                        <form>
                          <div className="row g-3 mb-3 row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">
                            <div className="col">
                              <label className="form-label">Email</label>
                              <input type="email" className="form-control" />
                            </div>
                            <div className="col">
                              <label className="form-label">Phone</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col">
                              <label className="form-label">PayID</label>
                              <input type="text" className="form-control" />
                            </div>
                            <div className="col">
                              <label className="form-label">Select Coin</label>
                              <select className="form-select">
                                <option selected>USD</option>
                                <option value={1}>EUR</option>
                                <option value={2}>AUD</option>
                                <option value={3}>GBP</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Amout Pay</label>
                            <input type="email" className="form-control" />
                          </div>
                          <div className="form-floating">
                            <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: '100px'}} defaultValue={""} />
                            <label htmlFor="floatingTextarea2" className="form-label">Add Note</label>
                          </div>
                          <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5 mt-4">Pay</button>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="Receive">
                        <p className="text-muted">Accept Payments</p>
                        <div className="d-flex flex-wrap align-items-center">
                          <img src="assets/images/qr-code.png" alt="Download App" className="img-fluid" />
                          <form className="px-3">
                            <div className="row g-3 mb-3 row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
                              <div className="col">
                                <label className="form-label">Currency</label>
                                <label className="form-label">Select Coin</label>
                              <select className="form-select">
                                <option selected>USD</option>
                                <option value={1}>EUR</option>
                                <option value={2}>AUD</option>
                                <option value={3}>GBP</option>
                              </select>
                              </div>
                              <div className="col">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" />
                              </div>
                              <div className="col">
                                <label className="form-label">Amount</label>
                                <input type="text" className="form-control" />
                              </div>
                              <div className="col">
                                <label className="form-label">Note</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5">Confirm</button>
                          </form>
                        </div>
                        <h5 className="mt-4 mb-4">Payment History</h5>
                        <table id="ordertabthree" className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0" style={{width: '100%'}}>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Transfer/Received Id</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* Row: End */}
          </div>
        </div>
      </div>
  );
};

export default Repay;
