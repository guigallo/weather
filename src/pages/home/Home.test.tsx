import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders input", () => {
  render(<Home />);
  const input = screen.getByText(/Select your city/i);
  expect(input).toBeInTheDocument();
});
