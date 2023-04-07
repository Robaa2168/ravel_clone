import React from 'react';
import { Link } from "react-router-dom";

const Loan = () => {
  return (
    <div>
      <div className="body-header border-bottom d-flex py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col">
            </div>
            <div className="col-auto">

              <Link to="/repay" title="repay" className="btn btn-dark lift">
                Pay Loan
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row my-5">
            <div className="col-xl-12">
              <div className="hor-timeline-steps">
                <div className="hor-timeline-step">
                  <div className="timeline-content">
                    <div className="inner-circle" />
                    <p className="h6 mt-3 mb-1">Hour - 10min</p>
                    <p className="h6 text-muted mb-0 mb-lg-0">Loan Request</p>
                  </div>
                </div>
                <div className="hor-timeline-step">
                  <div className="timeline-content">
                    <div className="inner-circle" />
                    <p className="h6 mt-3 mb-1">Hour - 05min</p>
                    <p className="h6 text-muted mb-0 mb-lg-0">Receive Loan</p>
                  </div>
                </div>
                <div className="hor-timeline-step">
                  <div className="timeline-content">
                    <div className="inner-circle" />
                    <p className="h6 mt-3 mb-1">Day - (0)</p>
                    <p className="h6 text-muted mb-0 mb-lg-0">Repay at any time</p>
                  </div>
                </div>
                <div className="hor-timeline-step">
                  <div className="timeline-content">
                    <div className="inner-circle" />
                    <p className="h6 mt-3 mb-1">Day - 1</p>
                    <p className="h6 text-muted mb-0 mb-lg-0">Receive Collateral</p>
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
                    <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#Borrow" role="tab">Borrow</a></li>
                    <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#Orders" role="tab">Ongoing Orders (0)</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="Borrow">
                      <div className="row g-3">
                        <div className="col-xl-6">
                          <div className="color-bg-100 p-2 p-lg-4 mt-4">
                            <h4>Initial LTV <span className="small">(Loan-to-Value Ratio)</span></h4>
                            <h5 className="color-price-up">65%</h5>
                            <span className="text-muted d-block">Initial LTV 65%, Margin Call 75%, Liquidation LTV 83%</span>
                            <div className="d-flex justify-content-between flex-wrap my-3">
                              <div>
                                <div className="truncated">Liquidation Price(USD/USDT)</div>
                                <div className="text-muted truncated"> 0 USD</div>
                              </div>
                              <div>
                                <div className="truncated">Total Interest Amount</div>
                                <div className="text-muted truncated"> 0 USD</div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between flex-wrap">
                              <div>
                                <div className="truncated">Hourly &amp; Daily Interest Rate</div>
                                <div className="text-muted  truncated"> 0.003917% / 0.0800% </div>
                              </div>
                              <div>
                                <div className="truncated">Repayment Amount</div>
                                <div className="text-muted  truncated"> - USD </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <form>
                            <label className="form-label">I want to borrow</label>
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="e.g 100 USD" />
                              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">USD</button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">USD</a></li>
                                <li><a className="dropdown-item" href="#">AUD</a></li>
                                <li><a className="dropdown-item" href="#">GBP</a></li>
                                <li><a className="dropdown-item" href="#">EUR</a></li>
                              </ul>
                            </div>
                            <label className="form-label">Collateral Amount</label>
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" />
                              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">USD</button>
                              <ul className="dropdown-menu dropdown-menu-end">     <li><a className="dropdown-item" href="#">USD</a></li>
                                <li><a className="dropdown-item" href="#">AUD</a></li>
                                <li><a className="dropdown-item" href="#">GBP</a></li>
                                <li><a className="dropdown-item" href="#">EUR</a></li>
                              </ul>
                            </div>
                            <label className="form-label mb-0">Loan Term</label>
                            <span className="text-muted d-block small mb-3">No interest penalty for early repayment</span>
                            <div className="btn-group mb-3 justify-content-center d-flex" role="group">
                              <button type="button" className="btn btn-outline-primary p-3">  7 Days</button>
                              <button type="button" className="btn btn-outline-primary p-3"> 14 Days</button>
                              <button type="button" className="btn btn-outline-primary p-3"> 30 Days</button>
                              <button type="button" className="btn btn-outline-primary p-3"> 90 Days</button>
                            </div>
                            <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5 mt-4" disabled>Start Borrowing Now</button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="Orders">
                      <table id="ordertabthree" className="priceTable table table-hover custom-table-2 table-bordered align-middle mb-0" style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Borrow</th>
                            <th>Collateral Amount</th>
                            <th>Term Day</th>
                            <th>Interest Rate</th>
                            <th>Total Interest Amount</th>
                            <th>Repayment Amount</th>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loan;
