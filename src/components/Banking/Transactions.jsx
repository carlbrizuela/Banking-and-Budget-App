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

    onTransaction(updatedUsers, {
      type,
      amount: amt,
      sender: sender || "N/A",
      receiver: receiver || "N/A",
      timestamp: new Date().toISOString(),
    });
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful!`);

    setAmount("");
    setSender("");
    setReceiver("");
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="display-5">{type.charAt(0).toUpperCase() + type.slice(1)} Transaction</h2>
      </div>

      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label">Transaction Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="form-select"
              >
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>

            {(type === "withdraw" || type === "transfer") && (
              <div className="mb-3">
                <label className="form-label">Sender Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter sender name"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                />
              </div>
            )}

            {(type === "deposit" || type === "transfer") && (
              <div className="mb-3">
                <label className="form-label">Receiver Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter receiver name"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className={`form-control ${error ? "is-invalid" : ""}`}
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <button type="button" className="btn btn-success w-100" onClick={handleTransaction}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
