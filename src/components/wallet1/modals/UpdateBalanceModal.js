import React, { useState, useEffect } from "react";
import "./UpdateBalanceModal.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function UpdateBalanceModal({ isVisible, onClose, onUpdateBalance }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mpesaReceiptNumber, setMpesaReceiptNumber] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isVisible) {
      setError(null);
    }
  }, [isVisible]);

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
    <div className="modalUpdateBalance">
      <div className="modal-contentUpdateBalance">
        <div className="closeContainerUpdateBalance">
          <button className="closeUpdateBalance" onClick={onClose}>
            <BiArrowBack />
          </button>

          <button className="closeUpdateBalance" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modalContentUpdateBalanceDiv">
    <p className="updateBalancePa">Update Balance</p>
    {error && 
    <div style={{backgroundColor: '#ffcccb', padding: '6px', borderRadius: '5px', marginBottom: '3px'}}>
        <p style={{color: '#a00', fontWeight: 'bold'}}>Error!</p>
        <p style={{marginTop: '0'}}>{error}</p>
    </div>
    }
    <p className="updateBalancePa2">
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
            className="btnUpdateBalance"
            onClick={handleUpdateBalance}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : <span className="btnTUpdateBalance">Confirm</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBalanceModal;
