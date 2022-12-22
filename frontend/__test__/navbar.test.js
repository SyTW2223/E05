import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "../src/components/navbar/navbar.component";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <Navbar />
    </Router>
  )
});

describe("Navbar Tests", () => {
  it("Debe haber un texto de My Story App", () => {
    const loginText = screen.getByRole('link', {name: /My Story App/i});
    expect(loginText).toBeInTheDocument();
  });
  it("Debe haber un boton para iniciar sesion", () => {
    const loginButton= screen.getByRole('link', {name: /iniciar sesion/i});
    expect(loginButton).toBeInTheDocument();
  });
  it("Debe haber un boton para registrarse", () => {
    const loginButton= screen.getByRole('link', {name: /registro/i});
    expect(loginButton).toBeInTheDocument();
  });
});