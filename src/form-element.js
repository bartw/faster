import React from "react";

const FormElement = ({ label, htmlFor, children }) => (
  <div className="mt-2">
    <label className="block" htmlFor={htmlFor}>
      {label}
    </label>
    {children}
  </div>
);

export default FormElement;
