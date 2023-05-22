import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Confetti from "react-confetti";
import { useUser } from "./context";

function CreatePIN() {
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(["", "", "", ""]);
  const { user, login } = useUser();
  const navigate = useNavigate();

  const showToast = (type, message) => {
    toast[type](message);
  };

  const handlePINSubmit = async (event) => {
    event.preventDefault();
    if (!navigator.onLine) {
      showToast("warning", "No internet connection");
      return;
    }
    const enteredPIN = pin.join("");
    setLoading(true);
    try {
      const response = await api.post("/api/createPIN", {
        userId: user.primaryInfo?._id,
        pin: enteredPIN
      });

      if (response.status === 200) {
        showToast("success", "PIN created successfully");
        // Update the context to indicate that the PIN is set
        const updatedUser = { ...user, userInfo: { ...user.userInfo, pin: enteredPIN } };
        login(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Redirect user to the desired page after successful PIN creation
        navigate("/home");
      } else {
        // Handle error response from server
        const errorMessage = response.data.message || "PIN creation failed";
        showToast("error", errorMessage);
      }
    } catch (error) {

        if (error.response && error.response.data && error.response.data.message) {
          showToast("error", error.response.data.message);
        } else {
          showToast("error", "Error during PIN creation");
          console.error("Error on form submission ", error);
        }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };



  return (
    <div className="d-flex justify-content-center align-items-center auth-h100">
      <ToastContainer />
      <div className="d-flex flex-column text-center">
        <h1>Create PIN</h1>
        <span className="text-muted">
          This PIN will be required for secure access and authorization.
        </span>
        <span className="text-muted">
          Please keep it confidential and do not share it with others.
        </span>
        <div
          className="card mt-4 mb-3"
          style={{ maxWidth: "30rem", margin: "auto" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handlePINSubmit} className="row g-1">
              {pin.map((digit, index) => (
                <div className="col" key={index}>
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
                          const newPin = [...pin];
                          newPin[index] = e.target.value;
                          setPin(newPin);
                        } else {
                          const newPin = [...pin];
                          newPin[index] = "";
                          setPin(newPin);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          e.preventDefault();
                          setPin((prevState) => {
                            const newPin = [...prevState];
                            newPin[index] = "";
                            return newPin;
                          });
                          if (index > 0) {
                            e.target.parentElement.parentElement.previousElementSibling.firstChild.firstChild.focus();
                          }
                        }
                      }}
                      onInput={(e) => {
                        if (e.target.value.length === 1 && index < pin.length - 1) {
                          e.target.parentElement.parentElement.nextElementSibling.firstChild.firstChild.focus();
                        } else if (e.target.value.length === 1 && index === pin.length - 1) {
                          setPin((prevState) => {
                            const newPin = [...prevState];
                            newPin[index] = e.target.value;
                            return newPin;
                          });
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="submit"
                className="btn text-uppercase py-2 fs-5 w-100"
                disabled={loading}
                style={{
                  backgroundColor: "#0070BA",
                  color: "#fff"
                }}
              >
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Create PIN"
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePIN;
