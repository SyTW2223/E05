import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Register } from "../src/components/auth/register.component";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <Register />
    </Router>
  )
});

describe("Register Tests", () => {
  it("Debe haber un texto de registro", () => {
    const loginText = screen.getByRole('heading', {level: 4});
    expect(loginText).toBeInTheDocument();
  });
  // it("Debe haber una entrada de texto para el nombre", () => {
  //   const nameInput = screen.getByLabelText(/fullname/i);
  //   expect(nameInput).toBeInTheDocument();
  // });
  it("Debe haber una entrada de texto para el nombre de usuario", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
  });
  it("Debe haber una entrada de texto para el email", () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
  it("Debe haber una entrada de texto para la contraseña", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it("Debe haber un boton para registrarse", () => {
    const loginButton= screen.getByRole('button', {name: /registrarse/i});
    expect(loginButton).toBeInTheDocument();
  });
});