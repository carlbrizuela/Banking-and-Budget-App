import React, { useState } from "react";

const Transactions = ({ onTransaction, users }) => {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");
  const [error, setError] = useState("");

  const validateTransaction = (type, senderIndex, receiverIndex, amt, users) => {
    if (isNaN(amt) || amt <= 0) return "Amount must be a positive number.";

    if (type === "deposit" && receiverIndex === -1) return "Receiver does not exist.";
    if (type === "withdraw") {
      if (senderIndex === -1) return "Sender does not exist.";
      if (users[senderIndex].balance < amt) return "Insufficient funds.";
    }
    if (type === "transfer") {
      if (senderIndex === -1) return "Sender does not exist.";
      if (receiverIndex === -1) return "Receiver does not exist.";
      if (users[senderIndex].balance < amt) return "Sender has insufficient funds.";
    }

    return null;
  };

  const handleTransaction = () => {
    const amt = parseFloat(amount);
    setError("");

    const senderIndex = users.findIndex(
      (u) => u.name.toLowerCase() === sender.toLowerCase()
    );
    const receiverIndex = users.findIndex(
      (u) => u.name.toLowerCase() === receiver.toLowerCase()
    );

    const errorMsg = validateTransaction(type, senderIndex, receiverIndex, amt, users);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const updatedUsers = users.map((user, idx) => {
      if (type === "deposit" && idx === receiverIndex) {
        return { ...user, balance: user.balance + amt };
      }
      if (type === "withdraw" && idx === senderIndex) {
        return { ...user, balance: user.balance - amt };
      }
      if (type === "transfer") {
        if (idx === senderIndex) return { ...user, balance: user.balance - amt };
        if (idx === receiverIndex) return { ...user, balance: user.balance + amt };
      }
      return user;
    });

    onTransaction(updatedUsers);
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);

    setAmount("");
    setSender("");
    setReceiver("");
  };

  return (
    <div>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Transaction</h2>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
        <option value="transfer">Transfer</option>
      </select>
      <br /><br />

      {(type === "withdraw" || type === "transfer") && (
        <input
          placeholder="Sender Name"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      )}
      <br />

      {(type === "deposit" || type === "transfer") && (
        <input
          placeholder="Receiver Name"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      )}
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      {error && <p className="error">{error}</p>}

      <button onClick={handleTransaction}>Submit</button>
    </div>
  );
};

export default Transactions;
