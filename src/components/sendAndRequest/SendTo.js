import React, { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { RiBookletLine } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon
import './SendTo.css';

function SendTo() {
  const [searchTerm, setSearchTerm] = useState('');
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
    setSearchTerm('');
    setContacts([]);
    setUserNotFound(false);
  };

  const handleClearSelectedContact = (contact) => {
    const updatedContacts = selectedContacts.filter((c) => c.id !== contact.id);
    setSelectedContacts(updatedContacts);
  };

  const handleBuy = () => {
    if (selectedContacts.length > 0) {
      navigate('/complete_send', { state: { receiverInfo: selectedContacts[0] } });
    }
  };

  const fetchReceiverInfo = async (payID) => {
    try {
      setLoading(true); // Set loading state to true
      const response = await api.post(`/api/check/${payID}`);

      if (response.status !== 200) {
        const message = response.data?.message;
        throw new Error(`Error fetching receiver info: ${message || response.status}`);
      }

      const { firstName, lastName } = response.data;

      return {
        id: payID,
        firstName,
        lastName,
      };
    } catch (error) {
      console.error('Error fetching receiver info:', error);
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
    <div className="send-money1abc">
      <div className="payment1abc">
        <p>Send payment to</p>
        <div className="selected-contacts-abc">
          {selectedContacts.map((contact) => (
            <div className="selected-contactabc" key={contact.id}>
              <span className="contact-nameabc">
                <AiOutlineUser className="user-iconabc" />
                {contact.firstName} {contact.lastName}
              </span>
              <AiOutlineCloseCircle
                className="clear-iconabc"
                onClick={() => handleClearSelectedContact(contact)}
              />
            </div>
          ))}
        </div>
        <input
          type="text"
          className="searchInputabc"
          placeholder="Name, @pay ID, email, or mobile"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        {loading ? ( // Render the spinner when loading state is true
          <div className="spinner">
          Loading... <FaSpinner className="spinner-icon" />
        </div>
        ) : userNotFound ? (
          <div className="userNotFound">User not found</div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`contact-abc ${
                selectedContacts.some((c) => c.id === contact.id) ? 'selected-abc' : ''
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              {contact.firstName} {contact.lastName}
            </div>
          ))
        )}

        <button id="btn1" onClick={handleBuy} disabled={isNextButtonDisabled}>
          Next
        </button>
      </div>

      <div className="more-ways1abc">
        <p>More ways to send</p>
        <Link className="invoice1abc">
          <RiBookletLine className="ways-icon1abc" />
          <div className="div1abc">
            <p className="p1abc">Send an invoice</p>
            <p className="p2abc">Customize, track, and send invoices.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SendTo;
