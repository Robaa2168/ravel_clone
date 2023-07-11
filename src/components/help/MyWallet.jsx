import React from "react";
import styles from "./MyWallet.module.css";
import { MdExpandMore } from "react-icons/md";

function MyWallet() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>My Wallet</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Bank Accounts</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Credit and Debit Cards</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Balance and Currencies</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Store Offers, Coupons, & Gift Cards</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
