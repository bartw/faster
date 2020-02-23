import React from "react";
import { render } from "@testing-library/react";
import Home from "./home";

test("renders title", () => {
  const { getByText } = render(<Home />);
  const titleElement = getByText(/Home/i);
  expect(titleElement).toBeInTheDocument();
});
