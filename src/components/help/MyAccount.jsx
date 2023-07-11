import React, { useState } from "react";
import styles from "./MyAccount.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function MyAccount() {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);
  const [toggle5, setToggle5] = useState(false);
  const [toggle6, setToggle6] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  function handleToggle1() {
    setToggle1(!toggle1);
  }

  function handleToggle2() {
    setToggle2(!toggle2);
  }

  function handleToggle3() {
    setToggle3(!toggle3);
  }

  function handleToggle4() {
    setToggle4(!toggle4);
  }

  function handleToggle5() {
    setToggle5(!toggle5);
  }

  function handleToggle6() {
    setToggle6(!toggle6);
  }

  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>My Account</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Profile and Settings</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I add and confirm, change or remove a phone number on my
                Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I change the name on my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I add, change, or remove a street address on my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my email address?
              </Link>

              <Link className={styles.questionLinks}>
                How do I view or edit my account information?
              </Link>
              <Link className={styles.questionLinks}>
                How do I add, remove or update an email address on my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I change the address on my Ravel account to another country?
              </Link>
              <Link className={styles.questionLinks}>
                I didn't receive the email to confirm my email address.
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my phone number?
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my shipping address on Ravel?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle1 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle1}
          >
            <p className={styles.containerP}>Account Status</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I close my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I view and download statements and reports?
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my identity? (CIP)
              </Link>
              <Link className={styles.questionLinks}>
                How do I check the status of my payment?
              </Link>

              <Link className={styles.questionLinks}>
                How do I close the Ravel account of a deceased relative?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle2 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle2}
          >
            <p className={styles.containerP}>Ravel Basics</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I verify my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I change the type of Ravel account I have?
              </Link>
              <Link className={styles.questionLinks}>
                How do I contact Ravel customer service?
              </Link>
              <Link className={styles.questionLinks}>
                What is my Ravel account number?
              </Link>

              <Link className={styles.questionLinks}>
                What's the difference between friends and family or goods and
                services payments?
              </Link>
              <Link className={styles.questionLinks}>
                Why am I receiving emails from Ravel when I don't have an
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What is the difference between Personal and Business accounts?
              </Link>
              <Link className={styles.questionLinks}>
                What should I do if my account is locked?
              </Link>
              <Link className={styles.questionLinks}>
                Why should I have to complete a security check?
              </Link>
              <Link className={styles.questionLinks}>
                How do I block another Ravel user?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle3 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle3}
          >
            <p className={styles.containerP}>Policies</p>
            {!toggle3 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle3 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Why am I suspended from Ravel Seller Protection? How do I become
                eligible again?
              </Link>
              <Link className={styles.questionLinks}>
                How do I report buyer abuse?
              </Link>
              <Link className={styles.questionLinks}>
                Does Ravel cover my purchase if there's a problem?
              </Link>
              <Link className={styles.questionLinks}>
                What is Ravel Seller Protection?
              </Link>
              <Link className={styles.questionLinks}>
                What is Ravel Acceptable Use Policy and where can I find it?
              </Link>

              <Link className={styles.questionLinks}>
                Does Ravel provide phone and email support in the same languages
                the website is in?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle4 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle4}
          >
            <p className={styles.containerP}>Notifications</p>
            {!toggle4 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle4 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I stop receiving instant Payment Notifications (IPNs)?
              </Link>
              <Link className={styles.questionLinks}>
                How do I update my Facebook Messenger notification preference?
              </Link>
              <Link className={styles.questionLinks}>
                How do I opt out of automated calls and texts?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle5 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle5}
          >
            <p className={styles.containerP}>Nonprofits and Donations</p>
            {!toggle5 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle5 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I apply for the charity rate?
              </Link>
              <Link className={styles.questionLinks}>
                How do I accept donations with Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How do I access my charity dashboard?
              </Link>
              <Link className={styles.questionLinks}>
                How do I enroll in Ravel Giving Fund?
              </Link>

              <Link className={styles.questionLinks}>
                When and how does the charity receive my Ravel Giving Fund
                donation?
              </Link>
              <Link className={styles.questionLinks}>
                How do I track my Ravel Giving Fund donations?
              </Link>
              <Link className={styles.questionLinks}>
                What is the difference between Ravel donations and Ravel Giving
                Fund donations?
              </Link>
              <Link className={styles.questionLinks}>
                How can my nonprofit or small business raise money through
                Campaign Fundraising?
              </Link>
              <Link className={styles.questionLinks}>
                How do I request a refund for a donation?
              </Link>
              <Link className={styles.questionLinks}>
                Why didn't my donation go to my recommended charity (Ravel
                Giving Fund)?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle6 ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle6}
          >
            <p className={styles.containerP}>Tax Information</p>
            {!toggle6 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle6 ? (
            <div className={styles.questions}>
              <p>
                Click on a subtopic below and dive deeper into Tax information
                topics.
              </p>
              <Link className={styles.questionLinks}>General Information</Link>
              <Link className={styles.questionLinks}>1099-K and B-Notice</Link>
              <Link className={styles.questionLinks}>FATCA</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
