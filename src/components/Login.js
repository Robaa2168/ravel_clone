import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
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
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, logout } = useUser();

  useEffect(() => {
    logout();
  }, [logout]);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!navigator.onLine) {
      showToast("warning", "No internet connection");
      return;
    }

    let type = "email";
    let credentials = {};
    
    if (identifier.includes("@")) {
      credentials = { email: identifier, password };
    } else {
      type = "phone";
      credentials = { phoneNumber: formatPhoneNumber(identifier), password };
    }

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
              contact: identifier,
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
    <div className="body d-flex p-0 ">
        <div className="container-xxl">
            <div className="row g-3 justify-content-center">
                <div className="col-lg-4 mx-auto offset-lg-4 d-flex justify-content-center align-items-center auth-h100">
                    <div className="d-flex flex-column">
                        <ToastContainer />
                        <span className="text-muted">Welcome back! Log In with your Email or Phone number</span>
                        <span className="text-muted">Don't have an account? <Link to="/signup" title="#" className="text-primary text-decoration-underline">Register now</Link> </span>

                        <div className="card mt-4">
                            <div className="card-body ">
                                <form onSubmit={(event) => handleLogin(event)}>
                                    <div className="mb-3">
                                        <label className="form-label fs-6">Email or Phone number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
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

                        <Link to="/forgot" title="#" className="text-primary text-decoration-underline mt-4">Forgot password?</Link>
                    </div>
                </div>
            </div> {/* End Row */}
        </div>
    </div>
);
 }

export default Login;
