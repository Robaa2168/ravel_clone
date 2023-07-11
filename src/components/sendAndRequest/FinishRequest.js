import React, { useState } from "react";
import styles from "./FinishRequest.module.css";
import { FaUser, FaDollarSign } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";
import api from "../../api";
import { useUser } from "../context";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function FinishRequest() {
  const location = useLocation();
  const { id, firstName, lastName } = location.state.receiverInfo;
  const { user, login } = useUser();
  const [transferamount, setTransferAmount] = useState("0.00");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [showSuccess, setShowSuccess] = useState(false);
  const [transferDate, setTransferDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transferError, setTransferError] = useState("");
  const [purpose, setPurpose] = useState("");

  const getUniqueCurrencies = (accounts) => {
    const currenciesSet = new Set(accounts.map((account) => account.currency));
    return Array.from(currenciesSet);
  };

  // Retrieve accounts from localStorage
  const storedAccounts = JSON.parse(localStorage.getItem("user")).accounts;
  const currencies = getUniqueCurrencies(storedAccounts); // Fetch unique currencies from user's accounts
  const transID = user?.primaryInfo?._id;

  const isNextButtonDisabled =
    transferamount === "0.00" || transferamount === "";

  function generateRandomTransactionNumber() {
    const prefix = "RGP";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    for (let i = 0; i < 5; i++) { // Adjusted loop to generate 5 random characters
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }



  const generateReceipt = async () => {
    let doc = new jsPDF();
     // Fetch the image, and convert it to Base64 format
    const response = await fetch('https://global.ravelmobile.com/send_paperplane.png');
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    await new Promise(resolve => {
      reader.onloadend = () => {
        resolve();
      };
    });

    // Fetch the barcode image and convert it to Base64 format
    const barcodeResponse = await fetch('https://t3.ftcdn.net/jpg/02/55/97/94/360_F_255979498_vewTRAL5en9T0VBNQlaDBoXHlCvJzpDl.jpg');
    const barcodeBlob = await barcodeResponse.blob();
    const barcodeReader = new FileReader();
    barcodeReader.readAsDataURL(barcodeBlob);
    await new Promise(resolve => {
      barcodeReader.onloadend = () => {
        resolve();
      };
    });
    // Set the font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 112, 186); // Color for "RAVEL GLOBAL"

    doc.text("RAVEL GLOBAL PAY", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Moving Money for Better", doc.internal.pageSize.getWidth() / 2, 27, {
      align: "center",
    });

    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, 35, doc.internal.pageSize.getWidth() - 20, 35);

    // Add paper plane image before the greeting
    const paperPlaneImage = reader.result; // Base64 of the fetched image
    const imgWidth = 40; // choose your desired image width
    const imgHeight = 30; // choose your desired image height
    doc.addImage(paperPlaneImage, 'PNG', doc.internal.pageSize.getWidth() / 2 - imgWidth / 2, 37, imgWidth, imgHeight);

    // Add greeting
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 112, 186);
    doc.text(`Hi ${user?.userInfo?.firstName.toUpperCase()},`, doc.internal.pageSize.getWidth() / 2, 80, {
      align: "center",
    });

    // Set the font styles for receipt details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Add blue square with details
    const squareX = 60;
    const squareY = 90;
    const squareSize = 40; // Square size set to 40x40
    doc.setDrawColor(0, 112, 186); // Blue color
    doc.setFillColor(0, 112, 186);
    doc.rect(squareX, squareY, squareSize, squareSize, 'F');

    // Inside square details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color for text
    doc.text("Total Amount Paid:", squareX + 5, squareY + 15);


    // Making "Total Amount Paid" text bold by using a different font type
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount Paid:", squareX + 5, squareY + 15);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${selectedCurrency} ${transferamount}`, squareX + 5, squareY + 25);

    // Revert text color to normal outside the square
    doc.setTextColor(0, 0, 0); // Black color for text outside the square

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Sent To: ${firstName} ${lastName}`, squareX + squareSize + 10, squareY + 5);

    // Add the transaction ID
    const transID = generateRandomTransactionNumber();
    doc.text(`Transaction No: ${transID}`, squareX + squareSize + 10, squareY + 15);

    // Add the date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    doc.text(`Date: ${formattedDate}`, squareX + squareSize + 10, squareY + 25);

    doc.text(`Payment Type: Send Money`, squareX + squareSize + 10, squareY + 35);

    const phoneNumber = user?.primaryInfo?.phoneNumber;
    const obscuredPhoneNumber = phoneNumber ? `${phoneNumber.substr(0, 4)}****${phoneNumber.substr(-3)}` : "*********";
    doc.text(`Phone Number: ${obscuredPhoneNumber}`, squareX + squareSize + 10, squareY + 45);

    const barcodeImage = barcodeReader.result; // Base64 of the fetched barcode image
    const barcodeWidth = 160; // choose your desired barcode width
    const barcodeHeight = 30; // choose your desired barcode height
    const pageWidth1 = doc.internal.pageSize.getWidth();
    const barcodeX = (pageWidth1 - barcodeWidth) / 2; // Calculate the x-coordinate to center the barcode
    const barcodeY = squareY + squareSize + 20; // Set the y-coordinate below the square and details
    doc.addImage(barcodeImage, 'PNG', barcodeX, barcodeY, barcodeWidth, barcodeHeight);



    // Add footer line
    doc.setLineWidth(0.5);
    doc.line(20, doc.internal.pageSize.getHeight() - 20, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);

    // Footer content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("395 OYSTER POINT BLVD STE 500 SOUTH SAN FRANCISCO CA 94080-1933 USA", doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 15, {
      align: "center",
    });

    doc.text("support@ravelmobile.com", doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
      align: "center",
    });

    doc.save("Transfer Receipt.pdf");
  };


  async function handleTransferSubmit() {
    setIsLoading(true);

    try {
      const response = await api.post("/api/transfer", {
        userId: user.primaryInfo?._id,
        fromCurrency: selectedCurrency,
        payID: id,
        amount: transferamount,
      });
      if (response.status === 200) {
        const balanceResponse = await api.get("/api/getUserBalances", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "user-id": user?.primaryInfo?._id,
          },
        });

        if (balanceResponse.status === 200) {
          // Update the local storage with the new balances
          const updatedUser = {
            ...user,
            accounts: balanceResponse.data.accounts,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));

          login(updatedUser);
        }
        setIsLoading(false);
        setShowSuccess(true);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });
        setTransferDate(formattedDate);
        setTransferError("");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setTransferError(error.response.data.message);
        setIsLoading(false);
      } else {
        setTransferError("Error during transfer.");
        setIsLoading(false);
      }
    }
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    let newValue = '0.00';

    // Remove any non-digit characters from the entered value
    const sanitizedValue = inputValue.replace(/[^\d]/g, '');

    if (sanitizedValue !== '') {
      // Get the length of the sanitized value
      const valueLength = sanitizedValue.length;

      if (valueLength === 1) {
        // If only one digit is entered, update the decimal part
        newValue = `0.0${sanitizedValue}`;
      } else if (valueLength === 2) {
        // If two digits are entered, update the decimal part
        newValue = `0.${sanitizedValue}`;
      } else if (valueLength > 2) {
        // If more than two digits are entered, update the whole part and decimal part
        const wholePart = sanitizedValue.slice(0, valueLength - 2);
        const decimalPart = sanitizedValue.slice(valueLength - 2);
        newValue = `${wholePart}.${decimalPart}`;
      }
    }

    setTransferAmount(newValue);
  };

  return showSuccess ? (
    <div className={styles["animation-container"]}>
      <Lottie animationData={successAnimation} style={{ width: '200px', height: '200px' }} />
      <div className={styles["transfer-details"]}>
        <h2>Transfer Successful</h2>
        <p>
          <strong>Transfer ID:</strong> {transID}
        </p>
        <p>
          <strong>Receiver:</strong> {`${firstName} ${lastName}`}
        </p>
        <p>
          <strong>Amount:</strong> {`${transferamount} ${selectedCurrency}`}
        </p>
        <p>
          <strong>Date:</strong> {transferDate}
        </p>
      </div>
      <button className={styles["download-receipt"]} onClick={generateReceipt}>
        Download Receipt
      </button>

    </div>
  ) : (
    <div className={styles.buy}>
      <div className={styles.buyDiv1}>
        {transferError && <p className={styles.errorMessage}>{transferError}</p>}
        <div className={styles.forUsername}>
          <FaUser className={styles.forUsername1} />
          <p className={styles.forUsernameP}>{`${firstName} ${lastName}`}</p>
        </div>
        <div className={styles.dollaSign}>
          <div className={styles.currencyContainer}>
            <FaDollarSign className={styles.dSign} />
          </div>
          <input
            type="text"
            className={styles.finishRequestInput}
            value={transferamount}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.currencyDropdownContainer}>
          <select
            className={styles.currencyDropdown}
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className={styles.finishRequestInput1}
          placeholder="+ What's this payment for?"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      <div className={styles.eligible}>
        <p className={styles.eligibleP1}>
          Eligible purchases are covered by{" "}
          <Link className={styles.buyer}>Ravel Buyer Protection</Link>
        </p>
        <p className={styles.eligibleP2}>
          For more information please read our{" "}
          <Link className={styles.buyer}>user agreement.</Link>
        </p>
      </div>

      <div className={styles.btns2}>
        <button
          className={styles.continue1}
          disabled={isNextButtonDisabled || isLoading}
          onClick={handleTransferSubmit}
        >
          {isLoading ? "Processing..." : "Continue"}
        </button>

        <Link className={styles.continue2} to="/send-and-request/send-to">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default FinishRequest;
