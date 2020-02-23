import React from "react";

const Button = ({ type, onClick = () => {}, children }) => (
  <button
    className="rounded text-gray-100 bg-green-600 px-4 py-2 mt-2"
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
