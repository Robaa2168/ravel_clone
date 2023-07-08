import React from "react";
import styles from "./More.module.css";
import { RiBookletLine } from "react-icons/ri";

function More() {
  return (
    <div className={styles.sendMoney4}>
      <RiBookletLine className={styles.waysIcon4} />
      <p className={styles.p4}>Create an invoice</p>
      <p className={styles.p5}>Customize, track, and send invoices.</p>
      <button id={styles.btn4}>Get Started</button>
    </div>
  );
}

export default More;
