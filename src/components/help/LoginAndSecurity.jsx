import React from "react";
import styles from "./LoginAndSecurity.module.css";
import { MdExpandMore } from "react-icons/md";

function LoginAndSecurity() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Login & Security</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Password & Login Issues</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Fraudulent Emails & Scams</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Security</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAndSecurity;
