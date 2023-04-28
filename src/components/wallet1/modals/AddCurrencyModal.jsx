import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./AddCurrencyModal.css";
import { BiArrowBack } from "react-icons/bi";
import { IoWarningSharp } from "react-icons/io5";
import api from '../../../api';
import { useUser } from "../../context";

const initialValues = {
  addCurrencyValue: "",
};

const validationSchema = Yup.object({
  addCurrencyValue: Yup.string().required("Choose a currency and try again"),
});

function getFlagImageUrl(currencyCode) {
  const flagImages = {
    NGN: 'https://cdn.britannica.com/68/5068-004-72A3F250/Flag-Nigeria.jpg',
    RWF: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg',
    ZAR: 'https://cdn.britannica.com/27/4227-004-32423B42/Flag-South-Africa.jpg',
    UGX: 'https://cdn.britannica.com/22/22-004-0165975D/Flag-Uganda.jpg',
    KES: 'https://cdn.britannica.com/15/15-004-B5D6BF80/Flag-Kenya.jpg',
    ZMW: 'https://cdn.britannica.com/31/4231-004-F1DBFAE7/Flag-Zambia.jpg'
  };

  return flagImages[currencyCode] || ''; // Return an empty string if the currency code is not found
}

function AddCurrencyModal({ isVisible, onClose}) {
  const [processing, setProcessing] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { user, login } = useUser();

  if (!isVisible) {
    return null;
  }

  const countries = [
    { name: "Kenya", currency: "KES" },
    { name: "Nigeria", currency: "NGN" },
    { name: "Rwanda", currency: "RWF" },
    { name: "South Africa", currency: "ZAR" },
    { name: "Uganda", currency: "UGX" },
    { name: "Zambia", currency: "ZMW" },
  ];

  const sortedCountries = countries.sort((a, b) => a.name.localeCompare(b.name));


  const handleAddCurrency = async (values, { setErrors }) => {
    setProcessing(true);

    try {
      const response = await api.post('/api/add-currency', {
        userId: user?.primaryInfo?._id,
        currency: values.addCurrencyValue,
      }, {
        headers: { Authorization: `Bearer ${user?.token}` }, // Pass the user token
      });

      if (response.status === 200) {
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'user-id': user?.primaryInfo?._id,
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Update the context
          login(updatedUser);
          onClose(); // Close the modal on success
        }
      } else {
        
        setErrors({ addCurrencyValue: "An error occurred while adding the currency." });
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ addCurrencyValue: error.response.data.message });
      } else {
        setErrors({ addCurrencyValue: "An error occurred while adding the currency." });
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="modalAddCurrency">
      <div className="modal-contentAddCurrency">
        <div className="closeContainerAddCurrency">
          <button className="closeAddCurrency" onClick={onClose}>
            <BiArrowBack />
          </button>
          <button className="closeAddCurrency" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modalContentAddCurrencyDiv">
          <p className="AddCurrencyPa">Add local currency</p>
          <p className="AddCurrencyPa2">
            When you add a currency, any payments you receive in that currency
            will be credited to that balance. We'll use your primary currency
            when you send or request payments.
          </p>

          
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddCurrency}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="radio-addCurrency">
                  {sortedCountries.map((country) => (
                    <label key={country.currency} className="inputRadio">
                      <Field type="radio" name="addCurrencyValue" value={country.currency} />
                      <img
                        src={getFlagImageUrl(country.currency)}
                        alt={country.name}
                        className="allFlags"
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          width: '24px',
                          height: '24px',
                        }}
                      />
                      {country.name}
                    </label>
                  ))}
             
                </div>
              
                {errors.addCurrencyValue && touched.addCurrencyValue ? (
                  <div className="errorAddCurrency">
                    <IoWarningSharp className="errIcon" />
                    {errors.addCurrencyValue}
                  </div>
                ) : null}
                <button className="btnAddCurrency" type="submit" disabled={processing}>
                  {processing ? 'Processing...' : <span className="btnTAddCurrency">Add a currency</span>}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AddCurrencyModal;
