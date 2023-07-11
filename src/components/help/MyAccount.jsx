import React from "react";
import styles from "./MyAccount.module.css";
import { MdExpandMore } from "react-icons/md";

function MyAccount() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>My Account</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Profile and Settings</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Account Status</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Ravel Basics</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Policies</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Notifications</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Nonprofits and Donations</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Tax Information</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
