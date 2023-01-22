import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../testUtils";
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
const userMock = {
    "username": "TestFront",
    "password": "testfront",
    "email": "test@gmail.com"
}

describe("Register Tests", () => {
  it("Debe haber un texto de registro", () => {
    const loginText = screen.getByRole('heading', {level: 4});
    expect(loginText).toBeInTheDocument();
  });
  it("Debe haber una entrada de texto para el nombre de usuario", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
  });
  it("Se debe introducir el nombre de usuario", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, {target: {value: 'abc'}});
    expect(usernameInput.value).toBe('abc');
  });
  it("Debe haber una entrada de texto para el email", () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });
  it("Se debe introducir el email", () => {
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, {target: {value: 'abc@gmail.com'}});
    expect(emailInput.value).toBe('abc@gmail.com');
  });
  it("Debe haber una entrada de texto para la contraseña", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it("Se debe introducir la contraseña", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, {target: {value: 'abc'}});
    expect(passwordInput.value).toBe('abc');
  });
  it("Debe haber un boton para registrarse", () => {
    const loginButton= screen.getByRole('button', {name: /registrarse/i});
    expect(loginButton).toBeInTheDocument();
  });



  it("Se recibe error por ..", () => {
    const response = Register();
    expect(response).resolves.toEqual(userMock);
  });
});