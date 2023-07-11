import React, { useState } from "react";
import styles from "./PaymentsAndTransfers.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";

function PaymentsAndTransfers() {
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
      <p className={styles.commonQP}>Payments And Transfers</p>
      <div className={styles.myContainer}>
        <div className={styles.myContainerDivs}>
          <div
            className={` ${styles.myContainerDiv} ${
              toggle ? styles.myContainerActive : ""
            }`}
            onClick={handleToggle}
          >
            <p className={styles.containerP}>Canceling a payment</p>
            {!toggle ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Why is the payment I sent pending or unclaimed? Can I cancel it?
              </Link>
              <Link className={styles.questionLinks}>
                What is an automatic payment and how do I update or cancel one?
              </Link>
              <Link className={styles.questionLinks}>
                I want my money back. Cancel I cancel a payment?
              </Link>
              <Link className={styles.questionLinks}>
                What's an "authorization" and can I cancel it?
              </Link>

              <Link className={styles.questionLinks}>
                Can I cancel a withdrawal from my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel a money transfer from my bank account to my Ravel
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What's an Order and why is it pending?
              </Link>
              <Link className={styles.questionLinks}>
                Can I cancel an eCheck payment?
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
            <p className={styles.containerP}>Payment holds</p>
            {!toggle1 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle1 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Why is my payment on hold or unavailable?
              </Link>
              <Link className={styles.questionLinks}>
                How can I release my payment(s) on hold?
              </Link>
              <Link className={styles.questionLinks}>
                New Ravel account - payments on hold and accessing your money
                quicker
              </Link>
              <Link className={styles.questionLinks}>
                How do I add tracking information to my payment or update an
                order status?
              </Link>

              <Link className={styles.questionLinks}>
                Ravel tax holds for Kenyan taxpayers - IRS (Internal Revenue
                Service)
              </Link>
              <Link className={styles.questionLinks}>
                How do I confirm I received an item?
              </Link>
              <Link className={styles.questionLinks}>
                Why is my money being held in reserve?
              </Link>
              <Link className={styles.questionLinks}>What are reserves?</Link>
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
            <p className={styles.containerP}>Refunds</p>
            {!toggle2 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle2 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I get a refund?
              </Link>
              <Link className={styles.questionLinks}>Where is my refund?</Link>
              <Link className={styles.questionLinks}>
                How do I issue a refund?
              </Link>
              <Link className={styles.questionLinks}>
                How do I issue a refund in a dispute?
              </Link>

              <Link className={styles.questionLinks}>
                How do I accept or deny a partial refund?
              </Link>
              <Link className={styles.questionLinks}>
                How do I request a refund for a donation?
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
            <p className={styles.containerP}>Transfers</p>
            {!toggle3 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle3 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I add money to my Ravel account from my bank?
              </Link>
              <Link className={styles.questionLinks}>
                How do I withdraw money to my bank account?
              </Link>
              <Link className={styles.questionLinks}>
                Where's my withdrawal?
              </Link>
              <Link className={styles.questionLinks}>
                Can I transfer money to my debit card?
              </Link>

              <Link className={styles.questionLinks}>
                Can I cancel a withdrawal from my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Can I have my balance automatically transfered to my bank
                account?
              </Link>
              <Link className={styles.questionLinks}>
                What bank accounts and debit cards are eligible for instant
                transfers?
              </Link>
              <Link className={styles.questionLinks}>
                Why is my withdrawal being held for review?
              </Link>
              <Link className={styles.questionLinks}>
                What is Ravel Mobile Money Service with M-PESA?
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
            <p className={styles.containerP}>Sending Money</p>
            {!toggle4 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle4 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                Why was my payment declined?
              </Link>
              <Link className={styles.questionLinks}>How do I send money?</Link>
              <Link className={styles.questionLinks}>What is Ravel.Me?</Link>
              <Link className={styles.questionLinks}>
                What payment methods can I use with Ravel?
              </Link>

              <Link className={styles.questionLinks}>
                What can I do if I sent a payment to the wrong email address?
              </Link>
              <Link className={styles.questionLinks}>
                What's the maximum amount I can send with my Ravel account?
              </Link>
              <Link className={styles.questionLinks}>
                Why can I no longer send friends and family payments to Business
                accounts? Why can my Business account no longer receive friends
                and family payments?
              </Link>
              <Link className={styles.questionLinks}>
                What email address should my customers use to send payments?
              </Link>
              <Link className={styles.questionLinks}>
                How do I send a payment in another currency?
              </Link>
              <Link className={styles.questionLinks}>
                How do I pay using Ravel.Me?
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
            <p className={styles.containerP}>Receiving Money</p>
            {!toggle5 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle5 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                How do I receive money through Ravel?
              </Link>
              <Link className={styles.questionLinks}>
                How can I accept payment?
              </Link>
              <Link className={styles.questionLinks}>
                What are Payment Receiving Preferences and how can I set them?
              </Link>
              <Link className={styles.questionLinks}>
                Why is my incoming eCheck pending?
              </Link>

              <Link className={styles.questionLinks}>
                I don't have a Ravel account. Why did I get an email from Ravel
                that I received a payment?
              </Link>
              <Link className={styles.questionLinks}>
                What if a payment I received went to the wrong email address?
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
            <p className={styles.containerP}>Fees</p>
            {!toggle6 ? (
              <MdExpandMore className={styles.containerIcon} />
            ) : (
              <MdExpandLess className={styles.containerIcon} />
            )}
          </div>
          {toggle6 ? (
            <div className={styles.questions}>
              <Link className={styles.questionLinks}>
                What are the fees for Ravel accounts?
              </Link>
              <Link className={styles.questionLinks}>
                What is the Ravel Dispute Fee and why was I charged one?
              </Link>
              <Link className={styles.questionLinks}>
                What is the inactivity fee?
              </Link>
              <Link className={styles.questionLinks}>
                What are the cross-border fees when selling internationally?
              </Link>

              <Link className={styles.questionLinks}>
                How is the dispute rate calculated and how do I avoid being
                charged a dispute fee?
              </Link>
              <Link className={styles.questionLinks}>
                Are there any fees charged for using Ravel Giving Fund?
              </Link>
              <Link className={styles.questionLinks}>
                What fees are charged for donations made through GoFundMe or
                CrowdRise?
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

export default PaymentsAndTransfers;
