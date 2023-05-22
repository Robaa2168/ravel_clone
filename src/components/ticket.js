import React from 'react';

const Ticket = () => {
  return (
    <div>
      <div className="body-header border-bottom d-flex py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 mt-1">Support Ticket</h1>
            </div>
          </div> {/* Row end  */}
        </div>
      </div>
      {/* Body: Body */}
      <div className="body d-flex py-3">
        <div className="container-xxl">
          <div className="row g-3">
            <div className="col-12">
              <div className="card overflow-hidden">
                <div className="progress" style={{ height: '4px' }}>
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '20%' }} aria-valuenow={32} aria-valuemin={0} aria-valuemax={100} />
                  <div className="progress-bar bg-info" role="progressbar" style={{ width: '30%' }} aria-valuenow={23} aria-valuemin={0} aria-valuemax={100} />
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: '10%' }} aria-valuenow={13} aria-valuemin={0} aria-valuemax={100} />
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '40%' }} aria-valuenow={7} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-3 col-sm-6">
                      <div className="card p-3">
                        <div className="text-muted text-uppercase"><i className="fa fa-circle me-2 text-danger" />New Ticket</div>
                        <div className="mt-1">
                          <span className="fw-bold h4 mb-0">0</span>
                          <span className="ms-1">0% <i className="fa fa-caret-up" /></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="card p-3">
                        <div className="text-muted text-uppercase"><i className="fa fa-circle me-2 text-info" />In Prograss</div>
                        <div className="mt-1">
                          <span className="fw-bold h4 mb-0">0</span>
                          <span className="ms-1">0% <i className="fa fa-caret-down" /></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="card p-3">
                        <div className="text-muted text-uppercase"><i className="fa fa-circle me-2 text-warning" />On Hold</div>
                        <div className="mt-1">
                          <span className="fw-bold h4 mb-0">0</span>
                          <span className="ms-1">0% <i className="fa fa-caret-up" /></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                      <div className="card p-3">
                        <div className="text-muted text-uppercase"><i className="fa fa-circle me-2 text-success" />Completed</div>
                        <div className="mt-1">
                          <span className="fw-bold h4 mb-0">0</span>
                          <span className="ms-1">0% <i className="fa fa-caret-up" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-xxl-9 col-lg-8 col-md-8">
                      <div className="form-floating">
                        <input type="email" className="form-control" placeholder="Find Ticket..." />
                        <label>Find Ticket...</label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-4 col-md-4 text-lg-end">
                      <button type="button" className="btn btn-lg btn-primary m-2">Search</button>
                      <button type="button" className="btn btn-lg btn-secondary" data-bs-toggle="modal" data-bs-target="#AddNewTicket">Add new ticket</button>
                    </div>
                    <div className="col-12 fs-6">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultValue id="All" />
                        <label className="form-check-label" htmlFor="All">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultValue id="NewTicket" />
                        <label className="form-check-label" htmlFor="NewTicket">NewTicket</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultValue id="InPrograss" />
                        <label className="form-check-label" htmlFor="InPrograss">In Prograss</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultValue id="OnHold" />
                        <label className="form-check-label" htmlFor="OnHold">On Hold</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" defaultValue id="Completed" />
                        <label className="form-check-label" htmlFor="Completed">Completed</label>
                      </div>
                    </div>
                  </div> {/* Row end  */}
                </div>
              </div>
            </div>
            <div className="col-12">
              <h5 className="mb-0 mt-3">Showing 0 Tickets</h5>
              <span className="text-muted small">Based your preferences</span>
            </div>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table align-middle table-bordered mb-0 custom-table-2">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Last Update</th>
                      <th>Supoort</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>
          </div> {/* Row end  */}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
