import React, { useState, useEffect } from "react";
import http from "../../http-common";

function BookGet() {
  const [isLoading, setLoading] = useState(true);
  const [respuestaBack, setData] = useState([]); 

  // ruta raiz por defecto
  useEffect(() => {
    http.get("/book").then(response => { //response contiene datos de respuesta del back
      setData(response.data); //obtiene respuesta del back del .send
      setLoading(false);
    });
  }, []);

  function getTableBodyAsReactElement() {
    console.log('respuestaback: ', respuestaBack);

    return (!respuestaBack) ? null : (
      <table border="1">
        <tbody>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Id</th>
          <th>Categories</th>
          <th>Rating</th>
        </tr>
          {respuestaBack.map((item) => {
            return (
              <tr>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.id}</td>
                <td>{item.categories}</td>
                <td>{item.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  };

  return (
    <div className="App">
      {getTableBodyAsReactElement()}
    </div>
  );
}


export default BookGet;