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
                Why is the payment I sent pending or unclaimed? Can I cancel it?
              </Link>
              <Link className={styles.questionLinks}>
                What is an automatic payment and how do I update or cancel one?
              </Link>
              <Link className={styles.questionLinks}>
                I want my money back. Cancel I cancel a payment?
              </Link>
              <Link className={styles.questionLinks}>
                What's an "authorization" and can I cancel it?
              </Link>

              <Link className={styles.questionLinks}>
                Can I cancel a withdrawal from my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel a money transfer from my bank account to my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What's an Order and why is it pending?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel an eCheck payment?
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
                Why is the payment I sent pending or unclaimed? Can I cancel it?
              </Link>
              <Link className={styles.questionLinks}>
                What is an automatic payment and how do I update or cancel one?
              </Link>
              <Link className={styles.questionLinks}>
                I want my money back. Cancel I cancel a payment?
              </Link>
              <Link className={styles.questionLinks}>
                What's an "authorization" and can I cancel it?
              </Link>

              <Link className={styles.questionLinks}>
                Can I cancel a withdrawal from my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel a money transfer from my bank account to my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What's an Order and why is it pending?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel an eCheck payment?
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
                Why is the payment I sent pending or unclaimed? Can I cancel it?
              </Link>
              <Link className={styles.questionLinks}>
                What is an automatic payment and how do I update or cancel one?
              </Link>
              <Link className={styles.questionLinks}>
                I want my money back. Cancel I cancel a payment?
              </Link>
              <Link className={styles.questionLinks}>
                What's an "authorization" and can I cancel it?
              </Link>

              <Link className={styles.questionLinks}>
                Can I cancel a withdrawal from my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel a money transfer from my bank account to my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What's an Order and why is it pending?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel an eCheck payment?
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
