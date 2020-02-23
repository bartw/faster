import React, { useState, useContext } from "react";
import { FirebaseContext } from "./firebase";

const LogInForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  error
}) => (
  <div>
    <h2>Log in</h2>
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="email"
        value={email}
        onChange={e => {
          setEmail(e.currentTarget.value);
        }}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => {
          setPassword(e.currentTarget.value);
        }}
        placeholder="Password"
      />
      <button type="submit">Log in</button>
      {!!error && <div>{error}</div>}
    </form>
  </div>
);

const LogInFormContainer = () => {
  const firebase = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setError(null);

    const emailToSubmit = email.trim();

    if (!emailToSubmit.length) {
      setError("Please fill in an email address.");
      return;
    }

    firebase
      .logIn({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
      })
      .catch(({ message }) => {
        setError(message);
      });
  };

  return (
    <LogInForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LogInFormContainer;
