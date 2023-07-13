import React, { useState,useEffect} from "react";
import styles from "./Widthdraw.module.css";
import { Navbar } from "../SoleComponents";
import { useUser } from "../context";
import api from "../../api";
import Lottie from "lottie-react";
import successAnimation from "./success-animation.json";
import jsPDF from "jspdf";

const Withdraw = () => {
  const { user } = useUser();
  const accounts = user?.accounts;

  const getUniqueCurrencies = (accounts) => {
    const uniqueCurrencies = Array.from(new Set(accounts.map((account) => account.currency)));
    uniqueCurrencies.sort((a, b) => {
      const balanceA = accounts.find((account) => account.currency === a)?.balance || 0;
      const balanceB = accounts.find((account) => account.currency === b)?.balance || 0;
      return balanceB - balanceA;
    });
    return uniqueCurrencies;
  };

  const currencies = getUniqueCurrencies(accounts);

  const highestBalanceCurrency = currencies.find((currency) => {
    const balance = accounts.find((account) => account.currency === currency)?.balance || 0;
    return balance > 0;
  });
  const initialSelectedCurrency = highestBalanceCurrency || "USD";
  const [selectedCurrency, setSelectedCurrency] = useState(initialSelectedCurrency);
  const [amountwithdrawal, setAmountWithdrawal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [withdrawalResponse, setWithdrawalResponse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);



  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const getBalanceForCurrency = (currency) => {
    const account = accounts.find((acc) => acc.currency === currency);
    return account ? account.balance : 0;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/withdrawal', {
        amount: parseFloat(amountwithdrawal),
        currency: selectedCurrency,
        userId: user.primaryInfo?._id,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setWithdrawalResponse(response.data); // Storing the response into state
      setShowSuccess(true);
      setError(null); 
    } catch (error) {
      // Handle error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); 
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPendingWithdrawal = async () => {
    try {
      const response = await api.get('/api/pending-withdrawal', {
        headers: { Authorization: `Bearer ${user.token}` }, // Pass the user token
        params: { userId: user?.primaryInfo?._id }, // Pass the userId in the params
      });

      if (response.status === 200) {
        setPendingWithdrawal(response.data.withdrawal);
      }
    } catch (error) {
      console.error("Error fetching pending withdrawal:", error);
    }
  };

  useEffect(() => {
    fetchPendingWithdrawal();
  }, []);

  function generateRandomTransactionNumber() {
    const prefix = "RGP";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    for (let i = 0; i < 5; i++) { // Adjusted loop to generate 5 random characters
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  const transID = generateRandomTransactionNumber();

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
    doc.text("Total Amount:", squareX + 5, squareY + 15);


    // Making "Total Amount Paid" text bold by using a different font type
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", squareX + 5, squareY + 15);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${selectedCurrency} ${amountwithdrawal}`, squareX + 5, squareY + 25);

    // Revert text color to normal outside the square
    doc.setTextColor(0, 0, 0); 

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Name: ${user?.userInfo?.firstName.toUpperCase()} ${user?.userInfo?.lastName.toUpperCase()}`, squareX + squareSize + 10, squareY + 5);

    // Add the transaction ID
   
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
    doc.text(`Transaction Date: ${formattedDate}`, squareX + squareSize + 10, squareY + 25);

    doc.text(`Transaction Type: Withdrawal`, squareX + squareSize + 10, squareY + 35);

    const phoneNumber = user?.primaryInfo?.phoneNumber;
    doc.text(`Phone Number: ${phoneNumber}`, squareX + squareSize + 10, squareY + 45);

    doc.text(`Transaction Status: In Progress`, squareX + squareSize + 10, squareY + 55);

    const barcodeImage = barcodeReader.result; // Base64 of the fetched barcode image
    const barcodeWidth = 160; // choose your desired barcode width
    const barcodeHeight = 30; // choose your desired barcode height
    const pageWidth1 = doc.internal.pageSize.getWidth();
    const barcodeX = (pageWidth1 - barcodeWidth) / 2; // Calculate the x-coordinate to center the barcode
    const barcodeY = squareY + squareSize + 30; // Set the y-coordinate below the square and details
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

    doc.save("Withdraw Receipt.pdf");
  };
  return (
    showSuccess ? (
      <div className={styles.centeredContainer}>
        <div className={styles.animationcontainer}>
          <div className={styles.centeredContent}>
            <Lottie animationData={successAnimation} style={{ width: '200px', height: '200px' }} />
            <div className={styles.transferdetails}>
              <h2>Successful</h2>
              <p>
                <strong>Withdraw ID:</strong> {`${transID}`}
              </p>
              <p>
                <strong>Channel:</strong> Mpesa
              </p>
              <p>
                <strong>Amount:</strong> {`${amountwithdrawal} ${selectedCurrency}`}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString("en-US", {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true})}
              </p>
            </div>
            <div className={styles.centeredButton}>
              <button className={styles.downloadreceipt} onClick={generateReceipt}>
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <>
        <Navbar />
        <section className={styles.pyplWithdrawSection}>
          <div className={styles.mainWithdrawContent}>
            <div className={styles.introHeader}>
              <h1>Withdraw from your Ravel account</h1>
            </div>
  
            <div className={styles.withdrawWrapperSplitter}>
              <div className={styles.withdrawContainer}>
              {pendingWithdrawal && (
                    <div className="alert alert-info">
                      Your withdrawal request ({pendingWithdrawal.transactionId}) of {pendingWithdrawal.amount} {pendingWithdrawal.currency} will be completed within 1-3 days.
                    </div>


                  )}
                <h5>
                  Available balance in your Ravel account:
                  {error && <p className={styles.errorMessage}>{error}</p>}
                  <div className={styles.balanceContainer}>
                    <h5 className={styles.balance}>{getBalanceForCurrency(selectedCurrency)}</h5>
                    <select
                      className={styles.customSelect}
                      name=""
                      id=""
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                    >
                      {/* Render the currency options */}
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </h5>
                <p>Please enter the amount you would like to withdraw from your Ravel account:</p>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    id=""
                    value={amountwithdrawal}
                    onChange={(e) => setAmountWithdrawal(e.target.value)}
                    required
                  />
                  <select name="" id="" className={styles.customSelect}>
                    <option value="USD" selected>
                      {selectedCurrency}
                    </option>
                  </select>
                </div>
                <div className={styles.buttonContainer}>
                  <button disabled={loading} onClick={handleSubmit}>
                    {loading ? 'Processing...' : 'Continue to Withdraw'}
                  </button>
                  {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
                </div>
              </div>
              <div className={styles.svgTransferIllustration}>
                <img src="/ravel-withdraw.png" alt="transfer-illustration" />
              </div>
            </div>
          </div>
          <div className={styles.importantInfo}>
            <p>
              Please note that the maximum amount per transaction is 150,000 KES and you can only hold up to 300,000 KES
              in your M-PESA account. Make sure your M-PESA account can hold your withdrawal balance.
            </p>
          </div>
         
          </section>
        </>
      )
    );
  };

export default Withdraw;
