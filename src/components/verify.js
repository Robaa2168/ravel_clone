import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';


function Verification() {
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

    const handleVerificationSubmit = async (event) => {
        event.preventDefault();
        const enteredCode = verificationCode.join("");
      
        try {
          const response = await api.fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: verificationType, contact, otp: enteredCode }),
          });
          const data = await response.json();
      
          if (response.ok) {
            showToast("success", "Verification successful");
            // Redirect user to the KYC page after successful verification
            navigate("/login");
          } else {
            showToast("error", data.message);
          }
        } catch (error) {
          showToast("error", "Error during verification");
        }
      };


    const handleResendCode = async (event) => {
        event.preventDefault();
        // Implement the logic to resend the OTP code with a 60s timeout

        try {
            const response = await api.fetch("/api/verification", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [verificationType === "email" ? "email" : "phoneNumber"]: contact }),

            });
            const data = await response.json();

            if (response.ok) {
                showToast("success", "Verification code has been resent");
                // Add a 60s timeout before allowing another resend
                setTimeout(() => {
                    // Enable the resend button
                }, 60000);
            } else {
                showToast("error", data.message);
            }
        } catch (error) {
            showToast("error", "Error resending verification code");
        }
    };

    return (

        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
            <ToastContainer />
            <div className="d-flex flex-column">

                <h1>Verification</h1>
                <span className="text-muted">We sent a verification code to your{" "}
                    {verificationType === "email" ? "email" : "phone"}. <br />Enter the code from the field below.</span>
                <div className="card mt-4 mb-3" style={{ maxWidth: '30rem' }}>
                    <div className="card-body p-4">
                        <form onSubmit={handleVerificationSubmit} className="row g-1" >
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

                                                }
                                            }}
                                            required
                                        />

                                    </div>
                                </div>


                            ))}
                            <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100" >Verify my account</button>
                        </form>
                        <a
                            href="#"
                            title="#"
                            className="text-primary text-decoration-underline"
                            role="button"
                            onClick={handleResendCode}
                        >
                            Resend a new code?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verification;

