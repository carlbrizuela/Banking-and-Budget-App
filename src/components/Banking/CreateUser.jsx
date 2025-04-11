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
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="error">{nameError}</p>}
        <br /><br />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}
        <br /><br />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <br /><br />

        <input
          placeholder="Initial Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        {balanceError && <p className="error">{balanceError}</p>}
        <br /><br />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
