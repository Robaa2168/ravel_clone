import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import api from '../api';
import { showToast } from '../utils/showToast';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from "react-confetti";
import CheckmarkAnimation from './CheckmarkAnimation';

function Application() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [dobError, setDobError] = useState("");
  const [bankSelectionError, setBankSelectionError] = useState("");

  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    idNumber: "",
    dob: "",
    poBox: "",
    town: "",
    city: "",
    country: "",
    bankName: "",
    bankAccountNo: "",
    formCompleted: false,
  });

  const location = useLocation();
  const userId = location.state && location.state.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId]);

  const banksWithNoAccount = ['NONE'];
  const handleChange = (e) => {
    if (e.target.name === "dob") {
      const dob = new Date(e.target.value);
      const today = new Date();
  
      const year = today.getFullYear() - dob.getFullYear();
      const month = today.getMonth() - dob.getMonth();
      const day = today.getDate() - dob.getDate();
  
      const age = month < 0 || (month === 0 && day < 0) ? year - 1 : year;
  
      if (age < 18) {
        setDobError("You must be at least 18 years old.");
      } else {
        setDobError(""); // Clear the error if age is valid
        setFormState({
          ...formState,
          [e.target.name]: e.target.value,
        });
      }
  
     
    } else if (e.target.name === "bankName") {
      if (e.target.value === "NONE") {
        // Set Bank Account No. to 10 zeros and make it read-only
        setFormState({
          ...formState,
          bankName: e.target.value,
          bankAccountNo: "0000000000",
        });
      } else {
        setFormState({
          ...formState,
          bankName: e.target.value,
          bankAccountNo: "",
        });
      }
      setBankSelectionError(""); // Reset bank selection error
    } else if (e.target.name === "bankAccountNo") {
      if (formState.bankName === "") {
        setBankSelectionError("Please select a bank before entering the account number.");
        setFormState({
          ...formState,
          bankAccountNo: "", // Reset bank account number field
        });
      } else {
        setBankSelectionError("");
        setFormState({
          ...formState,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  const handleCheckboxChange = (e) => {
    setFormState({
      ...formState,
      formCompleted: e.target.checked,
    });
  };
  


  
  const canProceedToNextStep = () => {
    if (step === 1) {
      return (
        formState.firstName &&
        formState.lastName &&
        formState.phoneNumber &&
        formState.email
      );
    } else if (step === 2) {
      // Ensure the user is at least 18
      const dob = new Date(formState.dob);
      const today = new Date();
  
      const year = today.getFullYear() - dob.getFullYear();
      const month = today.getMonth() - dob.getMonth();
  
      const age =
        month < 0 || (month === 0 && today.getDate() < dob.getDate())
          ? year - 1
          : year;
  
      if (age < 18) {
        showToast("warning", "Your date of birth is incorrect");
        return false;
      }
  
      return (
        formState.idNumber &&
        formState.dob &&
        formState.poBox &&
        formState.town &&
        formState.city &&
        formState.country &&
        formState.formCompleted &&
        formState.bankName &&
        formState.bankAccountNo
      );
    }
    return false;
  };
  



  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = async () => {
    if (canProceedToNextStep()) {
      if (step === 2) {
        if (!navigator.onLine) {
          showToast("warning", "No internet connection");
          return;
        }

        setLoading(true);
        try {
          const response = await api.post("/api/KYC", {
            userId,
            ...formState
          });

          const data = response.data;

          if (response.status === 200 || response.status === 201) {
            setFormSubmitted(true);
            showToast("success", "Form submitted successfully.");
            setStep(step + 1);
            setShowConfetti(true);
          } else {
            // Handle error response from server
            const errorMessage = data.message || "Form submission failed";
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
            showToast("error", "Error on form submission");
            console.error("Error on form submission ", error);
          }
        } finally {
          setLoading(false); // Set loading state to false
        }
      } else {
        setStep(step + 1);
      }
    }
  };




  return (
    <div className="body d-flex p-0 p-xl-5">
      <div className="container-xxl">
        <ToastContainer />
        {showConfetti && <Confetti />}
        <div className="row g-3">
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column">

              <div className="card">


                <div className="card-body">
                  <div className="wizard-main" id="w-horizontal">
                    <div className="step-app">
                      <ul className="step-steps d-none d-md-flex">
                        <li
                          className={step === 1 ? "active" : ""}
                          onClick={() => step > 1 && setStep(1)}
                        >
                          <span>1</span> Personal Information
                        </li>
                        <li
                          className={step === 2 ? "active" : ""}
                          onClick={() => step > 2 && setStep(2)}
                        >
                          <span>2</span> Detailed Information
                        </li>
                        <li
                          className={step === 3 ? "active" : ""}
                          onClick={() => step > 3 && setStep(3)}
                        >
                          <span>3</span> Application Submitted
                        </li>
                      </ul>
                      <div className="step-content">
                        {step === 1 && (
                          <div className="step-tab-panel">
                            <form>
                              <div className="row">
                                <div className="col-md-6 col-12 mb-3">
                                  <label className="form-label">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={formState.firstName}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-6 col-12 mb-3">
                                  <label className="form-label">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={formState.lastName}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-6 col-12 mb-3">
                                  <label className="form-label">Phone Number</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="phoneNumber"
                                    value={formState.phoneNumber}
                                    onChange={handleChange}
                                    required
                                  />
                                  <small className="text-muted">The phone number should match the registered name, otherwise withdrawals will be declined.</small>
                                </div>

                                <div className="col-md-6 col-12 mb-3">
                                  <label className="form-label">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                        {step === 2 && (
                          <div className="step-tab-panel">
                            <form>
                              <div className="row">
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">ID Number</label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    name="idNumber"
                                    value={formState.idNumber}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">D.O.B</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={formState.dob}
                                    onChange={handleChange}
                                    required
                                  />
                                  {dobError && <small className="text-danger">{dobError}</small>}
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">Bank Name</label>
                                  <select
                                    className="form-select"
                                    name="bankName"
                                    value={formState.bankName}
                                    onChange={handleChange}
                                    required
                                  >
                                    <option value="">Select Bank</option>
                                    <option value="NONE">No Bank Account</option>
                                    <option value="EQBK">Equity Bank</option>
                                    <option value="KCB">Kenya Commercial Bank</option>
                                    <option value="CBA">Commercial Bank of Africa</option>
                                    <option value="SCBK">Standard Chartered Bank</option>
                                    <option value="NBK">National Bank of Kenya</option>
                                    <option value="DTBK">Diamond Trust Bank</option>
                                    <option value="ABSA">Absa Bank Kenya</option>
                                    <option value="STBK">Stanbic Bank</option>
                                    <option value="IMBK">I&M Bank</option>
                                    <option value="HFCK">Housing Finance Company of Kenya</option>
                                    <option value="GAB">Gulf African Bank</option>
                                    <option value="NIC">NIC Bank</option>
                                    <option value="CONSBK">Consolidated Bank of Kenya</option>
                                    <option value="CHASE">Chase Bank Kenya</option>
                                    <option value="FAMILY">Family Bank Kenya</option>
                                    <option value="COOP">Cooperative Bank of Kenya</option>
                                  </select>
                                </div>

                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">Bank Account No.</label>
                                  <input
  type="text"
  className="form-control"
  name="bankAccountNo"
  value={formState.bankAccountNo}
  onChange={handleChange}
  readOnly={banksWithNoAccount.includes(formState.bankName)}
  required
/>

                                  <div className="text-danger">{bankSelectionError}</div>
                                </div>

                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">P.O. Box</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="poBox"
                                    value={formState.poBox}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">Town</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="town"
                                    value={formState.town}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">City</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formState.city}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <label className="form-label">Country</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="country"
                                    value={formState.country}
                                    onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="col-md-4 col-12 mb-3">
                                  <div className="form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      name="formCompleted"
                                      checked={formState.formCompleted}
                                      onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label">
                                      I hereby declare that the information provided is true and correct.
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                        {step === 3 && formSubmitted && (
                          <div className="step-tab-panel">
                            <div className="d-flex justify-content-center flex-column align-items-center text-center">
                              <CheckmarkAnimation />
                              <h1 className="mt-4 text-center">Success!</h1>
                              <p>Your Information has been Submitted.</p>
                            </div>
                          </div>

                        )}
                      </div>

                      <div className="step-footer d-flex">
                        <button
                          onClick={handlePreviousStep}
                          className="btn btn-primary step-btn"
                          disabled={step === 1}
                        >
                          Prev
                        </button>
                        {step < 3 && (
                          <button
                            onClick={handleNextStep}
                            className="btn btn-primary step-btn"
                            disabled={!canProceedToNextStep()}
                          >
                            Next
                          </button>
                        )}
                        {step === 3 && (
                          <button
                            data-step-action="finish"
                            className="btn btn-primary step-btn"
                            onClick={() => navigate("/home")}
                          >
                            Finish
                          </button>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Application;
