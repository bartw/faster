import React, { useState, useEffect } from "react";
import { useFirebase } from "./firebase";
import FormElement from "./form-element";
import Button from "./button";
import Input from "./input";

const MIN = 40;
const MAX = 160;
const STEP = 0.1;

const ScaleForm = ({ weight, setWeight, onSubmit, error }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <FormElement label="Weight" htmlFor="weight">
      <div>
        <input
          type="range"
          value={weight}
          onChange={e => {
            setWeight(e.currentTarget.value);
          }}
          min={MIN}
          max={MAX}
          step={STEP}
          className="w-full"
        />
      </div>
      <Input
        id="weight"
        type="number"
        value={weight}
        onChange={setWeight}
        min={MIN}
        max={MAX}
        step={STEP}
        placeholder="Weight"
      />
    </FormElement>
    <Button type="submit">Submit</Button>
    {!!error && <div>{error}</div>}
  </form>
);

const ScaleFormContainer = () => {
  const firebase = useFirebase();

  const [loading, setLoading] = useState(true);
  const [weight, setWeight] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    firebase.getLastWeight().then(lastWeight => {
      setWeight(lastWeight ?? 60);
      setLoading(false);
    });
  }, [firebase]);

  const handleSubmit = () => {
    setError(null);

    firebase.addWeight({ weight }).catch(({ message }) => {
      setError(message);
    });
  };

  return (
    <div>
      {loading && <span>Loading...</span>}
      {!loading && (
        <ScaleForm
          weight={weight}
          setWeight={setWeight}
          onSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
};

export default ScaleFormContainer;
