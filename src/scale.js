import React, { useState, useEffect } from "react";
import { useFirebase } from "./firebase";
import FormElement from "./form-element";
import PressAndHoldButton from "./press-hold-button";
import Button from "./button";

const MIN = 40;
const MAX = 160;
const STEP = 0.1;

const ScaleForm = ({
  weight,
  setWeight,
  decreaseWeight,
  increaseWeight,
  onSubmit,
  error
}) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <FormElement label="Weight" htmlFor="weight">
      <div className="border border-green-600 inline-block">
        <PressAndHoldButton
          type="button"
          className="text-gray-100 bg-green-600 px-4 py-2"
          onFire={decreaseWeight}
        >
          -
        </PressAndHoldButton>
        <input
          id="weight"
          type="number"
          value={weight}
          onChange={e => {
            setWeight(+e.currentTarget.value);
          }}
          min={MIN}
          max={MAX}
          step={STEP}
          placeholder="Weight"
          className="px-4 py-2"
        />
        <PressAndHoldButton
          type="button"
          className="text-gray-100 bg-green-600 px-4 py-2"
          onFire={increaseWeight}
        >
          +
        </PressAndHoldButton>
      </div>
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

  const setRoundedWeight = newWeight => {
    setWeight(Math.round(newWeight * 10) / 10);
  };

  useEffect(() => {
    firebase.getLastWeight().then(lastWeight => {
      setRoundedWeight(lastWeight ?? 60);
      setLoading(false);
    });
  }, [firebase]);

  const decreaseWeight = times => {
    const newWeight = weight - STEP * times;

    if (newWeight < MIN) {
      setRoundedWeight(MIN);
      return;
    }

    setRoundedWeight(newWeight);
  };

  const increaseWeight = times => {
    const newWeight = weight + STEP * times;

    if (newWeight > MAX) {
      setRoundedWeight(MAX);
      return;
    }

    setRoundedWeight(newWeight);
  };

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
          setWeight={setRoundedWeight}
          decreaseWeight={decreaseWeight}
          increaseWeight={increaseWeight}
          onSubmit={handleSubmit}
          error={error}
        />
      )}
    </div>
  );
};

export default ScaleFormContainer;
