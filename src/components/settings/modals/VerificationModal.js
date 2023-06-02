import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./VerificationModal.module.css";

const initialValues = {
  verificationMethod: "",
};

const validationSchema = Yup.object({
  verificationMethod: Yup.string().required(""),
});

function VerificationModal({ isVisible, onClose }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal1}>
      <div className={styles["modal-content1"]}>
        <div className={styles.closeContainer1}>
          <button className={styles.close1} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.password1}>
          <p className={styles.passwordHeader1}>
            Protect your account with 2-step verification
          </p>
          <p className={styles.addition}>
            Each time you log in, you'll use a one-time code in addition to your
            password. Choose how you'll get your code.
          </p>
          <p className={styles.app}>Need an authenticator app?</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className={styles["radio-options"]}>
                  <label>
                    <Field type="radio" name="verificationMethod" value="app" />
                    Use an authenticator app
                  </label>
                  <label>
                    <Field type="radio" name="verificationMethod" value="key" />
                    Use a security key
                  </label>
                  {errors.verificationMethod && touched.verificationMethod ? (
                    <div className={styles.error}>{errors.verificationMethod}</div>
                  ) : null}
                </div>
                <button type="submit" className={styles.btn1}>
                  <span className={styles.btnT1}>Set It Up</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default VerificationModal;
