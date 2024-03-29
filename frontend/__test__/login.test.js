import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Login } from "../src/components/auth/login.component";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <Login />
    </Router>
  )
});

describe("Login Tests", () => {
  it("Debe haber un texto de inicio de sesión", () => {
    const loginText = screen.getByRole('heading', {level: 4});
    expect(loginText).toBeInTheDocument();
  });
  it("Debe haber una entrada de texto para el nombre de usuario", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
  });
  it("El nombre de usuario introducido debe ser correcto", () => {
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, {target: {value: 'abc'}});
    expect(input.value).toBe('abc');
  });
  it("Debe haber una entrada de texto para la contraseña", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });
  it("La contraseña introducida debe ser correcta", () => {
    const input = screen.getByLabelText('Password');
    fireEvent.change(input, {target: {value: 'abc'}});
    expect(input.value).toBe('abc');
  });
  it("Debe haber un boton para iniciar sesion", () => {
    const loginButton= screen.getByRole('button', {name: /iniciar sesion/i});
    expect(loginButton).toBeInTheDocument();
  });
  it("Debe haber un texto en caso de que no tengas cuenta", () => {
    const signupText = screen.getByText(/¿No tienes cuenta?/i);
    expect(signupText).toBeInTheDocument();
  });
  it("Debe haber un boton para registrarse", () => {
    const loginButton= screen.getByRole('link', {name: /¡regístrate ahora!/i});
    expect(loginButton).toBeInTheDocument();
  });
});