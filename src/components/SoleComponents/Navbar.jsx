import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openMobileNav, setOpenMobilenav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="pypl-mpesa-header">
      {/* mobile navbar */}
      {isMobile && (
        <div className="mobile-navbar">
          <div className="logo-container">
            <div className="mpesa-logo">
              <Link
                to="/ravel-mpesa"
                className={`mpesa ${
                  location.pathname === "/ravel-mpesa" ? "active" : ""
                }`}
              >
                M-PESA
              </Link>
            </div>
          </div>
          <div className="hamburger-icon">
            <FaBars
              onClick={() => setOpenMobilenav(!openMobileNav)}
              className="icon"
            />
          </div>
        </div>
      )}

      {/* mobile navigation */}
      {openMobileNav && (
        <nav className="mobile-navigations">
          <ul className="nav-container__mobile">
            <Link
              to="/ravel-mpesa/withdraw"
              className={`nav-item__mobile ${
                location.pathname === "/ravel-mpesa/withdraw" ? "active" : ""
              }`}
            >
              Withdraw
            </Link>
            <Link
              to="/ravel-mpesa/topup"
              className={`nav-item__mobile ${
                location.pathname === "/ravel-mpesa/topup" ? "active" : ""
              }`}
            >
              Top Up
            </Link>
            <Link
              to="/ravel-mpesa"
              className={`nav-item__mobile ${
                location.pathname === "/ravel-mpesa" ? "active" : ""
              }`}
            >
              Transaction History
            </Link>
          </ul>
        </nav>
      )}

      {/* desktop navigation */}
      {!isMobile && (
        <div className="desktop-navbar">
          <div className="logo-container">
            <div className="mpesa-logo">
              <Link
                to="/ravel-mpesa"
                className={`mpesa ${
                  location.pathname === "/ravel-mpesa" ? "active" : ""
                }`}
              >
                M-PESA
              </Link>
            </div>
          </div>

          {/* desktop navbar */}
          <nav className="desktop-navigations">
            <ul className="nav-container-desktop">
              <Link
                to="/ravel-mpesa/withdraw"
                className={`nav-item-desktop ${
                  location.pathname === "/ravel-mpesa/withdraw" ? "active" : ""
                }`}
              >
                Withdraw
              </Link>
              <Link
                to="/ravel-mpesa/topup"
                className={`nav-item-desktop ${
                  location.pathname === "/ravel-mpesa/topup" ? "active" : ""
                }`}
              >
                Top Up
              </Link>
              <Link
                to="/ravel-mpesa"
                className={`nav-item-desktop ${
                  location.pathname === "/ravel-mpesa" ? "active" : ""
                }`}
              >
                Transaction History
              </Link>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
