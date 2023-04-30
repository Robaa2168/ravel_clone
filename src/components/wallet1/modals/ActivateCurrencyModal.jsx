import React, { useState } from 'react';
import "./ActivateCurrencyModal.css";
import { BiArrowBack } from "react-icons/bi";
import api from '../../../api';
import { showToast } from "../../../utils/showToast";
import { useUser } from "../../context";


function ActivateCurrencyModal({ isVisible, onClose, activeCurrency }) {
  const currencyCode = activeCurrency?.currency;
  const [processing, setProcessing] = useState(false);
  const { user, login } = useUser();
  const [error, setError] = useState(null);

  if (!isVisible) {
    return null;
  }

  function getFlagImageUrl(currencyCode) {
    const flagImages = {
      USD: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png',
      EUR: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1280px-Flag_of_Europe.svg.png',
      GBP: 'https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg',
      AUD: 'https://cdn.britannica.com/78/6078-004-77AF7322/Flag-Australia.jpg',
      NGN: 'https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg',
      RWF: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg',
      ZAR: 'https://cdn.britannica.com/27/4227-004-32423B42/Flag-South-Africa.jpg',
      UGX: 'https://cdn.britannica.com/22/22-004-0165975D/Flag-Uganda.jpg',
      KES: 'https://cdn.britannica.com/15/15-004-B5D6BF80/Flag-Kenya.jpg',
      ZMW: 'https://cdn.britannica.com/31/4231-004-F1DBFAE7/Flag-Zambia.jpg'
      // Add more currency codes and their respective flag image URLs here
    };
  
    return flagImages[currencyCode] || ''; // Return an empty string if the currency code is not found
  }

  const handleClose = () => {
    setError(null); // Set error to null
    onClose(); // Call the onClose prop
  };

  if (!isVisible) {
    return null;
  }

  const handleActivation = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    try {
      const response = await api.post('/api/activate', {
        userId: user?.primaryInfo?._id,
        currency: currencyCode,
      });

      if (response.status === 200) {
        const updatedUser = { ...user, accounts: response.data.accounts };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        login(updatedUser);
        showToast("success", "Currency activation successful!");
        onClose();
      } else {
        setError("An error occurred during account activation. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during account activation. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };




  return (
    <div className="modalMakePrimary">
      <div className="modal-contentMakePrimary">
        <div className="closeContainerMakePrimary">
        <button className="closeMakePrimary" onClick={handleClose}>
            <BiArrowBack />
          </button>
          <button className="closeMakePrimary" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modalContentMakePrimaryDiv">
  <div className="currency">
    <img src={getFlagImageUrl(currencyCode)} alt={currencyCode} className="currencyImg" />
    <p className="currencyP">{currencyCode}</p>
  </div>
  <p className="makePrimaryPa">Activate {currencyCode} currency</p>
  <p className="makePrimaryPa2">
    To activate {currencyCode} currency, a fee of $5 will be charged. Please note
     that the funds used to pay this fee must be in the same currency as the one being activated.
  </p>
  {error && <div className="activationError">{error}</div>}
  <button className="btnMakePrimary" onClick={handleActivation} disabled={processing}>
    <span className="btnTMakePrimary">
      {processing ? 'Processing...' : `Activate ${currencyCode} Currency`}
      {processing && <i className="fas fa-spinner fa-spin"></i>}
    </span>
  </button>



        </div>
      </div>
    </div>
  );
}

export default ActivateCurrencyModal;