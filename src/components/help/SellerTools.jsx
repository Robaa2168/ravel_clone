import React, { useState } from "react";
import styles from "./SellerTools.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function SellerTools() {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);
  const [toggle4, setToggle4] = useState(false);

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

  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>Seller Tools</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Shipping</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                What shipping carriers can I use to get my money sooner?
              </Link>
              <Link className={styles.questionLinks}>
                How long can the seller take to ship my item?
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
            <p className={styles.containerP}>Invoicing</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I pay a money request or invoice?
              </Link>
              <Link className={styles.questionLinks}>
                Can I archive, delete or cancel an invoice?
              </Link>
              <Link className={styles.questionLinks}>
                How do I create and send an invoice?
              </Link>
              <Link className={styles.questionLinks}>
                How much does it cost to use Ravel invoicing?
              </Link>

              <Link className={styles.questionLinks}>
                How do I set up my business information on the invoice?
              </Link>
              <Link className={styles.questionLinks}>
                How do I report a suspicious money request or invoice?
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
            <p className={styles.containerP}>Ravel Business Debit Mastercard</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Why is my Ravel Business Debit Mastercard being declined?
              </Link>
              <Link className={styles.questionLinks}>
                How do I set or change my Ravel Business Debit Mastercard PIN
                number?
              </Link>
              <Link className={styles.questionLinks}>
                How do I view my daily spending and ATM withdrawal limits for my
                Ravel Business Debit Mastercard?
              </Link>
              <Link className={styles.questionLinks}>
                How do I activate my Ravel Business Debit Mastercard?
              </Link>

              <Link className={styles.questionLinks}>
                How do I report a lost, stolen, or damaged Ravel Business Debit
                Mastercard?
              </Link>
              <Link className={styles.questionLinks}>
                My Ravel Business Debit Mastercard is about to expire. When will
                my replacement debit card be sent?
              </Link>
              <Link className={styles.questionLinks}>
                What's the Ravel Business Debit Mastercard and how do I apply?
              </Link>
              <Link className={styles.questionLinks}>
                How do I withdraw money using my Ravel Business Debit
                Mastercard?
              </Link>
              <Link className={styles.questionLinks}>
                Can I use my Ravel Business Debit Mastercard when trvaeling?
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
            <p className={styles.containerP}>
              Website, Buttons & Developer Tools
            </p>
            {!toggle3 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle3 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                What are the Payment Services Directives, strong customer
                authentication and remembered device?
              </Link>
              <Link className={styles.questionLinks}>
                Information on merchant orders, authorizations and integration
                support
              </Link>
              <Link className={styles.questionLinks}>
                What is the Ravel Developer Portal?
              </Link>
              <Link className={styles.questionLinks}>
                New overcapture requirements (PSD2)
              </Link>

              <Link className={styles.questionLinks}>
                How do I create a Subscription Button?
              </Link>
              <Link className={styles.questionLinks}>
                How do I add a Ravel button to Facebook?
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
            <p className={styles.containerP}>Seller Profiles</p>
            {!toggle4 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle4 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Can I use a QR code for my Seller Profile?
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerTools;
