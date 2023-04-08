import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { showToast } from '../utils/showToast';
import { useNavigate } from 'react-router-dom';
import api from '../api';


function Signup() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Mobile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralId, setReferralId] = useState("");
  const [phoneNumber, setMobile] = useState("");
  const [showReferralField, setShowReferralField] = useState(false);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith('254')) {
      return phoneNumber;
    } else if (phoneNumber.startsWith('0')) {
      return `254${phoneNumber.slice(1)}`;
    } else if (phoneNumber.startsWith('7') || phoneNumber.startsWith('1')) {
      return `254${phoneNumber}`;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEmailInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleReferralIdInputChange = (event) => {
    setReferralId(event.target.value);
  };

  const handleMobileInputChange = (event) => {
    setMobile(event.target.value);
  };
  const navigate = useNavigate();


 const handleSubmit = async (event) => {
  event.preventDefault();
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  const formData = activeTab === "Email"
    ? { email, password, referralId }
    : { phoneNumber: formattedPhoneNumber, password, referralId };
    setLoading(true);
  try {
    const response = await api.post(`/api/signup${activeTab === "Email" ? "" : "WithMobile"}`, formData);
    const data = response.data;

    if (response.status === 200) { // Check for success status code
      showToast('success', "User registered successfully. Sending verification code...");
      
      const verificationType = activeTab.toLowerCase();
      const contact = activeTab === "Email" ? email : formattedPhoneNumber;
      try {
        const resendResponse = await api.post("/api/verification", {
          [verificationType]: contact
        });
        const resendData = resendResponse.data;
        if (resendResponse.status === 200) { // Check for success status code
          showToast('success', "Verification code sent successfully!");
        } else {
          // Handle error response from server
          const errorMessage = resendData.message || "Error sending verification code";
          showToast('error', errorMessage);
        }
      } catch (error) {
        showToast('error', "Error sending verification code.");
      }
      
      navigate("/verify", {
        state: {
          mode: activeTab.toLowerCase(),
          contact: activeTab === "Email" ? email : formattedPhoneNumber,
        },
      });
    } else {
      // Handle error response from server
      const errorMessage = data.message || "Registration failed";
      if (response.status === 400 && data.errors) {
        const errorFields = Object.keys(data.errors).join(", ");
        showToast('error', `${errorMessage}: ${errorFields}`);
      } else {
        showToast('error', errorMessage);
      }
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      showToast("error", error.response.data.message);
    } else {
      showToast("error", "Error on Registration");
      console.error("Error on Registration: ", error);
    }
  }
  finally {
    setLoading(false); // Set loading state to false
  }
};


  const handleReferralClick = () => {
    setShowReferralField(!showReferralField);
  };


  return (
    <div className="body d-flex p-0 p-xl-5">
      <ToastContainer />
      <div className="container-xxl">
        <div className="row g-3">
        <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
  <div className="d-flex flex-column">
    <span className="text-muted">Register with your email or mobile</span>
    <ul className="nav nav-pills mt-4" role="tablist">
   
      <li className="nav-item">
        <button className={`nav-link ${activeTab === "Mobile" ? "active" : ""}`} onClick={() => handleTabChange("Mobile")} type="button">Mobile</button>
      </li>
      <li className="nav-item">
        <button className={`nav-link ${activeTab === "Email" ? "active" : ""}`} onClick={() => handleTabChange("Email")} type="button">Email</button>
      </li>
    </ul>
    <div className="tab-content mt-4 mb-3">
      <div className={`tab-pane fade show ${activeTab === "Mobile" ? "active" : ""}`} id="Mobile">
        <div className="card">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <label className="form-label fs-6">Mobile *</label>
              <div className="input-group mb-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+254</button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">+254 Kenya</a></li>
                </ul>
                <input type="text" className="form-control" value={phoneNumber} onChange={handleMobileInputChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fs-6">Password *</label>
                <input type="password" className="form-control" value={password} onChange={handlePasswordInputChange} required />
              </div>
              {showReferralField && (
                <div className="mb-3">
                  <label className="form-label fs-6">Referral ID</label>
                  <input type="text" className="form-control" value={referralId} onChange={handleReferralIdInputChange} />
                </div>
              )}
             
              <button
    type="submit"
    className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
    disabled={loading}
  >
    {loading ? (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      "Create Account"
    )}
  </button>

            
            </form>
            <div className="mt-2">
              <button className="btn btn-link p-0" onClick={handleReferralClick}>Have a referral code?</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`tab-pane fade show ${activeTab === "Email" ? "active" : ""}`} id="Email">
        <div className="card">
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fs-6">Email address *</label>
                <input type="email" className="form-control" value={email} onChange={handleEmailInputChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fs-            6">Password *</label>
            <input type="password" className="form-control" value={password} onChange={handlePasswordInputChange} required />
          </div>
          {showReferralField && (
            <div className="mb-3">
              <label className="form-label fs-6">Referral ID</label>
              <input type="text" className="form-control" value={referralId} onChange={handleReferralIdInputChange} />
            </div>
          )}
        
          <button
    type="submit"
    className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
    disabled={loading}
  >
    {loading ? (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      "Create Account"
    )}
  </button>
        
        </form>
        <div className="mt-2">
          <button className="btn btn-link p-0" onClick={handleReferralClick}>Have a referral code?</button>
        </div>
      </div>
    </div>
  </div>
</div>
<Link to="/login" title="#">Already registered? <span className="text-secondary text-decoration-underline">Log In</span></Link>
</div>
</div>

          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center auth-h100">
            <div className="qr-block text-center">
              <img src="../assets/images/qr-code.png" alt="#" className="img-fluid my-4" />
              <h4>Log in with QR code</h4>
              <p>Scan this code to log in instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

