import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";

test("renders Header component", () => {
  const { getByText } = render(
    <Router>
      <Header />
    </Router>
  );

  const addUserLink = getByText("Add User");
  const dashboardLink = getByText("Dashboard");

  expect(addUserLink).toBeInTheDocument();
  expect(dashboardLink).toBeInTheDocument();
});
