import React from "react";
import { Link } from "react-router-dom";
import styles from "./Account.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Select, { components } from "react-select";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { useUser } from "../context";

const DropdownIndicator = (props) => {
  const iconStyle = {
    fontSize: "1.5rem",
  };

  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <span style={iconStyle}>
          <MdExpandLess />
        </span>
      ) : (
        <span style={iconStyle}>
          <MdExpandMore />
        </span>
      )}
    </components.DropdownIndicator>
  );
};

const SingleValue = ({ children, label, ...props }) => (
  <components.SingleValue {...props}>
    <div className={styles.selectLabelContainer}>
      <span className={styles.selectLabel}>{label}</span>
      <span className={styles.selectSelectedValue}>{children}</span>
    </div>
  </components.SingleValue>
);

const customStyles = {
  dropdownIndicator: (base) => ({
    ...base,
    borderLeft: "none",
  }),
  option: (base, { isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "transparent" : base.backgroundColor,
    fontWeight: isSelected ? "bold" : base.fontWeight,
    color: isSelected ? "black" : base.color,
  }),
};

const Option = (props) => {
  const { children, isSelected, ...rest } = props;
  return (
    <components.Option {...rest}>
      <div className={styles.selectOptionContent}>
        {children}
        {isSelected && <IoCheckmark className={styles.selectOptionCheckmark} />}
      </div>
    </components.Option>
  );
};

function Account() {
  const { user, logout } = useUser();
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Francais", label: "Francais" },
    { value: "Espanol", label: "Espanol" },
  ];

  const zoneOptions = [
    { value: "(GMT-08:00) Pacific Time", label: "(GMT-08:00) Pacific Time" },
  ];

  const handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.profileDetails}>
          <div className={styles.joined}>
            <div className={styles.dateJoined}>
              <p className={styles.dateJoined1}>Profile</p>
              <p className={styles.dateJoined2}>Joined {""}
              {new Date(user?.userInfo?.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}</p>
            </div>
            <p className={styles.userImage}>{user?.userInfo?.firstName[0].toUpperCase()}</p>
          </div>

          <div className={styles.profileName}>
            <p className={styles.addEmail1}> {user?.userInfo?.firstName} {user?.userInfo?.lastName}</p>
            <Link className={`${styles.changeName} ${styles.addEmail2}`}>Change name</Link>
          </div>
        </div>

        <div className={styles.profileId}>
          <p className={styles.options}>Account Options</p>
          <Select
            defaultValue={languageOptions[0]}
            options={languageOptions}
            components={{
              DropdownIndicator,
              SingleValue: (props) => (
                <SingleValue {...props} label="Language" />
              ),
              Option,
            }}
            onChange={handleChange}
            className={styles.selectOptions}
            styles={customStyles}
          />
          <Select
            defaultValue={zoneOptions[0]}
            options={zoneOptions}
            components={{
              DropdownIndicator,
              SingleValue: (props) => (
                <SingleValue {...props} label="Time Zone" />
              ),
              Option,
            }}
            onChange={handleChange}
            className={styles.selectOptions}
            styles={customStyles}
          />
          <div className={styles.nationality}>
            <p className={styles.kenyan}>Nationality</p>
            <p className={styles.kenyan1}>Kenya</p>
          </div>

          <div className={styles.merchant}>
            <p className={styles.kenyan}>Merchant ID</p>
            <p className={styles.kenyan1}>LV3C2EXEWPYCJ</p>
          </div>

          <div className={styles.national}>
            <p className={styles.kenyan}>National ID</p>
            <div className={styles.idNumber}>
              <p className={styles.kenyan1}>{user?.userInfo?.idNumber}</p>
              <Link className={styles.edit}>Edit</Link>
            </div>
          </div>

          <Link className={styles.passport}>Add Passport</Link>

          <div className={styles.features}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
            <div className={styles.business}>
              <p className={styles.unlock}>
                Unlock new features like express checkout
              </p>
              <Link className={styles.upgrade}>Upgrade to a Business account</Link>
            </div>
          </div>

          <div className={styles.closeAccount}>
            <FontAwesomeIcon icon={faUserCircle} className={styles.icon} />
            <p className={styles.close}>Close your account</p>
          </div>
        </div>
      </div>

      <div className={styles.address}>
        <div className={styles.addressEmail}>
          <div className={styles.addEmail}>
            <p className={styles.addEmail1}>Email</p>
            <Link className={styles.addEmail2}>Add</Link>
          </div>

          <div className={styles.primaryEmail}>
            <p className={styles.primaryEmailP}>Primary</p>
            <div className={styles.changeEmail}>
              <p className={styles.changeEmailP}>{user?.userInfo?.email}</p>
              <Link className={styles.changeEmailL}>Change</Link>
            </div>
          </div>

          <p className={styles.emailDesc}>
            To update an email address, you must have at least two email
            addresses on file.
          </p>
        </div>

        <div className={styles.addressNumber}>
          <div className={styles.addPhoneNumbers}>
            <p className={styles.addEmail1}>Phone Numbers</p>
            <Link className={styles.addEmail2}>Add</Link>
          </div>

          <div className={styles.mobile}>
            <div className={styles.mobilePrimary}>
              <p className={styles.mobileNumber}>Mobile</p>
              <p className={styles.primaryEmailP}>Primary</p>
            </div>
            <div className={styles.phoneNumber}>
              <p className={styles.myNumber}>{user?.userInfo?.phoneNumber}</p>
              <Link className={styles.addEmail2}>Change</Link>
            </div>
          </div>
        </div>

        <div className={styles.addressAddress}>
          <div className={styles.addAddress}>
            <p className={styles.addEmail1}>Addresses</p>
            <Link className={styles.addEmail2}>Add</Link>
          </div>
          <div className={styles.primaryAddress}>
            <p className={styles.primaryEmailP}>Primary</p>
            <div className={styles.place}>
              <div className={styles.address1}>
                <p>{user?.userInfo?.poBox}</p>
                <p>{user?.userInfo?.town}</p>
                <p>{user?.userInfo?.city}</p>
                <p>{user?.userInfo?.Country}</p>
              </div>
              <Link className={styles.addEmail2}>Edit</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
