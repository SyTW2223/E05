/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import itemServices from "../../services/item.services";
import {useLocation, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBTable, MDBTableHead, MDBContainer } from 'mdb-react-ui-kit';



const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
// const selectorUserData = (state) => state.auth?.user?.data;

export const UserList = () => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [respuestaBack, setData] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectorIsLoggedIn); 

  
  useEffect(() => {
    var listas = [];
    listas = location.map((list) => {
      itemServices.listItems("lists" + `${String(list)}`).then(response => {
        setData(response.data);
        setLoading(false);
      });
    });
    return listas;
  }, []);

  function getTableBodyAsReactElement() {
    console.log('respuestaBack: ', respuestaBack);

    return (!respuestaBack) ? null : (
      <MDBContainer>
        <div className='welcome'>
          <h1 className="text-center my-5">Mis listas</h1>
        </div>
        <MDBTable align='middle' bordered responsive className='caption-top'>
          <MDBTableHead>
            <tr className='table-secondary'>
              <th scope='col'>Título</th>
              <th scope='col'>Número de items</th>
              {isLoggedIn && (
                <>
                <th scope='col'>Eliminar</th>
                <th scope='col'>Modificar</th>
                </>
              )}
            </tr>
          </MDBTableHead>
          {respuestaBack.map((item) => {
            return (
                <tr>
                  <td onClick={() => {navigate("/list/", {state: {item: item}})}}>{item.image}<b>{item.title}</b></td>
                  <td>{item.yearPublication}</td>
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
