import React from "react";
import styles from "./DisputesAndLimitations.module.css";
import { MdExpandMore } from "react-icons/md";

function DisputesAndLimitations() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Disputes and Limitations</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Disputes and Claims</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Account Limitations</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Unauthorized Transactions</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisputesAndLimitations;
