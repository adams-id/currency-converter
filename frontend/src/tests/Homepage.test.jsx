import React from "react";
import App from "../App";
import {
  render,
  fireEvent,
  waitFor,
  screen
} from "@testing-library/react";

test("renders currency converter modal", async () => {
  render(<App />);
  await waitFor(() => {
    // check if coverter modal is fully rendered
    expect(screen.getByText("Currency Converter")).toBeInTheDocument();
  });
});

test("user gets converted amount", async () => {
  render(<App />);
  // fill out amount
  const amountInput = screen.getByPlaceholderText(/Amount/i);

  fireEvent.change(amountInput, { target: { value: 1000 } });

  expect(screen.getByText("Convert")).toBeInTheDocument();

  const button = screen.queryByText("Convert");
  

  fireEvent.click(button);
  const output = await screen.findAllByText(/=/i);
  // check that the page rendered the amount
  expect(output[0]).toHaveClass('output');
});