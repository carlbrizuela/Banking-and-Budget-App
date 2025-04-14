import React, { useState } from "react";
import "./App.css";
import CreateUser from "./components/Banking/CreateUser";
import Transactions from "./components/Banking/Transactions";
import Home from "./components/Banking/Home";
import HomeBudget from "./components/Budget/HomeBudget";
import "bootstrap/dist/css/bootstrap.min.css";
import TransactionHistory from "./components/Banking/TransactionHistory";

function App() {
  const [users, setUsers] = useState([
    { name: "Juan Miguel", email: "juanmiguel@email.com", balance: 10000 },
    { name: "Mary Ann", email: "maryann@email.com", balance: 5000 },
  ]);

  const [view, setView] = useState("home");

  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleCreateUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleTransaction = (updatedUsers, transactionDetails) => {
    setUsers(updatedUsers);
    setTransactionHistory((prev) => [...prev, transactionDetails]);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Bank Name</span>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
            <li className="nav-item">
              <button
                className="btn btn-light"
                onClick={() => handleChangeView("home")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light"
                onClick={() => handleChangeView("create")}
              >
                Create User
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light"
                onClick={() => handleChangeView("transactions")}
              >
                Transactions
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light"
                onClick={() => handleChangeView("history")}
              >
                History
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-light"
                onClick={() => handleChangeView("budget")}
              >
                Budget Tracker
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {view === "home" && <Home users={users} />}
      {view === "create" && (
        <CreateUser onCreateUser={handleCreateUser} users={users} />
      )}
      {view === "transactions" && (
        <Transactions onTransaction={handleTransaction} users={users} />
      )}
      {view === "budget" && <HomeBudget />}
      {view === "history" && (
        <TransactionHistory history={transactionHistory} />
      )}
    </div>
  );
}

export default App;
