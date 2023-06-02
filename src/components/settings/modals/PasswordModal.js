import React from "react";
import styles from "./PasswordModal.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const formValidationSchema = Yup.object().shape({
currentPassword: Yup.string().required("Please enter your current password"),
newPassword: Yup.string().required("Please enter a new password"),
confirmNewPassword: Yup.string().required("Please confirm your new password"),
});

const changePasswordInitials = {
currentPassword: "",
newPassword: "",
confirmNewPassword: "",
};

function PasswordModal({ isVisible, onClose }) {
if (!isVisible) {
return null;
}

return (
<div className={styles.modal}>
<div className={styles["modal-content"]}>
<div className={styles.closeContainer}>
<button className={styles.close} onClick={onClose}>
×
</button>
</div>
<div className={styles.password}>
<p className={styles.passwordHeader}>Change your password</p>
<Formik
initialValues={changePasswordInitials}
validationSchema={formValidationSchema}
// onSubmit={}
>
{({ errors, touched }) => (
<Form>
<div className={styles.currentPassword1}>
<p className={styles.currentPasswordP}>
Confirm your current password
</p>
<div className={styles.currentPasswordDiv}>
<Field
  name="currentPassword"
  type="password"
  placeholder="Current password"
  className={`${styles.passwordField} ${errors.currentPassword && touched.currentPassword ? styles.error : ""}`}
/>

<div className={styles.errorContainer}>
<ErrorMessage
                     name="currentPassword"
                     component="p"
                     className={styles.passwordError}
                   />
</div>
</div>
</div>
<div className={styles.secureAccount}>
              <p className={styles.currentPasswordP}>
                Enter your new password (Keep your account more secure.
                Don't use your name.)
              </p>
              <div className={styles.changePassword}>
                <div className={styles.changePassword1}>
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="New password"
                    className={`${styles.passwordField} ${
                      errors.newPassword && touched.newPassword
                        ? styles.error
                        : ""
                    }`}
                  />
                  <div className={styles.errorContainer}>
                    <ErrorMessage
                      name="newPassword"
                      component="p"
                      className={styles.passwordError}
                    />
                  </div>
                </div>
                <div className={styles.changePassword2}>
                  <Field
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className={`${styles.passwordField} ${
                      errors.confirmNewPassword &&
                      touched.confirmNewPassword
                        ? styles.error
                        : ""
                    }`}
                  />
                  <div className={styles.errorContainer}>
                    <ErrorMessage
                      name="confirmNewPassword"
                      component="p"
                      className={styles.passwordError}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className={styles.btn}>
              <span className={styles.btnT}>Change Password</span>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
</div>
);
}

export default PasswordModal;