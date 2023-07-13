import React, { useState } from "react";
import styles from "./LoginAndSecurity.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function LoginAndSecurity() {
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
      <p className={styles.commonQP}>Login & Security</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Password & Login Issues</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                I forgot my password. How do I reset it?
              </Link>
              <Link className={styles.questionLinks}>
                How do I change my password and security questions?
              </Link>
              <Link className={styles.questionLinks}>
                What is 2-step verification and how do I turn it on or off?
              </Link>
              <Link className={styles.questionLinks}>
                What can I do if I've changed my mobile number and can't log in?
              </Link>

              <Link className={styles.questionLinks}>
                Why can't I view my password?
              </Link>
              <Link className={styles.questionLinks}>
                How do I reset my password if I forgot my email address?
              </Link>
              <Link className={styles.questionLinks}>
                How do I log in to my Ravel app using a PIN?
              </Link>
              <Link className={styles.questionLinks}>
                Can I log in to my Ravel account if I have a new email address?
              </Link>
              <Link className={styles.questionLinks}>
                Tips for creating a secure password
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
            <p className={styles.containerP}>Fraudulent Emails & Scams</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I spot a fake, fraudulent, or phishing Ravel email or
                website?
              </Link>
              <Link className={styles.questionLinks}>
                How do I report potential fraud, spoof or unauthorized
                transactions to Ravel?
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
            <p className={styles.containerP}>Security</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I manage my personal data and privacy settings on my
                Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                What is Ravel's approach to privacy and the Privacy Statement?
              </Link>
              <Link className={styles.questionLinks}>
                How long does Ravel retain my data and can I request to erase
                it?
              </Link>
              <Link className={styles.questionLinks}>
                How can I correct my personal data?
              </Link>

              <Link className={styles.questionLinks}>
                How can I access my personal data?
              </Link>
              <Link className={styles.questionLinks}>Is Ravel safe?</Link>
              <Link className={styles.questionLinks}>
                What if I don't want Ravel to process my personal data?
              </Link>
              <Link className={styles.questionLinks}>
                How does Ravel store my data and keep my data secure?
              </Link>
              <Link className={styles.questionLinks}>
                Does Ravel transfer data across national borders?
              </Link>
              <Link className={styles.questionLinks}>
                How does Ravel treat personal data?
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

export default LoginAndSecurity;
