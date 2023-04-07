import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,Link } from "react-router-dom";
import { showToast } from "../utils/showToast";
import { useUser } from "./context";
import api from '../api';

const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("254")) {
    return phoneNumber;
  } else if (phoneNumber.startsWith("0")) {
    return `254${phoneNumber.slice(1)}`;
  } else if (phoneNumber.startsWith("7") || phoneNumber.startsWith("1")) {
    return `254${phoneNumber}`;
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (event, type) => {
    event.preventDefault();
  
    const credentials =
      type === "email"
        ? { email, password }
        : { phoneNumber: formatPhoneNumber(phoneNumber), password };
  
    try {
      const response = await api.fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.isVerified) {
          if (data.hasCompletedKYC) {
            showToast("success", "Logged in successfully");
            login({
              email: data.email,
              phoneNumber: data.phoneNumber,
              isVerified: data.isVerified,
              userId: data.userId,
              userInfo: data.userInfo, // Assuming userInfo contains the user's KYC information
              accounts: data.accounts, // Assuming accounts contains the user's account information
            });
            localStorage.setItem("user", JSON.stringify(data)); // Save user data to localStorage
            navigate("/home");
          } else {
            showToast("warning", "Please complete the KYC process");
            navigate("/KYC", { state: { userId: data.userId } });
          }
        } else {
          showToast("warning", "User not verified");
          navigate("/verify", {
            state: {
              mode: type,
              contact: type === "email" ? email : formatPhoneNumber(phoneNumber),
              userId: data.userId, // Add the userId to the state
            },
          });
        }
      } else {
        showToast("error", data.message);
      }
    } catch (error) {
      showToast("error", "Error on login");
    }
  };
  
  return (
    <div className="body d-flex p-0 p-xl-5">
      <div className="container-xxl">
        <div className="row g-3">
          <div className="col-lg-6 d-flex justify-content-center align-items-center auth-h100">
            <div className="d-flex flex-column">
              <ToastContainer />
              <span className="text-muted">Welcome back! Log In with your Email, Phone number or QR code</span>
              <ul className="nav nav-pills mt-4" role="tablist">
              <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#Mobile" role="tab">Mobile</a></li>
             
                <li className="nav-item"><a className="nav-link " data-bs-toggle="tab" href="#Email" role="tab">Email</a></li>
              </ul>
              <div className="tab-content mt-4 mb-3">
                <div className="tab-pane fade show active" id="Mobile">
                  <div className="card">
                    <div className="card-body p-4">
                    <form>
                        <label className="form-label fs-6">Mobile</label>
                        <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">+254</button>
                      
                          <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fs-6">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                          onClick={(event) => handleLogin(event, "phone")}
                        >
                          Log in
                        </button></form>
                     
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="Email">
                  <div className="card">
                    <div className="card-body p-4">
                    <form>
                        <div className="mb-3">
                          <label className="form-label fs-6">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fs-6">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary text-uppercase py-2 fs-5 w-100 mt-2"
                          onClick={(event) => handleLogin(event, "email")}
                        >
                          Log in
                        </button></form>
                     


                    </div>
                  </div>
                </div>
              </div>
              <Link to="/forgot" title="#" className="text-primary text-decoration-underline">Forgot password?</Link>
<Link to="/signup" title="#" className="text-primary text-decoration-underline">Register now</Link></div>
          </div>
          <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center auth-h100">
            <div className="qr-block text-center">
              <img src="../assets/images/qr-code.png" alt="#" className="img-fluid my-4" />
              <h4>Log in with QR code</h4>
              <p>Scan this code to log in instantly.</p>
            </div>
          </div>
        </div> {/* End Row */}
      </div>
    </div>
  );
}

export default Login;
