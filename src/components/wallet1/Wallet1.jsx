import React, { useState, useRef, useEffect } from "react";
import "./Wallet1.css";
import { useUser } from "../context";
import { Link } from "react-router-dom";
import { AiFillCreditCard } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import PaymentPreferencesModal from "./modals/PaymentPreferencesModal";
import SetPreferredModal from "./modals/SetPreferredModal";
import AddCurrencyModal from "./modals/AddCurrencyModal";
import MakePrimaryModal from "./modals/MakePrimaryModal";
import ActivateCurrencyModal from "./modals/ActivateCurrencyModal";
import CloseCurrencyModal from "./modals/CloseCurrencyModal";
import api from '../../api';
import Spinner from './modals/Spinner';
import Confetti from 'react-dom-confetti';


function Wallet1() {
  const { user, login } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCurrency, setActiveCurrency] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  // Get primary account
  const primaryAccount = accounts.find(account => account.isPrimary);
  // Display primary account balance
  const primaryAccountBalance = primaryAccount ? parseFloat(primaryAccount.balance).toFixed(2) : '0.00';

  const popupMenuRef = useRef();

  function handleClickOutside(event) {
    if (popupMenuRef.current && !popupMenuRef.current.contains(event.target)) {
      setPopupVisible(false);
      setPopupIndex(null);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function toggleModal1() {
    setModalVisible1(!modalVisible1);
  }

  function toggleModal2() {
    setModalVisible2(!modalVisible2);
  }

  function toggleModal3() {
    setModalVisible3(!modalVisible3);
  }

  function toggleModal4() {
    setModalVisible4(!modalVisible4);
  }

  function toggleModal5() {
    setModalVisible5(!modalVisible5);
  }

  function togglePopup(index) {
    if (popupIndex === index) {
      setPopupIndex(null);
    } else {
      setPopupIndex(index);
    }
  }


  useEffect(() => {
    if (user) {
      const newBalances = user?.accounts?.reduce((acc, account) => {
        acc[account.currency] = account.balance;
        return acc;
      }, {});
      setBalances(newBalances);
    }
  }, [user]);



  useEffect(() => {
    async function fetchAccounts() {
      try {
        setLoading(true);
        const response = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id,
          },
        });

        if (response.status === 200) {
          setAccounts(response.data.accounts);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAccounts();
  }, [user]);

  async function makeCurrencyPrimary(account) {
    try {
      setIsLoading(true);

      const response = await api.post(
        "/api/Primary",
        {
          userId: user?.primaryInfo?._id,
          accountId: account._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "user-id": user?.primaryInfo?._id,
          },
        }
      );

      if (response.status === 200) {
        const balanceResponse = await api.get('/api/getUserBalances', {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'user-id': user?.primaryInfo?._id,
          },
        });

        if (balanceResponse.status === 200) {
          const updatedUser = { ...user, accounts: balanceResponse.data.accounts };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          login(updatedUser);
        }
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Hide the confetti after 3 seconds
      }
    } catch (error) {
      console.error("Error making the currency primary:", error);
      alert("There was an error making the currency primary. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
    };

    return flagImages[currencyCode] || ''; // Return an empty string if the currency code is not found
  }

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 45,
    elementCount: 50,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 0,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  return (
    <div className="walletMain">
      {showConfetti && <Confetti className="confetti-container" config={confettiConfig} />}
      <div className="walletContainer">

        <div className="walletContainerDiv1">
          <p className="linkCard">
            <p className="linkCardIconP">
              <AiFillCreditCard className="linkCardIcon" />
            </p>
            <p className="linkCardP">Link a card</p>
          </p>

          <div className="paypalBal">
            <img
               src={getFlagImageUrl(primaryAccount?.currency)}
               alt={primaryAccount?.currency}
              className="walletContainingCurrencyImg"
            />
            <div className="paypalBalCard">

              <p className="paypalBalCardP">Primary balance</p>
              <p className="paypalBalCardAvailable">{primaryAccountBalance} {primaryAccount?.currency}</p>
            </div>
          </div>
        </div>
        <div className="walletContainerDiv2">

          <div className="hide-lg">
          <img
               src={getFlagImageUrl(primaryAccount?.currency)}
               alt={primaryAccount?.currency}
              className="walletContainingCurrencyImg"
            />
            <p className="walletContainerDiv2BalP">Primary balance</p>
            <p className="primaryAccountBalance">{primaryAccountBalance}</p>
            <p className="walletContainerDiv2P2">{primaryAccount?.currency}</p>
          </div>
          <button onClick={toggleModal2} className="walletContainerDiv2Btn">Add local currency</button>

          {loading ? (
            <Spinner />
          ) : (
            accounts.map((account, index) => (
              <div className="walletContainingCurrency" key={index}>
                <div className="walletContainingCurrencyDiv">
                  <img
                    src={getFlagImageUrl(account.currency)}
                    alt={account.currency}
                    className="walletContainingCurrencyImg"
                  />
                  <p
                    className="walletContainingCurrencyP2"
                    onClick={() => {
                      setActiveCurrency(account);
                      toggleModal4();
                    }}
                  >
                    {account?.currency}{" "}
                    <span className={account?.isActive ? "activestatus" : "inactivestatus"}>
                      {account?.isActive ? "Active" : "Inactive"}
                    </span>{" "}
                    <span className={account?.isPrimary ? "primarystatus" : ""}>
                      {account?.isPrimary ? "Primary" : ""}
                    </span>

                  </p>
                </div>
                <div className="div9">
                  <p className="walletContainingCurrencyBal">
                    {parseFloat(account?.balance).toFixed(2)}
                  </p>
                  <CiMenuKebab className="div9Icon" onClick={() => togglePopup(index)} />

                  {popupIndex === index && (
                    <div className="popupMenu" ref={popupMenuRef}>
                      <Link
                        className="popupLink"
                        onClick={() => {
                          setActiveCurrency(account);
                          toggleModal3();
                        }}
                      >
                        Make primary
                      </Link>
                      <Link
                        className="popupLink"
                        onClick={() => {
                          setActiveCurrency(account);
                          toggleModal4();
                        }}
                      >
                        Activate currency
                      </Link>
                      <Link className="popupLink" onClick={toggleModal5}>
                        Close currency
                      </Link>
                    </div>
                  )}
                </div>
              </div>

            ))
          )}






          <div className="addCurrency">
            <Link className="addCurrencyLink1" onClick={toggleModal2}>
              Add a currency
            </Link>
            <Link className="addCurrencyLink2">Currency Calculator</Link>
          </div>

          <div className="preferred">
            <p className="preferredOnline">Preferred when paying online</p>
            <Link className="setPreferred" onClick={toggleModal1}>
              Set as preferred
            </Link>


            <p className="preferredP1">
              We'll use your available balance when you shop online or send
              money for goods and services.
            </p>
            <p className="preferredP2">
              If you don't have enough money in your balance, we'll ask you to
              pick another funding source at checkout.
            </p>
            <Link className="preferredAbout" onClick={toggleModal}>
              More about payment preferences
            </Link>
          </div>
        </div>
        <PaymentPreferencesModal
          isVisible={modalVisible}
          onClose={toggleModal}
        />
        <SetPreferredModal isVisible={modalVisible1} onClose={toggleModal1} />
        <AddCurrencyModal isVisible={modalVisible2} onClose={toggleModal2} />
        <MakePrimaryModal
          isVisible={modalVisible3}
          onClose={toggleModal3}
          activeCurrency={activeCurrency}
          onMakePrimary={makeCurrencyPrimary}
        />
        <ActivateCurrencyModal
          isVisible={modalVisible4}
          onClose={toggleModal4}
          activeCurrency={activeCurrency}
          balances={balances}
        />

        <CloseCurrencyModal isVisible={modalVisible5} onClose={toggleModal5} />
      </div>
    </div>
  );
}

export default Wallet1;
