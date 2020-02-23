import React, { useState } from "react";
import { useFirebase } from "./firebase";
import FormElement from "./form-element";
import Button from "./button";
import Input from "./input";

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
      <Button type="submit">Log in</Button>
      {!!error && <div>{error}</div>}
    </form>
  </div>
);

const LogInFormContainer = () => {
  const firebase = useFirebase();

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
