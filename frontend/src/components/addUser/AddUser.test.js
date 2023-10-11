import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddUser from "./AddUser";

jest.mock("../../utils/request", () => ({
  request: jest.fn(),
}));

describe("AddUser Component", () => {
  it("renders AddUser component correctly", () => {
    const { getByLabelText, getByText } = render(<AddUser />);
    const userIdInput = getByLabelText("User Id:");
    const addButton = getByText("Add User Id");

    expect(userIdInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it("handles form submission and displays success message", async () => {
    const { getByLabelText, getByText } = render(<AddUser />);
    const userIdInput = getByLabelText("User Id:");
    const addButton = getByText("Add User Id");

    const mockResponse = { message: "User Id added successfully" };
    require("../../utils/request").request.mockResolvedValueOnce(mockResponse);

    fireEvent.change(userIdInput, { target: { value: "testuser" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(require("../../utils/request").request).toHaveBeenCalledWith({
        method: "POST",
        url: "/helloworld",
        userData: "testuser",
      });
      expect(getByText("User Id added successfully")).toBeInTheDocument();
    });
  });

  it("handles form submission and displays error message", async () => {
    const { getByLabelText, getByText } = render(<AddUser />);
    const userIdInput = getByLabelText("User Id:");
    const addButton = getByText("Add User Id");

    const errorMessage = "User Id already exists";
    require("../../utils/request").request.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    fireEvent.change(userIdInput, { target: { value: "testuser" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(require("../../utils/request").request).toHaveBeenCalledWith({
        method: "POST",
        url: "/helloworld",
        userData: "testuser",
      });
      expect(getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
