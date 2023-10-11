import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CustomDatePicker from "./CustomDatePicker";

describe("CustomDatePicker Component", () => {
  test("renders CustomDatePicker component without errors", () => {
    render(<CustomDatePicker />);
  });

  test("does not call onChange when either start or end date is missing", () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(<CustomDatePicker onChange={onChangeMock} />);
    fireEvent.click(getByText("Apply"));
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
