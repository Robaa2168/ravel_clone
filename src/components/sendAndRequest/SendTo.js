import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import { RiBookletLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon
import styles from "./SendTo.module.css";

function SendTo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const debounceTimeout = 300; // delay in milliseconds

  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleContactSelect = (contact) => {
    setSelectedContacts([...selectedContacts, contact]);
    setSearchTerm("");
    setContacts([]);
    setUserNotFound(false);
  };

  const handleClearSelectedContact = (contact) => {
    const updatedContacts = selectedContacts.filter((c) => c.id !== contact.id);
    setSelectedContacts(updatedContacts);
  };

  const handleBuy = () => {
    if (selectedContacts.length > 0) {
      navigate("/buy", { state: { receiverInfo: selectedContacts[0] } });
    }
  };

  const fetchReceiverInfo = async (payID) => {
    try {
      setLoading(true); // Set loading state to true
      const response = await api.post(`/api/check/${payID}`);

      if (response.status !== 200) {
        const message = response.data?.message;
        throw new Error(
          `Error fetching receiver info: ${message || response.status}`
        );
      }

      const { firstName, lastName } = response.data;

      return {
        id: payID,
        firstName,
        lastName,
      };
    } catch (error) {
      console.error("Error fetching receiver info:", error);
      return null;
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const searchContactsApi = async (term) => {
    const receiverInfo = await fetchReceiverInfo(term);
    if (receiverInfo) {
      return [receiverInfo];
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (searchTerm.length > 5 && selectedContacts.length === 0) {
      debouncedSearchContacts(searchTerm);
    } else {
      setContacts([]);
      setUserNotFound(false);
    }
  }, [searchTerm, selectedContacts]);

  const debouncedSearchContacts = debounce(async (term) => {
    const results = await searchContactsApi(term);
    setContacts(results);
    setUserNotFound(results.length === 0);
  }, debounceTimeout);

  const isNextButtonDisabled = selectedContacts.length === 0 || userNotFound;

  return (
    <div className={styles.sendMoney1}>
      <div className={styles.payment1}>
        <p>Send payment to</p>
        <div className={styles.selectedContacts}>
          {selectedContacts.map((contact) => (
            <div className={styles.selectedContact} key={contact.id}>
              <span className={styles.contactName}>
                <AiOutlineUser className={styles.userIcon} />
                {contact.firstName} {contact.lastName}
              </span>
              <AiOutlineCloseCircle
                className={styles.clearIcon}
                onClick={() => handleClearSelectedContact(contact)}
              />
            </div>
          ))}
        </div>
        <input
          type="text"
          className={styles.sendToInput}
          placeholder="Name, @pay ID, email, or mobile"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        {loading ? ( // Render the spinner when loading state is true
          <div className={styles.spinner}>
            Loading... <FaSpinner className={styles.spinnerIcon} />
          </div>
        ) : userNotFound ? (
          <div className={styles.userNotFound}>User not found</div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-abc ${
                selectedContacts.some((c) => c.id === contact.id)
                  ? "selected-abc"
                  : ""
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              {contact.firstName} {contact.lastName}
            </div>
          ))
        )}

        <button
          id={styles.btn1}
          onClick={handleBuy}
          disabled={isNextButtonDisabled}
        >
          Next
        </button>
      </div>

      <div className={styles.moreWays1}>
        <p className={styles.moreWays1P}>More ways to send</p>
        <Link className={styles.invoice1}>
          <RiBookletLine className={styles.waysIcon1} />
          <div className={styles.div1}>
            <p className={styles.p1}>Send an invoice</p>
            <p className={styles.p2}>Customize, track, and send invoices.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SendTo;
