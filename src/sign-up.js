import React, { useState } from "react";
import { useFirebase } from "./firebase";
import FormElement from "./form-element";
import Button from "./button";
import Input from "./input";

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
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <FormElement label="Email" htmlFor="email">
      <Input
        id="email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Email"
      />
    </FormElement>
    <FormElement label="Password" htmlFor="password">
      <Input
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Password"
      />
    </FormElement>
    <FormElement label="Confirm password" htmlFor="confirmPassword">
      <Input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="Confirm password"
      />
    </FormElement>
    <Button type="submit">Sign up</Button>
    {error && <div>{error}</div>}
  </form>
);

const SignUpFormContainer = ({ history }) => {
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
        history.push("/scale");
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
