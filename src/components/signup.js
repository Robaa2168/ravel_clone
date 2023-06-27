import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import '../App.css';
import { showToast } from "../utils/showToast";

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("+")) {
    return phoneNumber.slice(1);
  }
  else if (phoneNumber.startsWith("254")) {
    return phoneNumber;
  } else if (phoneNumber.startsWith("0")) {
    return `254${phoneNumber.slice(1)}`;
  } else if (phoneNumber.startsWith("7") || phoneNumber.startsWith("1")) {
    return `254${phoneNumber}`;
  }
};


function Signup() {
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralId, setReferralId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralField, setShowReferralField] = useState(false);
  const navigate = useNavigate();

  const handleIdentifierInputChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordInputChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleReferralIdInputChange = (e) => {
    setReferralId(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleReferralClick = () => {
    setShowReferralField(!showReferralField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!navigator.onLine) {
      showToast("warning", "No internet connection");
      return;
    }

    let isEmail = identifier.includes("@");
    let formattedIdentifier = identifier;

    if (!isEmail) {
      formattedIdentifier = formatPhoneNumber(identifier);
    }

    const formData = isEmail
      ? { email: identifier, password, referralId }
      : { phoneNumber: formattedIdentifier, password, referralId };
    const route = isEmail ? "/api/signup" : "/api/signupWithMobile";

    try {
      const response = await api.post(route, formData);

      if (response.status === 200) {
        showToast('success', "User registered successfully. Sending verification code...");

        const verificationType = isEmail ? "email" : "phoneNumber";
        const contact = formattedIdentifier;

        const resendResponse = await api.post("/api/verification", {
          [verificationType]: contact
        });

        if (resendResponse.status === 200) {
          showToast('success', "Verification code sent successfully!");
        } else {
          const errorMessage = resendResponse.data.message || "Error sending verification code";
          showToast('error', errorMessage);
        }

        navigate("/verify", {
          state: {
            mode: verificationType,
            contact: contact,
          },
        });

      } else {
        const errorMessage = response.data.message || "Registration failed";
        showToast('error', errorMessage);
      }

    }
    catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Error on Registration check your Internet");
        console.error("Error on login: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body d-flex p-0 bg-light">
      <div className="container-xxl my-auto">
        <div className="row g-3 justify-content-center">
          <div className="col-lg-4 mx-auto auth-h100">
            <div className="d-flex flex-column align-items-center text-center">
              <ToastContainer />
              <span className="text-muted fs-5">Register with your Email address or Mobile number</span>
              <span className="text-muted fs-6 mb-4">Already have an account? <Link to="/login" title="login" className="text-primary fw-bold">Log In</Link></span>
              <div className="card shadow mt-4 p-4">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fs-6">Email or Mobile number *</label>
                      <input type="text" className="form-control" value={identifier} onChange={handleIdentifierInputChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fs-6 d-block">Password *</label>
                      <div className="input-group mb-3">
                        <input type={showPassword ? 'text' : 'password'} className="form-control" value={password} onChange={handlePasswordInputChange} required />
                        <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
                          {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                        </button>
                      </div>
                    </div>

                    <div className={`mb-3 ${password !== confirmPassword && confirmPassword !== '' ? 'has-error' : ''}`}>
                      <label className="form-label fs-6">Confirm Password *</label>
                      <input type="password" className="form-control" value={confirmPassword} onChange={handleConfirmPasswordInputChange} required />
                      {password !== confirmPassword && confirmPassword !== '' && (
                        <div className="invalid-feedback">Passwords do not match.</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <button type="button" className="btn btn-link p-0 m-0" onClick={handleReferralClick}>
                        {showReferralField ? 'Hide Referral' : 'Have a Referral?'}
                      </button>
                      {showReferralField && (
                        <input type="text" className="form-control mt-2" value={referralId} onChange={handleReferralIdInputChange} placeholder="Referral ID" />
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2" disabled={loading}>
                      {loading ? (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
