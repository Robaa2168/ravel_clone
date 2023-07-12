import React from "react";
import { Navbar } from "../SoleComponents";
import styles from "./MpesaTransactionHistory.module.css";
import { Link } from "react-router-dom";

function MpesaTransactionHistory() {
  return (
    <div>
      <Navbar />
      <section className={styles.pyplTransactionSection}>
        <p className={styles.par1}>Transaction History</p>
        <div className={styles.pyplWltBtnsContainer}>
          <Link to="/ravel-mpesa/withdraw" className={styles.button}>
            Withdraw from Ravel
          </Link>
          <Link to="/ravel-mpesa/topup" className={styles.button}>
            Top Up to Ravel
          </Link>
        </div>
        <p className={styles.par2}>No transaction to display in the history</p>
        <p className={styles.par3}>If you have questions about any of the transactions please <span>contact us</span></p>
      </section>
    </div>
  );
}

export default MpesaTransactionHistory;
