import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import Confetti from "react-confetti";


function Verification() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const { mode = "email", contact = "" } = location.state || {};
  const verificationType = mode === "email" ? "email" : "phone";

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    if ((!contact || contact === "") || (verificationType !== "email" && verificationType !== "phone")) {
      navigate("/login");
    }
  }, [contact, navigate, verificationType]);


  const showToast = (type, message) => {
    toast[type](message);
  };


  useEffect(() => {
    if (verificationCode.every((digit) => digit !== "")) {
      handleVerificationSubmit();
    }
  }, [verificationCode]);
  

  
  const handleVerificationSubmit = async (event) => {
    if (event) event.preventDefault();
    const enteredCode = verificationCode.join("");
    setLoading(true);
    try {
      const response = await api.post("/api/verify", {
        type: verificationType,
        contact,
        otp: enteredCode
      });
      const data = response.data;

      if (response.status === 200) { // Check for success status code
        showToast("success", "Verification successful");
        setShowConfetti(true);
        setTimeout(() => {
          // Redirect user to the login page after successful verification
          navigate("/login");
        }, 5000); // Duration of confetti effect, e.g., 3 seconds
      } else {
        // Handle error response from server
        const errorMessage = data.message || "Verification failed";
        showToast("error", errorMessage);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Error during verification");
        console.error("Error during verification: ", error);
      }
    }
    finally {
      setLoading(false); // Set loading state to false
    }
  };


  const handleResendCode = async (event) => {
    event.preventDefault();

    if (resendTimeout > 0) {
      showToast("warning", "Please wait before resending the code.");
      return;
    }

    try {
      const response = await api.post("/api/verification", {
        [verificationType === "email" ? "email" : "phoneNumber"]: contact
      });
      const data = response.data;

      if (response.status === 200) { // Check for success status code
        showToast("success", "Verification code has been resent");
        setResendTimeout(60);
      } else {
        // Handle error response from server
        const errorMessage = data.message || "Error resending verification code";
        showToast("error", errorMessage);
      }
    } catch (error) {
      showToast("error", "Error resending verification code");
      console.error("Error resending verification code: ", error);
    }
  };


  useEffect(() => {
    if (resendTimeout > 0) {
      const timer = setTimeout(() => {
        setResendTimeout(resendTimeout - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimeout]);

  return (
    <div className="d-flex justify-content-center align-items-center auth-h100">
      {showConfetti && <Confetti />}
      <ToastContainer />
      <div className="d-flex flex-column text-center">
        <h1>Verification</h1>
        <span className="text-muted">
          We sent a verification code to your{" "}
          {verificationType === "email" ? "email" : "phone"}. <br />
          Enter the code in the field below.
        </span>
        <div
          className="card mt-4 mb-3"
          style={{ maxWidth: "30rem", margin: "auto" }}
        >
          <div className="card-body p-4">
            <form
              onSubmit={handleVerificationSubmit}
              className="row g-1"
            >
              {verificationCode.map((digit, index) => (
                <div className="col">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control form-control-lg text-center"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="1"
                      placeholder="-"
                      value={digit}
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]$/)) {
                          const newVerificationCode = [...verificationCode];
                          newVerificationCode[index] = e.target.value;
                          setVerificationCode(newVerificationCode);
                        } else {
                          const newVerificationCode = [...verificationCode];
                          newVerificationCode[index] = "";
                          setVerificationCode(newVerificationCode);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          e.preventDefault();
                          setVerificationCode((prevState) => {
                            const newVerificationCode = [...prevState];
                            newVerificationCode[index] = "";
                            return newVerificationCode;
                          });
                          if (index > 0) {
                            e.target.parentElement.parentElement.previousElementSibling.firstChild.firstChild.focus();
                          }

                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.length === 1 && index < verificationCode.length - 1) {
                          e.target.parentElement.parentElement.nextElementSibling.firstChild.firstChild.focus();
                        } else if (e.target.value.length === 1 && index === verificationCode.length - 1) {
                          setVerificationCode((prevState) => {
                            const newVerificationCode = [...prevState];
                            newVerificationCode[index] = e.target.value;
                            return newVerificationCode;
                          });
                        }
                      }}
                      
                      
                      
                    />

                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="btn btn-primary text-uppercase py-2 fs-5 w-100"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Verify my account"
                )}
              </button>
            </form>
            <a
              href="#"
              title="#"
              className="text-primary text-decoration-underline"
              role="button"
              onClick={handleResendCode}
            >
              {resendTimeout > 0 ? `Resend again in ${resendTimeout}s` : "Resend a new code"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
