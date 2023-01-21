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
  it("Debe haber un mensaje explicativo de lo que contiene la pagina", () => {
    const explainText = screen.getByText('Con esta página web podrás estar al día con tus series, películas y libros favoritos personalizando tus propias listas de visionado.');
    expect(explainText).toBeInTheDocument();
  });
  it("Debe haber un titulo para los ultimos añadidos", () => {
    const recentlyAddedText = screen.getByRole('heading', {level: 2});
    expect(recentlyAddedText).toBeInTheDocument();
  });
  it("En el carousel de las películas se debe mostrar los botones para ir a la siguiente pagina", () => {
    const carouselIndications = screen.getByRole('list', {class: "carousel-indicators"});
    expect(carouselIndications).toBeInTheDocument();
  });
  it("Se muestra una imagen de la pelicula avatar", () => {
    const avatarImage = screen.getByRole('img', {name: "Cartelera Avatar 2"});
    expect(avatarImage).toBeInTheDocument();
  });
  it("Se muestra una imagen de La casa de Papel", () => {
    const moneyHeistImage = screen.getByRole('img', {name: "Cartelera La Casa de Papel 5"});
    expect(moneyHeistImage).toBeInTheDocument();
  });
  it("Se muestra una imagen de Cuando era Divertido", () => {
    const bookImage = screen.getByRole('img', {name: "Portada libro Cuando era divertido"});
    expect(bookImage).toBeInTheDocument();
  });
});