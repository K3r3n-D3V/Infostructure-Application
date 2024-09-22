import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaCreditCard,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import "./BankDetails.css";

const BankDetails = () => {
  const [bankDetails, setBankDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState("0.00"); // Default balance value
  const [transactions, setTransactions] = useState([]); // Default empty array for transactions

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bankdetails");
        setBankDetails(response.data);
        setBalance(response.data.balance || "0.00");
        setTransactions(response.data.transactions || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <ProductNavbar/> */}

      <header className="header">
        <div className="assistant">
          <FaUser /> Online Assistant
        </div>
        <div className="logout">
          <FaSignOutAlt /> Log Out
        </div>
      </header>

      <div className="dashboard">
        <nav className="sidebar">
          <ul>
            <li>
              <FaCreditCard /> My Bank
            </li>
            <li>Cards</li>
            <li>Transfers</li>
            <li>Payments</li>
            <li>Settings</li>
          </ul>
        </nav>

        <div className="main-content">
          <div className="card-details">
            <h2>My Bank</h2>
            <div className="card">
              <div className="card-info">
                <p>Account Number: {bankDetails.AccountNumber}</p>
                <p>Account Holder: {bankDetails.AccountHolder}</p>
                <p>Bank Name: {bankDetails.BankName}</p>
                {/* Add more details as required */}
              </div>
            </div>
          </div>

          <div className="statistics">
            <h2>Statistics</h2>
            <div className="balance">
              <h3>Balance</h3>
              <p>{balance}</p>
            </div>

            <div className="chart">
              <h3>Income vs. Expenses</h3>
              <ul>
                {transactions.map((item, index) => (
                  <li key={index}>
                    {item.month}: Income - {item.income}, Expenses -{" "}
                    {item.expenses}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
