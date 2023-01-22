import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Footer } from "../src/components/footer/footer.component";

beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(
    <Router>
      <Footer />
    </Router>
  )
});

describe("Footer tests: ", () => {
  it("Debe existir un footer", () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });
  it("Debe mostrar el nombre de la app", () => {
    const nameApp = screen.getByRole('heading', {level: 5, name: "My Story App"});
    expect(nameApp).toBeInTheDocument();
  });
  it("Debe haber una seccion llamada acerca de nosotros", () => {
    const aboutUs = screen.getByRole('heading', {level: 5, name: "Acerca de nosotros"});
    expect(aboutUs).toBeInTheDocument();
  });
  it("Debe haber una seccion llamada nuestras redes sociales", () => {
    const socialMedia = screen.getByRole('heading', {level: 5, name: "Nuestras redes sociales"});
    expect(socialMedia).toBeInTheDocument();
  });
  it("Debe haber una seccion donde se indiquen los nombres de los componentes del equipo de trabajo", () => {
    const names = screen.getByRole('list', {name: "contributors"});
    expect(names).toBeInTheDocument();
  });
  it("Componente del equipo: andrea", () => {
    const andreaName = screen.getByRole('listitem', {name: "andrea"});
    expect(andreaName).toBeInTheDocument();
  });
  it("Componente del equipo: ainoa", () => {
    const ainoaName = screen.getByRole('listitem', {name: "ainoa"});
    expect(ainoaName).toBeInTheDocument();
  });
  it("Componente del equipo: karina", () => {
    const karinaName = screen.getByRole('listitem', {name: "karina"});
    expect(karinaName).toBeInTheDocument();
  });
  it("Nombre completo: andrea", () => {
    const andreaFull = screen.getByRole('link', {name: "Andrea Hernández Martín"});
    expect(andreaFull).toBeInTheDocument();
  });
  it("Nombre completo: ainoa", () => {
    const ainoaFull = screen.getByRole('link', {name: "Ainoa Iglesias Dasilva"});
    expect(ainoaFull).toBeInTheDocument();
  });
  it("Nombre completo: karina", () => {
    const karinaFull = screen.getByRole('link', {name: "Karina Kalwani Israni"});
    expect(karinaFull).toBeInTheDocument();
  });
  it("Debe haber una seccion donde se indiquen las redes sociales", () => {
    const sociales = screen.getByRole('list', {name: "socialMedia"});
    expect(sociales).toBeInTheDocument();
  });
  it("Red social: instagram", () => {
    const instagram = screen.getByRole('button', {name: "instagram"});
    expect(instagram).toBeInTheDocument();
  });
  it("Red social: twitter", () => {
    const twitter = screen.getByRole('button', {name: "twitter"});
    expect(twitter).toBeInTheDocument();
  });
  it("Red social: twitch", () => {
    const twitch = screen.getByRole('button', {name: "twitch"});
    expect(twitch).toBeInTheDocument();
  });
  it("MDBootstrap.com", () => {
    const bootstrap = screen.getByRole('link', {name: "MDBootstrap.com"});
    expect(bootstrap).toBeInTheDocument();
  });
});