import React, { useState, useEffect } from "react";
import { useFirebase } from "./firebase";
import FormElement from "./form-element";
import Button from "./button";
import Input from "./input";

const ScaleForm = ({ weight, setWeight, onSubmit, error }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <FormElement label="Weight" htmlFor="weight">
      <Input
        id="weight"
        type="number"
        value={weight}
        onChange={setWeight}
        placeholder="Weight"
      />
    </FormElement>
    <Button type="submit">Submit</Button>
    {!!error && <div>{error}</div>}
  </form>
);

const ScaleFormContainer = () => {
  const firebase = useFirebase();

  const [weights, setWeights] = useState([]);
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState("");

  const updateWeights = () => {
    firebase.getWeights().then(weights => {
      setWeights(weights);
    });
  };

  useEffect(() => {
    updateWeights();
  });

  const handleSubmit = () => {
    setError(null);

    firebase
      .addWeight({ weight })
      .then(() => {
        updateWeights();
      })
      .catch(({ message }) => {
        setError(message);
      });
  };

  return (
    <div>
      <ScaleForm
        weight={weight}
        setWeight={setWeight}
        onSubmit={handleSubmit}
        error={error}
      />
      <ul>
        {weights.map(({ weight, timestamp }) => (
          <li key={timestamp.getTime()}>
            <time>{timestamp.toString()}</time>
            <div>{weight}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScaleFormContainer;
