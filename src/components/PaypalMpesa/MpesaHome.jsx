import React from "react";
import styles from "./MpesaHome.module.css";
import { Navbar } from "../SoleComponents";
import { Link } from "react-router-dom";

const MpesaHome = () => {
  return (
    <>
      <Navbar />
      <section className={styles.pyplMpesaSection}>
        <div className={styles.pyplWlcmInfo}>
          <h1>Welcome to Ravel Mobile Money Service.</h1>
          <p>
          Transfer your funds effortlessly between your Ravel pay and M-PESA accounts.
          </p>
          <div className={styles.pyplWltBtnsContainer}>
            <Link to="/ravel-mpesa/withdraw" className={styles.button}>
              Withdraw from Ravel
            </Link>
            <Link to="/ravel-mpesa/deposit" className={styles.button}>
              Deposit to Ravel
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default MpesaHome;
