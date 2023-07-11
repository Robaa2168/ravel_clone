import React from "react";
import styles from "./SellerTools.module.css";
import { MdExpandMore } from "react-icons/md";

function SellerTools() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Seller Tools</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Shipping</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Invoicing</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Ravel Business Debit Mastercard</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>
              Website, Buttons & Developer Tools
            </p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
        <div className={styles.myContainerDivs}>
          <div className={styles.myContainerDiv}>
            <p className={styles.containerP}>Seller Profiles</p>
            <MdExpandMore className={styles.containerIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerTools;
