import React from "react";
import styles from "./TopUp.module.css";
import { Navbar } from "../SoleComponents";
import { Link } from "react-router-dom";

const TopUp = () => {
  return (
    <>
      <Navbar />
      <section className={styles.topupSection}>
        <div className={styles.mainTopupSection}>
          <div className={styles.topupHeader}>
            <h1>Top Up your PayPal account</h1>
          </div>
          <div className={styles.addMoneyContainer}>
            <div className={styles.topupDirectionsHowto}>
              <ul className={styles.howToContainer}>
                <div className={styles.item}>
                  <span className={styles.bulletNumber}>1</span>
                  <li className={styles.first}>
                    Calculate the KES amount you need to convert to get the USD
                    amount you want in your PayPal account.
                  </li>
                </div>
                <div className={styles.item}>
                  <span className={styles.bulletNumber}>2</span>
                  <li className={styles.second}>
                    Open your M-PESA, select "Lipa na M-PESA", then "Pay Bill".
                  </li>
                </div>
                <div className={styles.item}>
                  <span className={styles.bulletNumber}>3</span>
                  <li className={styles.third}>
                    Enter
                    <span className={styles.textHighlighted}> 800088 </span>
                    as the business number, and your phone number as the account
                    number.
                  </li>
                </div>
              </ul>
              <div className={styles.added} >
                <h3>And that's it!</h3>
                <p>
                  You will receive an SMS confirming that USD were added to your
                  PayPal balance. You can also check the status on the{" "}
                  <Link to="/" className={styles.textHighlighted}>
                    Trasaction History
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>
            <div className={styles.topupPic}>
              <img
                src="https://res.cloudinary.com/dztycn4or/image/upload/v1681885983/smartphone_oojydl.png"
                alt="topup-pic"
              />
            </div>
          </div>
          <div className={styles.topupCalculator}>
            <div className={styles.topupInput}>
              <form action="" method="POST">
                <div>
                  <span className={styles.amountYouWant} >
                    The amount you want in your&nbsp;
                    <span className={styles.textHighlighted}>PayPal</span>
                    &nbsp;account:
                  </span>
                  <div className={styles.topupInputContainer}>
                    <div className={styles.inputSelect}>
                      <input type="number" name="" id="" />
                      <select name="" id="">
                        <option value="" selected>
                          USD
                        </option>
                        <option value="">YEN</option>
                        <option value="">GBP</option>
                      </select>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button className={styles.calculateBtn}>Calculate</button>
                    </div>
                  </div>
                  <div className={styles.fineprint}>
                    FX Rate:
                    <strong>1 USD = 138.95 KES</strong>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className={styles.arrow}>
              <img
                src="https://res.cloudinary.com/dztycn4or/image/upload/v1681928507/arrow-right_r6u4tj.png"
                alt="arrow-right"
              />
            </div> */}
            <div className={styles.topupfundsOutput}>
              <p>
                The amount you need to transfer from your{" "}
                <span className={styles.textHighlighted}>M-PESA</span>
              </p>
              <h3>0 KES</h3>
              <span>
                An additional M-PESA{" "}
                <span className={styles.textHighlighted}>
                  customer to business paybill charge{" "}
                </span>
                will apply
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopUp;
