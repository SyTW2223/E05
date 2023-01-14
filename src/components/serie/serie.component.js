import { useLocation } from "react-router-dom";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';

import item from "../../services/item.services";


const selectorIsAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;


export const Serie = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn); 
  const isLoggedIn = useSelector(selectorIsLoggedIn);

  return (
    <section style={{ backgroundColor: '#f4f5f7' }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="10" >
          <MDBCard style={{ height: 500, borderRadius: '.5rem' }}>
            <MDBRow>
              <MDBCol className="text-center"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src={require('../../assets/lcdp.jpg')}
                alt='Cartelera La Casa de Papel 5' className="my-5" style={{ width: '120px' }} fluid />
                     {
                    isLoggedIn && (
                    <div>
                      <MDBBtn noRipple outline>Valorar</MDBBtn>
                      <MDBBtn noRipple outline className="ms-1">Añadir a la lista</MDBBtn>
                    </div>
                      )
                  }
                  {
                    isAdminLoggedIn && (
                    <div>
                      {/* <MDBBtn noRipple outline onClick={Item.deleteItem()}>Borrar</MDBBtn> */}
                      <MDBBtn noRipple outline onClick={() => 
                        {
                        // const serieData = {
                        //   "title": location.state.item.title,
                        // }
                        dispatch(item.deleteItem("serie", location.state.item.title))
                        .then((data) => {
                            console.log('Eliminada serie correctamente.');
                            console.log(data);
                        })
                        .catch(() => {
                            console.log('Error, no se ha podido eliminar la serie.');
                        });
                      }} >Borrar</MDBBtn>
                      <MDBBtn noRipple outline className="ms-1">Modificar</MDBBtn>
                    </div>
                      )
                  }
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6"><strong>{location.state.item.title}</strong></MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="10" className="mb-3">
                      <MDBTypography tag="h6">Sipnosis</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.description}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
    
                  <MDBTypography tag="h6">Detalles</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Géneros</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.genres.map((cat) => cat + ', ')}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Estreno</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.yearPublication}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Valoración</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.rating} <MDBIcon icon="fas fa-star"  style={{color: '#ffed2d'}}/></MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Temporadas</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.seasons}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </section> 
  );
}
