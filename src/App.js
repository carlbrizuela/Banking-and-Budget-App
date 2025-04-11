import React, { useState } from "react";
import "./App.css";
import CreateUser from "./components/Banking/CreateUser";
import Transactions from "./components/Banking/Transactions";
import Home from "./components/Banking/Home";

function App() {
  const [users, setUsers] = useState([
    { name: "Juan Miguel", email: "juanmiguel@email.com", balance: 10000 },
    { name: "Mary Ann ", email: "maryann@email.com", balance: 5000 },
  ]);

  const [view, setView] = useState("home");

  const handleCreateUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleTransaction = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  const handleChangeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
        <button onClick={() => handleChangeView("home")}>Home</button>
        <button onClick={() => handleChangeView("create")}>Create User</button>
        <button onClick={() => handleChangeView("transactions")}>
          Transactions
        </button>
      </nav>

      {view === "home" && <Home users={users} />}
      {view === "create" && (
        <CreateUser onCreateUser={handleCreateUser} users={users} />
      )}
      {view === "transactions" && (
        <Transactions onTransaction={handleTransaction} users={users} />
      )}
    </div>
  );
}

export default App;
