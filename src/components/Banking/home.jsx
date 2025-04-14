import React from "react";

const formatPeso = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);

const Home = ({ users }) => {
  const totalBalance = users.reduce((sum, user) => sum + user.balance, 0);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">Bank Dashboard</h1>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card text-white mb-3" style={{ backgroundColor: '#387D7A' }} >
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-white mb-3" style={{ backgroundColor: '#32936F' }}>
            <div className="card-body">
              <h5 className="card-title">Total Balance</h5>
              <p className="card-text fs-4">{formatPeso(totalBalance)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
    </div>
  );
};

export default Home;
