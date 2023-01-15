import React, { useState } from "react";
import { useSelector } from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import itemServices from "../../services/item.services";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroupItem,
  MDBTable, 
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from 'mdb-react-ui-kit';

const selectorIsLoggedIn = (state) => state.auth?.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const UserProfile = () => {

  const isLoggedIn = useSelector(selectorIsLoggedIn);
  const userData = useSelector(selectorUserData);
  const [dataItems, setDataItems] = useState([]); // contiene lista de de objetos (items de la lista)
  const [dataList, setDataList] = useState(); // contiene objeto lista
  const navigate = useNavigate();


  const namesList = [
    {ruta:'film', titulo:'Peliculas'}, 
    {ruta:'serie', titulo:'Series'}, 
    {ruta:'book', titulo:'Libros'}
  ];

  const typeList = [
    {tipo:'Terminados', color:'#14A44D'}, 
    {tipo:'Pendientes', color:'#DC4C64'}, 
    {tipo:'Siguiendo', color:'#54B4D3'}
  ];


    // recibe id del item a buscar
    const buscarItem = (ruta, _idItem) => {
      itemServices.getItem(ruta,  `/${String(_idItem)}`)
        .then(response => {
          return response;
        });
    };
  
  // recibe id de la lista a buscar
  const buscar = (ruta, _idList) => {
    itemServices.getItem('list',  `/${String(_idList)}`)
      .then(response => {
        setDataList(response.data);
        var itemsList = [];
        itemsList = dataList.items.map(idItem => {
          return buscarItem(ruta, idItem);
        });
        setDataItems(itemsList);
      });
      console.log(dataItems)
  };



  if (!isLoggedIn) {
      return <Navigate to="/login" />;
  }


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-4"></p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline noRipple className="ms-1">Editar perfil</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.username}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Rol</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.role}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>


        <MDBRow>
          {typeList.map((item) => {
            return ( 
              <div className='table-responsive col-md-4'>
                <MDBTable>
                  <MDBTableHead style={{ minWidth: '5rem' }} light>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                      <strong>{item.tipo}</strong>
                    </MDBListGroupItem>
                  </MDBTableHead>
                    {
                        namesList.map(name => {
                          return (
                            <MDBTableBody>
                              <tr key={item.id}>
                                <td onClick={(buscar(name.ruta, item))}>
                                  <div className='ms-3'>
                                    <MDBIcon fas icon="circle" style={{color: item.color}}/>
                                    {name.titulo} 
                                  </div>
                                </td>
                              </tr>
                            </MDBTableBody>
                          )
                        })
                      }
                </MDBTable>
              </div>
            );
          })}
        </MDBRow>
      </MDBContainer>


      <MDBContainer>
        <div className='welcome'>
          <h3 className="text-center my-2">Mi lista</h3>
        </div>
        <MDBTable align='middle' bordered responsive className='caption-top'>
          <MDBTableHead>
              <tr className='table-secondary'>
                <th scope='col'>Título</th>
                <th scope='col'>Generos</th>
                <th scope='col'>Valoración</th>
                <th scope='col'>Tu valoración</th>
              </tr>
          </MDBTableHead>
          {dataItems.map((item) => {
            return (
              <tr key={item.id}>
                <td onClick={() => {navigate(`/${item.type}/`, {state: {item: item}})}}>{item.image}<b>{item.title}</b></td>
                <td>{item.genres.map((cat) => cat + ', ')}</td>
                <td>{item.rating} <MDBIcon icon="fas fa-star" style={{color: '#ffed2d'}}/></td>
              </tr>
            );
          })}
        </MDBTable>
      </MDBContainer>
    </section>
  );
  
}