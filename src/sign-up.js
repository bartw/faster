import React, { useState } from "react";
import { useFirebase } from "./firebase";

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  error
}) => (
  <div>
    <h2>Sign up</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={e => {
          setConfirmPassword(e.currentTarget.value);
        }}
        placeholder="Confirm password"
      />
      <button type="submit">Sign up</button>
      {error && <div>{error}</div>}
    </form>
  </div>
);

const SignUpFormContainer = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setError(null);

    const emailToSubmit = email.trim();

    if (!emailToSubmit.length) {
      setError("Please fill in an email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Please make sure the passwords match.");
      return;
    }

    firebase
      .signUp({ email, password })
      .then(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);
      })
      .catch(({ message }) => {
        setError(message);
      });
  };

  return (
    <SignUpForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default SignUpFormContainer;
