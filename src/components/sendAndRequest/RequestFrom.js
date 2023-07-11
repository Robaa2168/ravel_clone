import React, { useState, useEffect } from 'react';
import styles from './RequestFrom.module.css';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { RiBookletLine } from 'react-icons/ri';
import { HiUsers } from 'react-icons/hi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';

function RequestFrom() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);
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

  const handleRequest = () => {
    if (selectedContacts.length > 0) {
      navigate('/complete_request', { state: { receiverInfo: selectedContacts[0] } });
    }
  };

  const fetchReceiverInfo = async (payID) => {
    try {
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
    <div className={styles.sendMoney2}>
      <div className={styles.payment2}>
        <p>Request payment from</p>
        <p id={styles.multiple}>You can request multiple payments from up to 20 people.</p>

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
          className={styles.requestInput}
          placeholder="PayID"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
       {userNotFound ? (
  <div className={styles.userNotFound}>User not found</div>
) : (
  contacts.map((contact) => (
    <div
      key={contact.id}
      className={`${styles.contactAbc} ${selectedContacts.some((c) => c.id === contact.id) ? styles.selectedAbc : ''}`}
      style={{ background: '#f5f5f5', zIndex: 10 }}
      onClick={() => handleContactSelect(contact)}
    >
      {contact.firstName} {contact.lastName}
    </div>
  ))
)}

        <div className={styles.users}>
          <div>
            <HiUsers /> {selectedContacts.length}/20
          </div>
        </div>

        <button id={styles.btn2} onClick={handleRequest} disabled={isNextButtonDisabled}>
          Next
        </button>
      </div>

      <div className={styles.moreWays2}>
        <p>More ways to request</p>
        <Link className={styles.invoice2}>
          <RiBookletLine className={styles.waysIcon2} />
          <div className={styles.div2}>
            <p className={styles.p3}>Send an invoice</p>
            <p className={styles.p6}>Customize, track, and send invoices.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default RequestFrom;
