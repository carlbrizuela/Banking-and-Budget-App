import React, { useState } from "react";

const CreateUser = ({ onCreateUser, users }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [balanceError, setBalanceError] = useState("");

  const validateUserInput = (name, email, password, balance, users) => {
    const errors = {};

    if (!name) errors.name = "Name is required.";
    else if (/^\d/.test(name)) errors.name = "Name cannot start with a number.";
    else if (users.find((user) => user.name === name))
      errors.name = "A user with this name already exists.";

    if (!email) errors.email = "Email is required.";
    else if (users.find((user) => user.email === email))
      errors.email = "A user with this email already exists.";

    if (!password) errors.password = "Password is required.";

    if (balance === "") errors.balance = "Balance is required.";
    else if (parseFloat(balance) < 0)
      errors.balance = "Balance cannot be negative.";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateUserInput(name, email, password, balance, users);

    setNameError(errors.name || "");
    setEmailError(errors.email || "");
    setPasswordError(errors.password || "");
    setBalanceError(errors.balance || "");

    if (Object.keys(errors).length > 0) return;

    const newUser = {
      name,
      email,
      password,
      balance: parseFloat(balance),
      expenses: [],
    };

    onCreateUser(newUser);
    alert("User created successfully!");

    setName("");
    setEmail("");
    setPassword("");
    setBalance("");
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2 className="display-5">Create New User</h2>
      </div>

      <div className="card mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${nameError ? "is-invalid" : ""}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
              />
              {nameError && <div className="invalid-feedback">{nameError}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Initial Balance</label>
              <input
                type="number"
                className={`form-control ${balanceError ? "is-invalid" : ""}`}
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="Enter starting balance"
              />
              {balanceError && (
                <div className="invalid-feedback">{balanceError}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
