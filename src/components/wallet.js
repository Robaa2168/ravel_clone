import React, { useState, useEffect } from 'react';
import { useUser } from "./context";

function Wallet() {
  const { user } = useUser();
  const accounts = user.accounts;

  const getAccountByCurrency = (currency) => {
    return accounts.find((account) => account.currency === currency);
  };

  const usdAccount = getAccountByCurrency('USD');
  const eurAccount = getAccountByCurrency('EUR');
  const audAccount = getAccountByCurrency('AUD');
  const gbpAccount = getAccountByCurrency('GBP');
  const cadAccount = getAccountByCurrency('KES');

  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch('https://www.freeforexapi.com/api/live?pairs=USDEUR,USDAUD,USDGBP,USDKES');
        const data = await response.json();
        const rates = {
          EUR: 1 / data.rates.USDEUR.rate,
          AUD: 1 / data.rates.USDAUD.rate,
          GBP: 1 / data.rates.USDGBP.rate,
          KES: 1 / data.rates.USDKES.rate,
        };
        setConversionRates(rates);
        console.log(rates)
        console.log(data)
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    };

    fetchConversionRates();
  }, []);

  const convertToUSD = (currency, amount) => {
    return amount * (conversionRates[currency] || 1);
  };

  return (
    <div>
    {/* Body: Titel Header */}
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
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom align-items-center flex-wrap">
                <h6 className="mb-0 fw-bold">Balance Details</h6> 
                <ul className="nav nav-tabs tab-body-header rounded d-inline-flex" role="tablist">
                  <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#USD" role="tab">USD</a></li>
                  <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#EUR" role="tab">EUR</a></li>
                  <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#AUD" role="tab">AUD</a></li>
                  <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#GBP" role="tab">GBP</a></li>
                  <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#CAD" role="tab">CAD</a></li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="USD">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div>Account balance:</div>
                        <h4>{usdAccount.balance.toFixed(2)} USD≈${convertToUSD('USD', usdAccount.balance).toFixed(2)}</h4>
                        <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Received this month:</div>
                        <h5>{usdAccount.balance.toFixed(2)} USD</h5>
                        <div className="mt-3 text-uppercase text-muted small">Transfered this month:</div>
                        <h5>{usdAccount.balance.toFixed(2)} USD</h5>
                        <div className="mt-3 text-uppercase text-muted small">Estimated Value:</div>
                        <h5>${usdAccount.balance.toFixed(2)}</h5>
                      </div>
                   
                    </div>
                  </div>
                  <div className="tab-pane fade" id="EUR">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div>Account balance:</div>
                        <h4>{eurAccount.balance.toFixed(2)} EUR≈${convertToUSD('EUR', eurAccount.balance).toFixed(2)}</h4>
                        <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Received this month:</div>
                        <h5>{eurAccount.balance.toFixed(2)}  EUR</h5>
                        <div className="mt-3 text-uppercase text-muted small">Transfered this month:</div>
                        <h5>{eurAccount.balance.toFixed(2)}  EUR</h5>
                        <div className="mt-3 text-uppercase text-muted small">Estimated Value:</div>
                        <h5>${convertToUSD('EUR', eurAccount.balance).toFixed(2)}</h5>
                      </div>
                    
                    </div>
                  </div>
                  <div className="tab-pane fade" id="AUD">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div>Total AUD balance:</div>
                        <h4>{audAccount.balance.toFixed(2)} AUD≈${convertToUSD('AUD', audAccount.balance).toFixed(2)}</h4>
                        <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Received this month</div>
                        <h5>{audAccount.balance.toFixed(2)} AUD</h5>
                        <div className="mt-3 text-uppercase text-muted small">Transfered this month:</div>
                        <h5>{audAccount.balance.toFixed(2)} AUD</h5>
                        <div className="mt-3 text-uppercase text-muted small">Estimated Value:</div>
                        <h5>${convertToUSD('AUD', audAccount.balance).toFixed(2)}</h5>
                      </div>
                    
                    </div>
                  </div>
                  <div className="tab-pane fade" id="GBP">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div>Total GBP Balance:</div>
                        <h4>{gbpAccount.balance.toFixed(2)} GBP≈${convertToUSD('GBP', gbpAccount.balance).toFixed(2)}</h4>
                        <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Total GBP Balance:</div>
                        <h5>{gbpAccount.balance.toFixed(2)} GBP</h5>
                        <div className="mt-3 text-uppercase text-muted small">Total Unrealized PNL:</div>
                        <h5>${convertToUSD('GBP', gbpAccount.balance).toFixed(2)}</h5>
                      </div>
                     
                    </div>
                  </div>
                  <div className="tab-pane fade" id="CAD">
                    <div className="row g-3">
                      <div className="col-lg-6">
                        <div>Total CAD Balance:</div>
                        <h4>{cadAccount.balance.toFixed(2)} CAD≈${convertToUSD('KES', cadAccount.balance).toFixed(2)}</h4>
                        <div className="mt-3 pt-3 text-uppercase text-muted pt-2 small">Locked:</div>
                        <h5>{cadAccount.balance.toFixed(2)} CAD</h5>
                        <div className="mt-3 text-uppercase text-muted small">Flexible:</div>
                        <h5>${convertToUSD('CAD', cadAccount.balance).toFixed(2)}</h5>
                      </div>
                    
                    </div>
                  </div>
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
                      <label className="form-label">Select currency</label>
                      <div className="input-group">
                        <input type="text" className="form-control" />
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">USD</button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><a className="dropdown-item" href="#">USD</a></li>
                          <li><a className="dropdown-item" href="#">GBP</a></li>
                          <li><a className="dropdown-item" href="#">AUD</a></li>
                          <li><a className="dropdown-item" href="#">CAD</a></li>
                          <li><a className="dropdown-item" href="#">EUR</a></li>
                          <li><a className="dropdown-item" href="#">JPY</a></li>
                        </ul>
                      </div> 
                    </div>
                    <div className="col-sm-12">
                      <label className="form-label">Bank/Phone</label>
                      <input type="text" className="form-control" />
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
                          <div className="text-muted truncated"> 0 USD</div>
                        </div>
                        <div>
                          <div className="truncated">Minimum withdrawal</div>
                          <div className="text-muted  truncated"> 10 USD </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="d-flex justify-content-between flex-wrap">
                        <div>
                          <div className="truncated">Network fee</div>
                          <div className="text-muted truncated"> 0.00000 ~ 0.00000 USD</div>
                        </div>
                        <div>
                          <div className="truncated">24h remaining limit</div>
                          <div className="text-muted  truncated"> 5000 USD </div>
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
              <div className="card-header py-3 d-flex justify-content-between bg-transparent align-items-center">
                <h6 className="mb-0 fw-bold">Transfer</h6> 
              </div>
              <div className="card-body">
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-sm-12">
                      <label className="form-label">From</label>
                      <select className="form-select">
                        <option selected>USD</option>
                        <option value={1}>GBP</option>
                        <option value={2}>EUR</option>
                        <option value={3}>CAD</option>
                        <option value={4}>AUD</option>
                        <option value={5}>JPY</option>
                      </select>
                    </div>
                    <div className="col-sm-12">
                    <label className="form-label">To</label>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="pay ID e.g 786341" />
                      </div>
                    </div>
                    
                    <div className="col-sm-12">
                      <label className="form-label">Amount</label>
                      <div className="input-group">
                        <input type="text" className="form-control" />
                        <button className="btn btn-outline-secondary" type="button">Max</button>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <button type="submit" className="btn flex-fill btn-light-warning py-2 fs-5 text-uppercase px-5">Confirm</button>
                    </div>
                  </div>
                </form>
                <div className="table-responsive mt-1">
                  <table className="table border">
                    <tbody>
                      <tr>
                        <td>Total Transfer</td>
                        <td>0.00 USD</td>
                      </tr>
                      <tr>
                        <td>Available </td>
                        <td>0.00 USD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>{/* Row End */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card no-bg">
              <div className="card-header py-3 d-flex justify-content-between">
                <h6 className="mb-0 fw-bold">Transaction History</h6> 
              </div>
              <div className="card-body">
                <table id="ordertabthree" className="priceTable table table-hover custom-table table-bordered align-middle mb-0" style={{width: '100%'}}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Asset</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
              
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>{/* Row End */}
      </div>
    </div>
  </div>
  );
}

export default Wallet;
