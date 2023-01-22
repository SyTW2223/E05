// import React from "react";
// import "@testing-library/jest-dom";
// import { render, screen } from "../testUtils";
// import { BrowserRouter as Router } from "react-router-dom";

// import { FilmList } from "../src/components/film/filmList.components";

// beforeEach(() => {
//   // eslint-disable-next-line testing-library/no-render-in-setup
//   render(
//     <Router>
//       <FilmList />
//     </Router>
//   )
// });

// describe("FilmList tests", () => {
//   it("Debe haber un texto de todas las peliculas", () => {
//     const allFilmText = screen.getByRole('heading', {level: 1, hidden: true});
//     expect(allFilmText).toBeInTheDocument();
//   });
// });