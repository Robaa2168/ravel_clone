import React from "react";
import styles from "./More.module.css";
import { RiBookletLine } from "react-icons/ri";

function More() {
  return (
    <div className={styles["send-money4"]}>
      <RiBookletLine className={styles["ways-icon4"]} />
      <p className={styles["p4"]}>Create an invoice</p>
      <p className={styles["p5"]}>Customize, track, and send invoices.</p>
      <button id="btn4">Get Started</button>
    </div>
  );
}

export default More;
