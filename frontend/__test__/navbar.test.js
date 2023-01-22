// import React from "react";
// import "@testing-library/jest-dom";
// import { render, screen } from "../testUtils";
// import { BrowserRouter as Router } from "react-router-dom";

// import { Navbar } from "../src/components/navbar/navbar.component";

// beforeEach(() => {
//   // eslint-disable-next-line testing-library/no-render-in-setup
//   render(
//     <Router>
//       <Navbar />
//     </Router>
//   )
// });

// describe("Navbar Tests", () => {
//   it("Debe existir una barra de navegacion", () => {
//     const navbar = screen.getByRole('navigation');
//     expect(navbar).toBeInTheDocument();
//   });
//   it("Debe existir un link para ir a peliculas", () => {
//     const filmButton = screen.getByRole('link', {name: /Peliculas/i});
//     expect(filmButton).toBeInTheDocument();
//   });
//   it("Debe existir un link para ir a series", () => {
//     const seriesButton = screen.getByRole('link', {name: /Series/i});
//     expect(seriesButton).toBeInTheDocument();
//   });
//   it("Debe existir un link para ir a libros", () => {
//     const booksButton = screen.getByRole('link', {name: /Libros/i});
//     expect(booksButton).toBeInTheDocument();
//   });
//   it("Debe existir un boton para toggle nav", () => {
//     const toggleNav = screen.getByRole('button', {name: /Toggle navigation/i});
//     expect(toggleNav).toBeInTheDocument();
//   });
//   it("Debe existir un motor de busqueda", () => {
//     const search = screen.getByRole('searchbox');
//     expect(search).toBeInTheDocument();
//   });
//   it("Debe existir un boton de busqueda", () => {
//     const searchButton = screen.getByRole('button', {name: /Search/i});
//     expect(searchButton).toBeInTheDocument();
//   });
//   it("Debe haber un texto de My Story App", () => {
//     const loginText = screen.getByRole('link', {name: /My Story App/i});
//     expect(loginText).toBeInTheDocument();
//   });
//   it("Debe haber un boton para iniciar sesion", () => {
//     const loginButton= screen.getByRole('link', {name: /iniciar sesion/i});
//     expect(loginButton).toBeInTheDocument();
//   });
//   it("Debe haber un boton para registrarse", () => {
//     const loginButton= screen.getByRole('link', {name: /registro/i});
//     expect(loginButton).toBeInTheDocument();
//   });
//   // it("abc", () => {
//   //   const loginButton= screen.getByRole('lin');
//   //   expect(loginButton).toBeInTheDocument();
//   // });
// });