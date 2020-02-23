import React from "react";
import { render } from "@testing-library/react";
import App from "./app";

test("renders title", () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/faster/i);
  expect(titleElement).toBeInTheDocument();
});
