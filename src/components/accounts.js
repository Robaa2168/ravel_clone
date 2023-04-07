import React from "react";
import { Link } from "react-router-dom";

function Accounts() {
  return (
    <div className="row">
    <div className="col-xl-12">
      <div className="card no-bg">
        <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
          <h6 className="mb-0 fw-bold ">Currency List</h6> 
        </div>
        <div className="card-body">
          <table id="myProjectTable" className="priceTable table table-hover custom-table table-bordered align-middle mb-0" style={{width: '100%'}}>
            <thead>
              <tr>
                <th>currency</th>
                <th>Id</th>
                <th>channel</th> 
                <th>state</th> 
                <th>limit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="text-uppercase fw-bold"> USD </span></td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>$5,000</td>
                <td><button type="submit" className="btn btn-light-success" data-bs-toggle="modal" data-bs-target="#icoModal">Activate</button></td>
              </tr>
              <tr>
                <td><span className="text-uppercase fw-bold"> GBP </span> </td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>$6,000</td>
                <td><button type="submit" className="btn btn-light-success" data-bs-toggle="modal" data-bs-target="#icoModal">Activate</button></td>
              </tr>
              <tr>
                <td><span className="text-uppercase fw-bold"> AUD </span></td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>$10,000</td>
                <td><button type="submit" className="btn btn-light-success" data-bs-toggle="modal" data-bs-target="#icoModal">Activate</button></td>
              </tr>
              <tr>
                <td><span className="text-uppercase fw-bold"> EUR </span></td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>$60,000</td>
                <td><button type="submit" className="btn btn-light-success" data-bs-toggle="modal" data-bs-target="#icoModal">Activate</button></td>
              </tr>
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
              <div>
                <img src="assets/images/coin/AE.png" alt="" className="img-fluid avatar mx-1" /><span className="text-uppercase fw-bold"> AE </span> <span className="text-muted"> Cardano</span>
                <span className="text-muted d-block small px-2 my-2">Oct 12, 2021 - Oct 12, 2021 , starts in 40 minutes</span>
              </div>
              <div className="row">
                <div className="col-lg-12 col-xl-8">
                  <div className="row g-3">
                    <div className="col-lg-6">
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <td><span className="text-muted">Tokens for Sale</span></td>
                              <td><strong>2,857,142 AE</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">ICO Price</span></td>
                              <td><strong>$0.035000</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Soft Cap</span></td>
                              <td><strong>IDO</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Fundraising Goal</span></td>
                              <td><strong>$100,000</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Personal Cap</span></td>
                              <td><strong>100 USDT</strong></td>
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
                              <td><span className="text-muted">Tokens Sold</span></td>
                              <td><strong>N/A</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Where to buy</span></td>
                              <td><strong>Cryptoon</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">% of Total Supply</span></td>
                              <td><strong>0.952%</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Accept</span></td>
                              <td><strong>USDT</strong></td>
                            </tr>
                            <tr>
                              <td><span className="text-muted">Access</span></td>
                              <td><strong>Public</strong></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <p>Note: Tokens aren't claimed will be moved to Whitelist round and therefore Whitelist Round's slots will be automatically increased</p>
                  <p>Allocation is based on the % of your $LZ and $BSCX locked in #LZPad</p>
                  <p>Participating token: $USDT</p>
                  <p>Total: 200 slots</p>
                  <p>100$/spot, FCFS Round</p>
                </div>
                <div className="col-lg-12 col-xl-4">
                  <div className="card  mb-3">
                    <div className="card-body">
                      <div className="checkout-sidebar">
                        <div className="checkout-sidebar-price-table mt-30">
                          <h5 className="title fw-bold">Pricing</h5>
                          <div className="sub-total-price">
                            <div className="total-price">
                              <p className="value">Sale Price:</p>
                              <p className="price">12 AE = $0.420000</p>
                            </div>
                            <div className="total-price shipping">
                              <p className="value">Total allocation:</p>
                              <p className="price">2,857,142 AE</p>
                            </div>
                            <div className="total-price discount">
                              <p className="value">Max cap / person:</p>
                              <p className="price">500,000 AE</p>
                            </div>
                          </div>
                          <div className="total-payable">
                            <div className="payable-price">
                              <p className="value fw-bold">Total Payable:</p>
                              <p className="price fw-bold">$4.00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
                      <div className="form-check d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                        <label className="form-check-label fw-bold d-flex align-items-center" htmlFor="flexRadioDefault1">
                         Debit/Credit Card
                        </label>
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
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
                      </form>
                    </div>
                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
                      <div className="form-check d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label fw-bold d-flex align-items-center" htmlFor="flexRadioDefault2">
                          <i className="icofont-world fs-3 mx-2" /> Net Banking
                        </label>
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
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
                        <a href="invoices.html" className="btn btn-primary mt-4 text-uppercase">Pay Now</a>
                      </form>
                    </div>
                    <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
                      <div className="form-check d-flex align-items-center">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label fw-bold d-flex align-items-center" htmlFor="flexRadioDefault2">
                          <i className="icofont-world fs-3 mx-2" /> M-pesa
                        </label>
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="row g-3 align-items-center">
                          <div className="col-md-12">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" required />
                          </div>
                          
                        </div>
                        <a href="invoices.html" className="btn btn-primary mt-4 text-uppercase">Pay Now</a>
                      </form>
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
