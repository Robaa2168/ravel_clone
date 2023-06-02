import React from "react";
import styles from "./AutoLoginModal.module.css";

function AutoLoginModal({ isVisible, onClose }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal2}>
      <div className={styles.modalContent2}>
        <div className={styles.closeContainer2}>
          <button className={styles.close2} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.password2}>
          <p className={styles.passwordHeader2}>
            Manage auto login, including OneTouch™
          </p>
          <p className={styles.addition1}>Auto login is turned off for all devices</p>
          <button type="submit" className={styles.btn2}>
            <span className={styles.btnT2}>Enable</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AutoLoginModal;