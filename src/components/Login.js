import React, { useState,useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logout } = useUser(); 

  useEffect(() => {
    logout();
  }, [logout]);

  const handleLogin = async (event, type) => {
    event.preventDefault();
  
    if (!navigator.onLine) {
      showToast("warning", "No internet connection");
      return;
    }
  
    const credentials =
      type === "email"
        ? { email, password }
        : { phoneNumber: formatPhoneNumber(phoneNumber), password };
    setLoading(true);
    try {
      const response = await api.post("/api/login", credentials);
      const data = response.data;
  
      if (response.status === 200) {
        logout();
        if (data.isVerified) {
          if (data.hasCompletedKYC) {
            showToast("success", "Logged in successfully");
            login({
              email: data.primaryInfo.email,
              phoneNumber: data.primaryInfo.phoneNumber,
              isVerified: data.isVerified,
              userId: data.userId,
              payID: data.primaryInfo.payID,
              userInfo: data.userInfo,
              accounts: data.accounts,
              token: data.token,
              primaryInfo: data.primaryInfo,
            });
  
            localStorage.setItem("user", JSON.stringify(data));
  
            // Check if the user has filled in the PIN
            if (!data.userInfo.pin) {
              navigate("/pin");
            } else {
              navigate("/home");
            }
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
              userId: data.userId,
            },
          });
        }
      } else {
        const errorMessage = data.message || "Login failed";
        if (response.status === 400 && data.errors) {
          const errorFields = Object.keys(data.errors).join(", ");
          showToast("error", `${errorMessage}: ${errorFields}`);
        } else {
          showToast("error", errorMessage);
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        showToast("error", error.response.data.message);
      } else {
        showToast("error", "Error on login, check your Internet connection");
        console.error("Error on login: ", error);
      }
    } finally {
      setLoading(false);
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
                    <form onSubmit={(event) => handleLogin(event, "phone")}>
                        <label className="form-label fs-6">Mobile</label>
                        <div className="input-group mb-3">
                          <button className="btn btn-outline-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false">+254</button>
                      
                          <input
                            type="text"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label fs-6">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
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
      "Log in"
    )}
  </button>

</form>
                     
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="Email">
                  <div className="card">
                    <div className="card-body p-4">
                    <form onSubmit={(event) => handleLogin(event, "email")}>
                        <div className="mb-3">
                          <label className="form-label fs-6">Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
    disabled={loading}
  >
    {loading ? (
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    ) : (
      "Log in"
    )}
  </button>
</form>
                     


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
