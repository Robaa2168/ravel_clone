  // Close currency modal
import React, { useState } from "react";
import "./CloseCurrencyModal.css";
import { BiArrowBack } from "react-icons/bi";

function CloseCurrencyModal({ isVisible, onClose, activeCurrency, onCloseCurrency }) {
  const [isLoading, setIsLoading] = useState(false);
  const currencyCode = activeCurrency?.currency;
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

  async function handleCloseCurrency() {
    setIsLoading(true); // Set loading state to true
    try {
      // Call the onCloseCurrency function passed as a prop
      await onCloseCurrency(activeCurrency);
      // Close the modal
      onClose();
    } catch (error) {
      // Handle the error (e.g., show an error message)
      console.error("Error closing the currency:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
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
          <div className="euro">
            <img src={getFlagImageUrl(currencyCode)} alt={currencyCode} className="euroImg" />
            <p className="euroP">{currencyCode}</p>
          </div>
          <p className="makePrimaryPa">Close {currencyCode}</p>
          <p className="makePrimaryPa2">
            Closing this currency means it won't show up in your balance unless
            you accept another payment in this currency.
          </p>
          <button className="btnMakePrimary" onClick={handleCloseCurrency} disabled={isLoading}>
            {isLoading ? "Processing..." : <span className="btnTMakePrimary">Close {currencyCode}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CloseCurrencyModal;
