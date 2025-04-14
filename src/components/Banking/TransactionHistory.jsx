import React from "react";

const TransactionHistory = ({ history }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 display-4" >Transaction History</h2>
      {history.length === 0 ? (
        <p className="text-muted text-center">No transactions yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.type}</td>
                  <td>{txn.sender}</td>
                  <td>{txn.receiver}</td>
                  <td>₱{txn.amount.toFixed(2)}</td>
                  <td>{new Date(txn.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;