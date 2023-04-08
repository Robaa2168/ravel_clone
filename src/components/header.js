import React, { useEffect } from "react";
import { useUser } from "./context";
import { Spinner } from "react-bootstrap"; // import Spinner component
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const handleLogout = () => {
    logout();
    setTimeout(() => {
      navigate("/login");
    }, 50);
  };

  return (

    <div className="header">
      <nav className="navbar py-4">
        <div className="container-xxl">
          <div className="h-right d-flex align-items-center mr-5 mr-lg-0 order-1">
            <div className="d-flex">
              <Link to="/wallet" title="Wallet" className="nav-link text-primary collapsed">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 64 64">
                  <path className="st1" d="M15,24c-3.86,0-7,2.691-7,6v20c0,3.309,3.14,6,7,6h41V32H15c-1.598,0-3-0.935-3-2s1.402-2,3-2h5.25
                                                    c0,0,1-5,5.75-5s6,5,6,5h22v-4H15z" />
                  <path className="st0" d="M42,4c-4.418,0-8,3.582-8,8s3.582,8,8,8c4.417,0,8-3.582,8-8S46.417,4,42,4z M42,16c-2.208,0-4-1.792-4-4
                                                    s1.792-4,4-4s4,1.792,4,4S44.208,16,42,16z" />
                  <path className="st0" d="M26,20c-4.418,0-8,3.582-8,8h4c0-2.208,1.792-4,4-4s4,1.792,4,4h4C34,23.582,30.418,20,26,20z" />
                </svg>
              </Link>
            </div>
            <div className="dropdown notifications zindex-popover">
              <a className="nav-link dropdown-toggle pulse" href="#" role="button" data-bs-toggle="dropdown">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 38 38">
                  <path d="M36,34v-2h-2.98c-0.598-0.363-1.081-3.663-1.4-5.847c-0.588-4.075-1.415-9.798-4.146-13.723  C26.584,12.154,25.599,12,24.5,12c-3.646,0-5.576,1.657-7.106,4.086C15.089,19.746,14,30.126,14,33c0,2.757,2.243,5,5,5  c2.414,0,4.435-1.721,4.898-4H36z" style={{ fill: 'var(--primary-color)' }} data-st="fill:var(--chart-color4);" />
                  <path className="st0" d="M33.02,32c-0.598-0.363-1.081-3.663-1.4-5.847c-0.851-5.899-2.199-15.254-9.101-17.604  C23.433,7.643,24,6.386,24,5c0-2.757-2.243-5-5-5s-5,2.243-5,5c0,1.386,0.567,2.643,1.482,3.549  c-6.902,2.35-8.25,11.705-9.101,17.604C6.209,27.324,5.991,28.813,5.733,30h2.042c0.192-0.961,0.376-2.127,0.586-3.562  C9.36,19.501,10.73,10,19,10c8.27,0,9.64,9.501,10.641,16.442c0.386,2.636,0.682,4.394,1.108,5.558H2v2h12.101  c0.464,2.279,2.485,4,4.899,4c2.415,0,4.435-1.721,4.899-4H36v-2H33.02z M19,8c-1.654,0-3-1.346-3-3s1.346-3,3-3s3,1.346,3,3  S20.654,8,19,8z M19,36c-1.304,0-2.416-0.836-2.829-2h5.658C21.416,35.164,20.304,36,19,36z" />
                </svg>
                <span className="pulse-ring" />
              </a>
              <div id="NotificationsDiv" className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-md-end p-0 m-0">
                <div className="card border-0 w380">
                  <div className="card-header border-0 p-3">
                    <h5 className="mb-0 font-weight-light d-flex justify-content-between">
                      <span>Notifications</span>
                      <span className="badge text-white"></span>
                    </h5>
                  </div>
                  <div className="tab-content card-body">
                    <div className="tab-pane fade show active">

                    </div>
                  </div>
                  <a className="card-footer text-center border-top-0" href="#"> View all notifications</a>
                </div>
              </div>
            </div>
            <div className="dropdown zindex-popover">

            </div>
            <div className="dropdown user-profile ml-2 ml-sm-3 d-flex align-items-center zindex-popover">
              <a className="nav-link dropdown-toggle pulse p-0" href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static">
                <img className="avatar lg rounded-circle img-thumbnail" src="assets/images/profile_av.svg" alt="profile" />
              </a>
              <div className="dropdown-menu rounded-lg shadow border-0 dropdown-animation dropdown-menu-end p-0 m-0">
                <div className="card border-0 w280">
                  <div className="card-body pb-0">
                    <div className="d-flex py-1">
                      <img className="avatar rounded-circle" src="assets/images/profile_av.svg" alt="profile" />
                      <div className="flex-fill ms-3">
                        <p className="mb-0"><span className="font-weight-bold">{user?.userInfo?.firstName}</span></p>
                        <small className>{user?.userInfo?.email}</small>
                      </div>
                    </div>
                    <div><hr className="dropdown-divider border-dark" /></div>
                  </div>
                  <div className="list-group m-2 ">

                    <Link to="/settings" title="Wallet" className="list-group-item list-group-item-action border-0 ">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32" className="me-3">
                        <path xmlns="http://www.w3.org/2000/svg" d="M15.5,27.482C5.677,24.8,4.625,10.371,4.513,7.497C11.326,7.402,14.5,5.443,15.5,4.661  c0.999,0.782,4.174,2.742,10.986,2.836C26.375,10.371,25.323,24.8,15.5,27.482z" style={{ fill: 'var(--primary-color)' }} data-st="fill:var(--chart-color4);" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st2" d="M14.13,21.5c-0.801,0-1.553-0.311-2.116-0.873c-0.57-0.57-0.883-1.327-0.881-2.132  c0.001-0.8,0.314-1.55,0.879-2.11c0.555-0.563,1.297-0.876,2.093-0.885c0.131-0.001,0.256-0.054,0.348-0.146l4.63-4.63  c0.388-0.38,0.879-0.583,1.416-0.583s1.028,0.203,1.42,0.587c0.373,0.373,0.58,0.875,0.58,1.413c0,0.531-0.207,1.03-0.584,1.406  l-4.64,4.641c-0.094,0.095-0.146,0.222-0.146,0.354c0,0.782-0.311,1.522-0.873,2.087C15.693,21.189,14.938,21.5,14.13,21.5z" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st0" d="M15.5,4c0,0-2.875,3-11.5,3c0,0,0,18,11.5,21C27,25,27,7,27,7C18.375,7,15.5,4,15.5,4z M15.5,26.984  C6.567,24.43,5.217,11.608,5.015,7.965C11.052,7.797,14.213,6.15,15.5,5.251c1.287,0.899,4.448,2.545,10.484,2.713  C25.782,11.608,24.434,24.43,15.5,26.984z M22.27,10.37c-0.479-0.47-1.1-0.73-1.77-0.73s-1.29,0.261-1.77,0.73L14.1,15  c-0.92,0.01-1.79,0.37-2.44,1.03c-1.37,1.358-1.37,3.579,0,4.95c0.66,0.66,1.54,1.02,2.47,1.02c0.94,0,1.82-0.359,2.479-1.02  c0.66-0.66,1.021-1.53,1.021-2.44l4.64-4.64C22.74,13.43,23,12.81,23,12.14C23,11.47,22.74,10.84,22.27,10.37z M21.561,13.2  l-4.949,4.95c0.1,0.75-0.13,1.539-0.71,2.119C15.41,20.76,14.77,21,14.13,21c-0.64,0-1.28-0.24-1.76-0.73  c-0.98-0.979-0.98-2.56,0-3.539c0.49-0.489,1.12-0.729,1.76-0.729c0.12,0,0.24,0.01,0.36,0.03l4.949-4.95  c0.291-0.3,0.681-0.44,1.061-0.44s0.77,0.141,1.061,0.44C22.15,11.66,22.15,12.61,21.561,13.2z M19.79,12.14l0.71,0.7l-5.02,5.021  c0.27,0.56,0.18,1.238-0.29,1.699c-0.58,0.59-1.53,0.59-2.12,0c-0.58-0.58-0.58-1.529,0-2.119c0.47-0.461,1.16-0.562,1.71-0.291  L19.79,12.14z M16,11H9v-1h7V11z M14,13H9v-1h5V13z" />
                      </svg>Security
                    </Link>
                    <Link to="/settings" title="Identification" className="list-group-item list-group-item-action border-0 ">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" className="me-3">
                        <path xmlns="http://www.w3.org/2000/svg" d="M4,12c0-4.418,3.582-8,8-8s8,3.582,8,8s-3.582,8-8,8S4,16.418,4,12z" style={{ fill: 'var(--primary-color)' }} data-st="fill:var(--chart-color4);" />
                        <path xmlns="http://www.w3.org/2000/svg" style={{ opacity: '0.7' }} d="M12,17.25c-1.689,0-3.265-0.909-4.113-2.372l1.298-0.752C9.766,15.128,10.844,15.75,12,15.75  c1.162,0,2.244-0.628,2.823-1.639l1.301,0.746C15.279,16.333,13.699,17.25,12,17.25z M8.5,12c0.552,0,1-0.672,1-1.5S9.052,9,8.5,9  s-1,0.672-1,1.5S7.948,12,8.5,12z M15.5,12c0.552,0,1-0.672,1-1.5S16.052,9,15.5,9c-0.552,0-1,0.672-1,1.5S14.948,12,15.5,12z" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st0" id="shock_x5F_color" d="M4,6H2V2h4v2H4V6z M22,2h-4v2h2v2h2V2z M6,20H4v-2H2v4h4V20z M5,11H2v2h3V11z   M22,11h-3v2h3V11z M13,19h-2v3h2V19z M13,2h-2v3h2V2z M22,18h-2v2h-2v2h4V18z" />
                      </svg>Identification
                    </Link>
                    <Link to="/accounts" title="Accounts" className="list-group-item list-group-item-action border-0 ">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 32 32" className="me-3">
                        <path xmlns="http://www.w3.org/2000/svg" d="M15,5v12c0,0,0,2-2,2H5c0,0-2,0-2-2L3.01,4.89C3.04,4.46,3.29,3,5,3h8C13,3,15,3,15,5z   M27,13h-8c-1.71,0-1.96,1.46-1.99,1.89L17,27c0,2,2,2,2,2h8c2,0,2-2,2-2V15C29,13,27,13,27,13z" style={{ fill: 'var(--primary-color)' }} data-st="fill:var(--chart-color4);" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st0" d="M13,3H5C3.29,3,3.04,4.46,3.01,4.89L3,17c0,2,2,2,2,2h8c2,0,2-2,2-2V5C15,3,13,3,13,3z M9,12.5  c-1.93,0-3.5-1.57-3.5-3.5S7.07,5.5,9,5.5s3.5,1.57,3.5,3.5S10.93,12.5,9,12.5z" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st0" d="M14,16.12l0.99,0.99C14.96,17.54,14.71,19,13,19H5c0,0-2,0-2-2V5c0,0,0-2,2-2h8c0,0,2,0,2,2v7.88l-1-1V5  c0-0.8-0.55-0.99-1.01-1H5C4.19,4,4.01,4.55,4,5.01V17c0,0.81,0.55,0.99,1.01,1H13c0.81,0,0.99-0.55,1-1.01V16.12z M27,13h-8  c-1.71,0-1.96,1.46-1.99,1.89L18,15.88v-0.87c0.01-0.46,0.19-1.01,1-1.01h7.99c0.46,0.01,1.01,0.2,1.01,1v11.99  C27.99,27.45,27.81,28,27,28h-7.99C18.55,27.99,18,27.81,18,27v-6.88l-1-1V27c0,2,2,2,2,2h8c2,0,2-2,2-2V15C29,13,27,13,27,13z   M23,20h1v4h-4v-1h2.3L11.45,12.15C10.77,12.69,9.92,13,9,13c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4c0,0.92-0.31,1.77-0.85,2.45  L23,22.3V20z M12,9c0-1.65-1.35-3-3-3S6,7.35,6,9s1.35,3,3,3c0.64,0,1.25-0.21,1.74-0.56L9.15,9.85l0.7-0.7l1.59,1.59  C11.79,10.25,12,9.64,12,9z M22,26h4v-4h-1v3h-3V26z" />
                      </svg>Accounts
                    </Link>

                    <a onClick={handleLogout} className="list-group-item list-group-item-action border-0 ">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" className="me-3">
                        <rect xmlns="http://www.w3.org/2000/svg" className="st0" width={24} height={24} style={{ fill: 'none' }} fill="none" />
                        <path xmlns="http://www.w3.org/2000/svg" d="M20,4c0-1.104-0.896-2-2-2H6C4.896,2,4,2.896,4,4v16c0,1.104,0.896,2,2,2h12  c1.104,0,2-0.896,2-2V4z" style={{ fill: 'var(--primary-color)' }} data-st="fill:var(--chart-color4);" />
                        <path xmlns="http://www.w3.org/2000/svg" className="st0" d="M15,6.81v2.56c0.62,0.7,1,1.62,1,2.63c0,2.21-1.79,4-4,4s-4-1.79-4-4c0-1.01,0.38-1.93,1-2.63V6.81  C7.21,7.84,6,9.78,6,12c0,3.31,2.69,6,6,6c3.31,0,6-2.69,6-6C18,9.78,16.79,7.84,15,6.81z M13,6.09C12.68,6.03,12.34,6,12,6  s-0.68,0.03-1,0.09V12h2V6.09z" />
                      </svg>Signout
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* menu toggler */}
          <button className="navbar-toggler p-0 border-0 menu-toggle order-3" type="button" data-bs-toggle="collapse" data-bs-target="#mainHeader">
            <span className="fa fa-bars" />
          </button>
          {/* main menu Search*/}
          <div className="order-0 col-lg-4 col-md-4 col-sm-12 col-12 mb-3 mb-md-0 d-flex align-items-center">
            <a className="menu-toggle-option me-3 text-primary d-flex align-items-center" href="#" title="Menu Option">

            </a>

          </div>
        </div>
      </nav>


    </div>
  );
};

export default Header;