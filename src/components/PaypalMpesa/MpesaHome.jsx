import React from 'react'
import styles from './MpesaHome.module.css';
import { Navbar } from '../SoleComponents';
import { Link } from 'react-router-dom';

const MpesaHome = () => {
  return (
    <>
        <Navbar />
        <section className={styles.pyplMpesaSection}>
            <div className={styles.pyplWlcmInfo}>
                <h1>Welcome to PayPal Mobile Money Service with M-PESA.</h1>
                <p>Finally in Kenya you can now move funds between your PayPal and M-PESA accounts. Your money, your choice!</p>
                <div className={styles.pyplWltBtnsContainer}>
                    <Link to="/ravel-mpesa/withdraw" className={styles.button}>Withdraw from PayPal</Link>
                    <Link to="/ravel-mpesa/topup" className={styles.button}>Top Up to PayPal</Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default MpesaHome;