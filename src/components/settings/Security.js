import React, { useState } from "react";
import styles from "./Security.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import PasswordModal from "./modals/PasswordModal";
import VerificationModal from "./modals/VerificationModal";
import AutoLoginModal from "./modals/AutoLoginModal";
import QuestionsModal from "./modals/QuestionsModal";

function Security() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function toggleModal1() {
    setModalVisible1(!modalVisible1);
  }

  function toggleModal2() {
    setModalVisible2(!modalVisible2);
  }

  function toggleModal3() {
    setModalVisible3(!modalVisible3);
  }

  return (
    <div className={styles.container}>
      <Link to="" className={styles.main1} onClick={toggleModal}>
        <div className={styles.main2}>
          <p className={styles.headers}>Password</p>
          <p className={styles.create}>Create or update your password.</p>
        </div>
        <Link className={styles.update}>
          <span className={styles["update-text"]}>Update</span>
          <FontAwesomeIcon className={styles["update-icon"]} icon={faEdit} />
        </Link>
      </Link>

      <Link className={styles.main1} onClick={toggleModal1}>
        <div className={styles.main2}>
          <p className={styles.headers}>2-step verification</p>
          <p className={styles.create}>
            Add an extra layer of security to your account by using a one-time
            security code in addition to your password each time you log in.
          </p>
        </div>
        <Link className={styles.update}>
          <span className={styles["update-text"]}>Set Up</span>
          <FontAwesomeIcon className={styles["update-icon"]} icon={faEdit} />
        </Link>
      </Link>

      <Link className={styles.main1} onClick={toggleModal2}>
        <div className={styles.main2}>
          <p className={styles.headers}>Auto login</p>
          <p className={styles.create}>
            Checkout faster without having to log in every time. Manage auto
            login on your browsers and devices, including One Touch™
          </p>
        </div>
        <Link className={styles.update}>
          <span className={styles["update-text"]}>Update</span>
          <FontAwesomeIcon className={styles["update-icon"]} icon={faEdit} />
        </Link>
      </Link>

      <Link className={styles.main1} onClick={toggleModal3}>
        <div className={styles.main2}>
          <p className={styles.headers}>Security questions</p>
          <p className={styles.create}>
            For your protection, please choose 2 security questions. This way,
            we can verify it's really you if there's ever a doubt.
          </p>
        </div>
        <Link className={styles.update}>
          <span className={styles["update-text"]}>Create</span>
          <FontAwesomeIcon className={styles["update-icon"]} icon={faEdit} />
        </Link>
      </Link>

      <PasswordModal isVisible={modalVisible} onClose={toggleModal} />
      <VerificationModal isVisible={modalVisible1} onClose={toggleModal1} />
      <AutoLoginModal isVisible={modalVisible2} onClose={toggleModal2} />
      <QuestionsModal isVisible={modalVisible3} onClose={toggleModal3} />
    </div>
  );
}

export default Security;
