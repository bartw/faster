import React from "react";

const Input = ({ id, placeholder, type, value, onChange, min, max, step }) => (
  <input
    id={id}
    name={id}
    type={type}
    className="rounded border px-4 py-2"
    value={value}
    onChange={e => {
      onChange(e.currentTarget.value);
    }}
    placeholder={placeholder}
    min={min}
    max={max}
    step={step}
  />
);

export default Input;
