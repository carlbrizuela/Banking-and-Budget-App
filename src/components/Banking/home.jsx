import React from "react";

const formatPeso = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

const Home = ({ users }) => {
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

  return (
    <div>
      <h1>Bank Dashboard</h1>
      <p>Total Users: {users.length}</p>
      <p>Total Balance: {formatPeso(totalBalance)}</p>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatPeso(user.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
