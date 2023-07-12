import React, { useState } from "react";
import styles from "./Help.module.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { FaHandshake } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { HiReceiptTax } from "react-icons/hi";
import { FiMonitor } from "react-icons/fi";
import { MdOutlineContactSupport } from "react-icons/md";
import { BiMessageDetail } from "react-icons/bi";
import HelpHome from "./HelpHome";
import PaymentsAndTransfers from "./PaymentsAndTransfers";
import DisputesAndLimitations from "./DisputesAndLimitations";
import MyAccount from "./MyAccount";
import MyWallet from "./MyWallet";
import LoginAndSecurity from "./LoginAndSecurity";
import SellerTools from "./SellerTools";
import { useUser } from "../context";

function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const { user } = useUser();

  // Handle input change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.helpMain}>
      <div className={styles.helpMainDiv1}>
        <section className={styles.helpContainer}>
          <p className={styles.helpContainerP1}>
            Help Center - Personal Account
          </p>
          <p className={styles.helpContainerP2}>
            Welcome {user?.userInfo?.firstName}, how can we help?
          </p>
          <input
            type="text"
            className={styles.helpInput}
            placeholder="Search by keyword"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </section>

        <section className={styles.commonQuizes}>
          <nav className={styles.navSideBar}>
            <Link
              to="/help"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help" ? styles.active : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/help/payments-and-transfers"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/payments-and-transfers"
                  ? styles.active
                  : ""
              }`}
            >
              Payments and transfers
            </Link>
            <Link
              to="/help/disputes-and-limitations"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/disputes-and-limitations"
                  ? styles.active
                  : ""
              }`}
            >
              Disputes and Limitations
            </Link>
            <Link
              to="/help/my-account"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/my-account" ? styles.active : ""
              }`}
            >
              My Account
            </Link>
            <Link
              to="/help/my-wallet"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/my-wallet" ? styles.active : ""
              }`}
            >
              My wallet
            </Link>
            <Link
              to="/help/login-and-security"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/login-and-security"
                  ? styles.active
                  : ""
              }`}
            >
              Login & Security
            </Link>
            <Link
              to="/help/seller-tools"
              className={` ${styles.sideLinks} ${
                location.pathname === "/help/seller-tools" ? styles.active : ""
              }`}
            >
              Seller Tools
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<HelpHome />} />
            <Route path="/payments-and-transfers" element={<PaymentsAndTransfers />} />
            <Route
              path="/disputes-and-limitations"
              element={<DisputesAndLimitations />}
            />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-wallet" element={<MyWallet />} />
            <Route path="/login-and-security" element={<LoginAndSecurity />} />
            <Route path="/seller-tools" element={<SellerTools />} />
          </Routes>
        </section>

        <section className={styles.moreHelp}>
          <p className={styles.moreHelpP}>More ways we can help</p>
          <div className={styles.moreHelpDivs}>
            <Link className={styles.technicalHelp}>
              <FaHandshake className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Resolution Center</p>
                <p className={styles.technicalHelpP2}>
                  Fix transactions and account related issues
                </p>
              </div>
            </Link>
            <Link className={styles.technicalHelp}>
              <IoIosPeople className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Community Forum</p>
                <p className={styles.technicalHelpP2}>
                  Join the discussion with Ravel customers
                </p>
              </div>
            </Link>
            <Link className={styles.technicalHelp}>
              <HiReceiptTax className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Tax center</p>
                <p className={styles.technicalHelpP2}>
                  Get your 1099-K and other tax info here
                </p>
              </div>
            </Link>
            <Link className={styles.technicalHelp}>
              <FiMonitor className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Technical Help</p>
                <p className={styles.technicalHelpP2}>
                  Find out how Ravel works for your business
                </p>
              </div>
            </Link>
            <Link className={styles.technicalHelp}>
              <MdOutlineContactSupport className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Contact Us</p>
                <p className={styles.technicalHelpP2}>
                  Contact customer service
                </p>
              </div>
            </Link>
            <Link className={styles.technicalHelp}>
              <BiMessageDetail className={styles.technicalHelpP} />
              <div className={styles.technicalHelpDiv}>
                <p className={styles.technicalHelpP1}>Message Center</p>
                <p className={styles.technicalHelpP2}>
                  Send, receive, and view your Ravel messages
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className={styles.survey}>
          <p className={styles.surveyP}>
            How are we doing? <span>Take our survey</span>
          </p>
        </section>
      </div>
    </div>
  );
}

export default Help;
