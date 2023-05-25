import React, { useState } from "react";
import "./UpdateBalanceModal.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function UpdateBalanceModal({ isVisible, onClose, onUpdateBalance }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mpesaReceiptNumber, setMpesaReceiptNumber] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  if (!isVisible) {
    return null;
  }

  async function handleUpdateBalance() {
    if (!mpesaReceiptNumber.trim()) {
      setError("Please enter your Mpesa Receipt Code.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
    try {
      await onUpdateBalance(mpesaReceiptNumber);
      navigate("/currencies");
    } catch (error) {
      console.error("Error updating the balance:", error);
      setError(error.response.data.error); // Update this line
    } finally {
      setIsLoading(false);
      setMpesaReceiptNumber("");
    }
  }
  

  return (
    <div className="modalMakePrimary">
      <div className="modal-contentMakePrimary">
        <div className="closeContainerMakePrimary">
          <button className="closeMakePrimary" onClick={onClose}>
            <BiArrowBack />
          </button>

          <button className="closeMakePrimary" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modalContentMakePrimaryDiv">
          <p className="makePrimaryPa">Update Balance</p>
          {error && <p className="error">{error}</p>}
          <p className="makePrimaryPa2">
            Please input your Mpesa Receipt Code:
          </p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="e.g RDB9Y1517V"
              value={mpesaReceiptNumber}
              onChange={(e) => setMpesaReceiptNumber(e.target.value)}
              required
            />
          </div>
          <button
            className="btnMakePrimary"
            onClick={handleUpdateBalance}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : <span className="btnTMakePrimary">Confirm</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBalanceModal;
