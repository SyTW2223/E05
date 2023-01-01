import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Home } from "../src/components/home/home.component";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <Home />
    </Router>
  )
});

describe("Home tests", () => {
  it("Debe haber un mensaje de bienvenida", () => {
    const welcomeText = screen.getByRole('heading', {level: 1});
    expect(welcomeText).toBeInTheDocument();
  });
});