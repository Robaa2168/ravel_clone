import React from "react";
import { Link } from "react-router-dom";
import styles from "./HelpHome.module.css";

function HelpHome() {
  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Common Questions</p>
      <div className={styles.questions}>
        <Link className={styles.questionLinks}>How do I issue a refund?</Link>
        <Link className={styles.questionLinks}>
          How do I change my password and security questions?
        </Link>
        <Link className={styles.questionLinks}>
          How do I escalate a Ravel dispute to a claim?
        </Link>
        <Link className={styles.questionLinks}>
          Why is the payment I sent pending or unclaimed? Can I cancel it?
        </Link>
        <Link className={styles.questionLinks}>
          How do I release my payment(s) on hold?
        </Link>
        <Link className={styles.questionLinks}>
          How do I add and confirm, change or remove a phone number on my Ravel
          account?
        </Link>
        <Link className={styles.questionLinks}>
          How do I remove a limitation from my account?
        </Link>
        <Link className={styles.questionLinks}>
          How do I add money to my Ravel account from my bank?
        </Link>
        <Link className={styles.questionLinks}>
          I forgot my password. How do I reset it?
        </Link>
        <Link className={styles.questionLinks}>
          How do I open a dispute with a seller?
        </Link>
      </div>
    </div>
  );
}

export default HelpHome;
