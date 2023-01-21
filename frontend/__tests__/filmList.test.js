import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "../testUtils";
import { BrowserRouter as Router } from "react-router-dom";

import { Film } from "../src/components/film/film.component";

const http = require("http");

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("FilmList tests", () => {
  // let server;
  // beforeAll((done) => {
  //   const app = require("../../backend/src/server");
  //   server = http.createServer(app);
  //   server.listen(done);
  //   render(
  //     <Router>
  //       <Film />
  //     </Router>
  //   )
  // });
  // afterAll((done) => {
  //   server.close(done);
  // });

  // beforeEach(() => {
  //   // eslint-disable-next-line testing-library/no-render-in-setup
  //   jest.useFakeTimers();
  // });
  // afterEach(() => {
  //   jest.useRealTimers();
  // });
  
  beforeEach(() => {
    render(
      <Router>
        <Film />
      </Router>
    )
  })
  it("Debe haber un texto de todas las peliculas", () => {
    const allFilmText = screen.getByRole('heading', {level: 1, hidden: true});
    expect(allFilmText).toBeInTheDocument();
  });
});