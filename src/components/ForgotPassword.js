import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from '../api';
import '../App.css';
import { showToast } from "../utils/showToast";
import { useNavigate, Link } from "react-router-dom";

const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("+")) {
        return phoneNumber.slice(1);
    } else if (phoneNumber.startsWith("254")) {
        return phoneNumber;
    } else if (phoneNumber.startsWith("0")) {
        return `254${phoneNumber.slice(1)}`;
    } else if (phoneNumber.startsWith("7") || phoneNumber.startsWith("1")) {
        return `254${phoneNumber}`;
    }

    // Default return
    return phoneNumber; // Or whatever you deem appropriate
};


function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const navigate = useNavigate();

    const handleIdentifierInputChange = (event) => {
        setIdentifier(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!navigator.onLine) {
            showToast("warning", "No internet connection");
            return;
        }

        if (!identifier) {
            showToast("error", "Please enter an email or mobile number");
            setLoading(false);
            return;
        }

        let isEmail = identifier.includes("@");
        let formattedIdentifier = identifier;

        if (!isEmail) {
            formattedIdentifier = formatPhoneNumber(identifier);
        }

        // Check if email or phone number exists in the database
        const verificationType = isEmail ? "email" : "phone";
        const contact = formattedIdentifier;
        const verifyRoute = isEmail ? "/api/verifyEmailExistence" : "/api/verifyPhoneExistence";
        console.log({
            [verificationType === "email" ? "email" : "phoneNumber"]: contact
        });

        try {
            const verifyResponse = await api.post(verifyRoute, {
                [verificationType === "email" ? "email" : "phoneNumber"]: contact
            });

            if (verifyResponse.status === 200) {
                // Send the verification code immediately before navigating
                const codeResponse = await api.post("/api/verification", {
                    [verificationType === "email" ? "email" : "phoneNumber"]: contact
                });

                if (codeResponse.status === 200) {
                    navigate("/verify_forgot", {
                        state: {
                            mode: verificationType,
                            contact: contact,
                        },
                    });
                } else {
                    showToast("error", "Error resending verification code");
                }
            } else {
                showToast('error', "Email or phone number does not exist.");
            }

            // Reset the form
            setIdentifier("");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                showToast("error", error.response.data.message);
            } else {
                showToast("error", "Error checking email or phone number existence. Please check your internet connection.");
                console.error("Error on password recovery: ", error);
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="body d-flex p-0">
          <div className="container-xxl">
            <div className="row g-3 justify-content-center">
              <div className="col-lg-4 mx-auto offset-lg-3 justify-content-center align-items-center auth-h100">
                <div className="d-flex flex-column">
                  <ToastContainer />
    
                  <div className="card mt-4">
                    <div className="card-body">
                      <form onSubmit={handleSubmit} className="mb-2">
                        <div className="mb-3">
                          <label htmlFor="identifier" className="form-label fs-6">Email or Mobile number *</label>
                          <input type="text" id="identifier" className="form-control" value={identifier} onChange={handleIdentifierInputChange} required />
                        </div>
    
                        <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2" disabled={loading}>
                          {loading ? (
                            <div className="spinner-border text-light" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            "Recover Password"
                          )}
                        </button>
                      </form>
    
                      <Link to="/login" title="Login" className="text-primary text-decoration-underline mt-4">Go to login?</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default ForgotPassword;
