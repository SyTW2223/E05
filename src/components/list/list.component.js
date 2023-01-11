/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import itemServices from "../../services/item.services";
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MDBTable, MDBTableHead, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';



const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
// const selectorUserData = (state) => state.auth?.user?.data;

export const List = () => {
  const [isLoading, setLoading] = useState(true);
  const [respuestaBack, setData] = useState([]);
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectorIsLoggedIn); 

  
  useEffect(() => {
    itemServices.listItems("lists").then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  function getTableBodyAsReactElement() {
    console.log('respuestaBack: ', respuestaBack);

    return (!respuestaBack) ? null : (
      <MDBContainer>
        <div className='welcome'>
          <h1 className="text-center my-5">Lista X</h1>
        </div>
        <MDBTable align='middle' bordered responsive className='caption-top'>
          <MDBTableHead>
            <tr className='table-secondary'>
              <th scope='col'>Título</th>
              <th scope='col'>Mi valoración</th>
              {isLoggedIn && (
                <>
                </>
              )}
            </tr>
          </MDBTableHead>
          {respuestaBack.map((item) => {
            return (
                <tr>
                  <td onClick={() => {navigate("/list/", {state: {item: item}})}}>{item.image}<b>{item.title}</b><br></br>{item.description}</td>
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
