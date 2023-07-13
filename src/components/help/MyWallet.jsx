import React, { useState } from "react";
import styles from "./MyWallet.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function MyWallet() {
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

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

  return (
    <div className={styles.commonQ}>
      <p className={styles.commonQP}>My Wallet</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Bank Accounts</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I link a bank account to my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my bank account with Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                Why can't I link a bank account to my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I remove a bank account from my Ravel account?
              </Link>

              <Link className={styles.questionLinks}>
                What bank accounts and debit cards are eligible for instant
                transfer?
              </Link>
              <Link className={styles.questionLinks}>
                How do I update my bank details on my Ravel account after a name
                change?
              </Link>
              <Link className={styles.questionLinks}>
                What is a bank reversal?
              </Link>
              <Link className={styles.questionLinks}>
                Can I use the same bank account on 2 different Ravel accounts?
              </Link>
              <Link className={styles.questionLinks}>
                What if the name on my Ravel account and bank account are
                different?
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
            <p className={styles.containerP}>Credit and Debit Cards</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I link a debit or credit card to my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm my credit or debit card with Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How do I update my debit or credit card on Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How do I remove a debit or credit card from my Ravel account?
              </Link>

              <Link className={styles.questionLinks}>
                Why can't I link my credit or debit card to my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I transfer money to my debit card?
              </Link>
              <Link className={styles.questionLinks}>
                How do I change the expiration date of my card on Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How do I set a card as a preferred payment method?
              </Link>
              <Link className={styles.questionLinks}>
                What bank accounts and debit cards are eligible for Instant
                Tranfer?
              </Link>
              <Link className={styles.questionLinks}>
                What debit or credit cards can I use with Ravel?
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
            <p className={styles.containerP}>Balance and Currencies</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I add money to my Ravel account from bank?
              </Link>
              <Link className={styles.questionLinks}>
                What should I do if my balance is negative?
              </Link>
              <Link className={styles.questionLinks}>
                How do I convert my money to another currency in Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                Where can I find Ravel's currency calculator and exchange rates?
              </Link>

              <Link className={styles.questionLinks}>
                Can I have my balance automatically transferred to my bank
                account?
              </Link>
              <Link className={styles.questionLinks}>
                How do I manage my currencies in Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How do I send a payment in another currency?
              </Link>
              <Link className={styles.questionLinks}>
                Why do I have a negative balance?
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
              Store Offers, Coupons, & Gift Cards
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
                Tips on how to use Ravel coupons
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

export default MyWallet;
