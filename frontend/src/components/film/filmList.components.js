/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import itemServices from "../../services/item.services";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBTable, MDBTableHead, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';



const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;


export const FilmList = () => {
  const [isLoading, setLoading] = useState(true);
  const [respuestaBack, setData] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectorIsLoggedIn); 

  
  useEffect(() => {
    itemServices.listItems("film").then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  function getTableBodyAsReactElement() {
    return (!respuestaBack) ? null : (
      <MDBContainer>
        <div className='welcome'>
          <h1 className="text-center my-5">Todas las películas</h1>
        </div>
        <MDBTable align='middle' bordered responsive className='caption-top'>
          <MDBTableHead>
            <tr className='table-secondary'>
              <th scope='col'>Título</th>
              <th scope='col'>Año</th>
              <th scope='col'>Géneros</th>
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
                <td onClick={() => {navigate("/film/", {state: {item: item}})}}>{item.image}<b>{item.title}</b><br></br>{item.description}</td>
                <td>{item.yearPublication}</td>
                <td>{item.genres.map((cat) => cat + ', ')}</td>
                <td>{item.rating} <MDBIcon icon="fas fa-star" style={{color: '#ffed2d'}}/></td>
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



/*
{respuestaBack.map((item) => {
  return (
    <MDBTableBody>
      <tr>
        <td>
          <div className='d-flex justify-content-between'>
            <div className='p-2 ms-0 me-2'>
            </div>
            <div className='p-2 mx-2'>
              <p className='fw-bold mb-1 text-left'>{item.title}</p>
              <p className='text-muted mb-0 text-left'>{item.description}</p>
            </div>
            {isLoggedIn && (
              <div className='p-2 ms-2 me-0'>
                <MDBBtn className='rounded-circle' color='light' size='sm'>
                  Valorar
                </MDBBtn>
            </div>
            )}
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>9.0 <MDBIcon fas icon="star" style={{ color: '#FFD700' }} /></p>
        </td>
        <td>
          <MDBBadge color='success' pill>
            Visto
          </MDBBadge>
        </td>
      </tr>
    </MDBTableBody>
  );
})}
*/