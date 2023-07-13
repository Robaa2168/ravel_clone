import React, { useState } from "react";
import styles from "./DisputesAndLimitations.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function DisputesAndLimitations() {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleToggle1() {
    setToggle1(!toggle1);
  }

  function handleToggle2() {
    setToggle2(!toggle2);
  }

  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Disputes and Limitations</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Disputes and Claims</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I return an item to the seller?
              </Link>
              <Link className={styles.questionLinks}>
                What should I do if I didn't receive all my items or if one or more were late?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle1 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle1}
          >
            <p className={styles.containerP}>Account Limitations</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I remove a limitation from my account?
              </Link>
              <Link className={styles.questionLinks}>
                Why is my Ravel account limited?
              </Link>
              <Link className={styles.questionLinks}>
                How long will it take to lift my Ravel account limitation?
              </Link>
              <Link className={styles.questionLinks}>
                What kind of documentation can I provide to remove my account limitation?
              </Link>

              <Link className={styles.questionLinks}>
                What should I do if my account becomes limited because I did not provide the requested FATCA information?
              </Link>
              <Link className={styles.questionLinks}>
               Error message during upload? Here's what it means
              </Link>
              <Link className={styles.questionLinks}>
                What is a beneficial owner and why do I need to provide this information?
              </Link>
              <Link className={styles.questionLinks}>
                Why is Ravel requesting information about my business?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle2 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle2}
          >
            <p className={styles.containerP}>Unauthorized Transactions</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I report an unauthorized transaction or account activity?
              </Link>
              <Link className={styles.questionLinks}>
               How do I spot a fake, fraudulent, or phishing Ravel email or website?
              </Link>
              <Link className={styles.questionLinks}>
                How do I report potential fraud, spoof or unauthorized transactions to Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                What should I do if I think there has been unauthorized access to my Ravel data?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisputesAndLimitations;
