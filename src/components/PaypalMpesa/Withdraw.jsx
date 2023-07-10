import React from "react";
import styles from "./Widthdraw.module.css";
import { Navbar } from "../SoleComponents";

const Withdraw = () => {
  return (
    <>
      <Navbar />
      <section className={styles.pyplWithdrawSection}>
        <div className={styles.mainWithdrawContent}>
          <div className={styles.introHeader}>
            <h1>Withdraw from your Ravel account</h1>
          </div>

          <div className={styles.withdrawWrapperSplitter}>
            <div className={styles.withdrawContainer}>
              <h5>Available balance in your Ravel account:</h5>
              <div className={styles.balance}>
                <h2>0.00 USD</h2>
              </div>
              <p>
                Please enter the amount you would like to withdraw from your
                Ravel account:
              </p>
              <div className={styles.inputContainer}>
                <input type="number" placeholder="Amount" name="" id="" />
                <select name="" id="">
                  <option value="USD" selected>
                    USD
                  </option>
                  <option value="">YEN</option>
                  <option value="">EUR</option>
                  <option value="">GBP</option>
                </select>
              </div>
              <div className={styles.buttonContainer}>
                <button>Continue to Withdraw</button>
              </div>
            </div>
            <div className={styles.svgTransferIllustration}>
              <img
                src="https://res.cloudinary.com/dztycn4or/image/upload/v1681908458/graphic-blue_gky7dc.png"
                alt="transfer-illustration"
              />
            </div>
          </div>
        </div>
        <div className={styles.importantInfo}>
          <p>
            Please note that the maximum amount per transaction is 150,000 KES
            and you can only hold up to 300,000 KES in your M-PESA account. Make
            sure your M-PESA account can hold your withdrawal balance.
          </p>
        </div>
      </section>
    </>
  );
};

export default Withdraw;
