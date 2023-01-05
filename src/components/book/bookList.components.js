/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import itemServices from "../../services/item.services";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';



const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
// const selectorUserData = (state) => state.auth?.user?.data;

export const BookList = () => {
  const [isLoading, setLoading] = useState(true);
  const [respuestaBack, setData] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectorIsLoggedIn); 

  
  useEffect(() => {
    itemServices.listItems("book").then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  function getTableBodyAsReactElement() {
    console.log('respuestaBack: ', respuestaBack);

    return (!respuestaBack) ? null : (
      <MDBContainer>
        <div className='welcome'>
          <h1 className="text-center my-5">Todos los libros</h1>
        </div>
        <MDBTable align='middle' bordered responsive className='caption-top'>
          <MDBTableHead>
            <tr className='table-secondary'>
              <th scope='col'>Título</th>
              <th scope='col'>Autor</th>
              <th scope='col'>Año</th>
              <th scope='col'>Saga</th>
              <th scope='col'>Categoria</th>
              <th scope='col'>Valoración</th>
              {isLoggedIn && (
                <>
                <th scope='col'>Tu valoración</th>
                <th scope='col'>Estado</th>
                </>
              )}
            </tr>
          </MDBTableHead>
          {respuestaBack.map((item) => {
            return (
                <tr>
                  <td onClick={() => {navigate("/book/", {state: {item: item}})}}>{item.image}<b>{item.title}</b><br></br>{item.description}</td>
                  <td>{item.author}</td>
                  <td>{item.yearPublication}</td>
                  <td>{item.saga}</td>
                  <td>{item.categories.map((cat) => cat + ', ')}</td>
                  <td>{item.rating}</td>
                </tr>
              );
            })}
        </MDBTable>
      </MDBContainer>
    );
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  };

  return (
    <div className="App">
      {getTableBodyAsReactElement()}
    </div>
  );
}
