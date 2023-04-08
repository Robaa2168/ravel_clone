import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import api from '../api';
import { showToast } from '../utils/showToast';
import { useLocation, useNavigate } from 'react-router-dom';

function Application() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  

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
    formCompleted: false,
  });

  const location = useLocation();
  const userId = location.state && location.state.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId]);


  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
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
      return (
        formState.idNumber &&
        formState.dob &&
        formState.poBox &&
        formState.town &&
        formState.city &&
        formState.country &&
        formState.formCompleted
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
        try {
          const response = await api.post("/api/KYC", {
            userId,
            ...formState
          });
  
          const data = response.data;
  
          if (response.status === 200) { // Check for success status code
            setFormSubmitted(true);
            showToast("success", "Form submitted successfully.");
            setStep(step + 1); // Move this line here to change the step only if the submission is successful
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
          showToast("error", "Error during form submission.");
          console.error("Error during form submission: ", error);
        }
      } else {
        setStep(step + 1);
      }
    }
  };
  
  
  

  return (
    <div className="body d-flex p-0 p-xl-5">
    <div className="container-xxl">
      <div className="row g-3">
        <div className="col-lg-12 d-flex justify-content-center align-items-center auth-h100">
          <div className="d-flex flex-column">
  
            <div className="card">
            <ToastContainer />
              <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0 align-items-center">
               
              </div>
              <div className="card-body">
                <div className="wizard-main" id="w-horizontal">
                  <div className="step-app">
                    <ul className="step-steps">
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
                                  type="number"
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
      <i className="icofont-checked fs-1 my-2" />
      <h1 className="mt-4 ">
        Success!
      </h1>
      <p>
        Your Information has been Submitted.
      </p>
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