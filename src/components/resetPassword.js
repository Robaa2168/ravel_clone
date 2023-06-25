import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import '../App.css';
import { showToast } from "../utils/showToast";

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const contact = location.state?.contact;

    useEffect(() => {
        if ((!contact || contact === "")) {
            navigate("/forgot-password");
        }
    }, [contact, navigate]);

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordInputChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
      
        if (!navigator.onLine) {
          showToast("warning", "No internet connection");
          return;
        }
      
        const formData = { password, contact };
      
        try {
          const response = await api.post("/api/resetPassword", formData);
      
          if (response.status === 200) {
            showToast("success", "Password updated successfully.");
      
            // Delay navigation to the login page
            setTimeout(() => {
              navigate("/login");
            }, 2000); // Adjust the delay duration (in milliseconds) as needed
          } else {
            const errorMessage = response.data.message || "Password update failed";
            showToast("error", errorMessage);
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            showToast("error", error.response.data.message);
          } else {
            showToast("error", "Error updating password. Check your Internet connection");
            console.error("Error on update: ", error);
          }
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <div className="body d-flex p-0">
            <div className="container-xxl">
                <div className="row g-3 justify-content-center">
                    <div className="col-lg-4 mx-auto offset-lg-4  justify-content-center align-items-center auth-h100">
                        <div className="d-flex flex-column">
                            <ToastContainer />

                            <div className="card mt-4">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fs-6 d-block">New Password *</label>
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
                                        <button type="submit" className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2" disabled={loading}>
                                            {loading ? (
                                                <div className="spinner-border text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                "Reset Password"
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

export default ResetPassword;
