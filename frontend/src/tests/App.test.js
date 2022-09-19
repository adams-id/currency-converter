import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders introduction text", () => {
  render(<App />);
  const linkElement = screen.getByText(/A currency converter for/i);
  expect(linkElement).toBeInTheDocument();
});
