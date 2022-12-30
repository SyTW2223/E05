import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  // MDBCardFooter, 
  MDBBtn,
  // MDBBreadcrumb,
  // MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  // MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge
} from 'mdb-react-ui-kit';

const selectorIsLoggedIn = (state) => state.auth?.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const UserProfile = () => {

  const isLoggedIn = useSelector(selectorIsLoggedIn);
  const userData = useSelector(selectorUserData);

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
                  <MDBBtn outline className="ms-1">Editar perfil</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard>
            <MDBListGroup style={{ minWidth: '22rem' }} light>
              <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                <strong>Biblioteca</strong>
              </MDBListGroupItem>
              <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                Todas las películas
                <MDBBadge pill light>
                  100
                </MDBBadge>
              </MDBListGroupItem>

              <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                Todos los libros
                <MDBBadge pill light>
                  100
                </MDBBadge>
              </MDBListGroupItem>

              <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                Todas las series
                <MDBBadge pill light>
                  100
                </MDBBadge>
              </MDBListGroupItem>
            </MDBListGroup>
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
                    <MDBCardText>Fecha de nacimiento</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Falta ponerla</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Authorities</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{userData.role}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <p className="text-center"><strong>Mis listas</strong></p>
            <MDBRow>
              <MDBCol md="6">
                <MDBCard>
                <MDBListGroup style={{ minWidth: '22rem' }} light>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Películas pendientes
                    <MDBBadge pill light>
                      14
                    </MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Series pendientes
                    <MDBBadge pill light>
                      2
                    </MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Libros pendientes
                    <MDBBadge pill light>
                      1
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Series vistas
                    <MDBBadge pill light>
                      10
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Libros favoritos
                    <MDBBadge pill light>
                      13
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Películas para repetir
                    <MDBBadge pill light>
                      28
                    </MDBBadge>
                  </MDBListGroupItem>
                </MDBListGroup>
                </MDBCard>
              </MDBCol>

              <MDBCol md="6">
                <MDBCard>
                <MDBListGroup style={{ minWidth: '22rem' }} light>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Series que no me han gustado
                    <MDBBadge pill light>
                      1
                    </MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Libros sin terminar
                    <MDBBadge pill light>
                      4
                    </MDBBadge>
                  </MDBListGroupItem>

                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Series sin terminar
                    <MDBBadge pill light>
                      3
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                    Películas sin terminar
                    <MDBBadge pill light>
                      5
                    </MDBBadge>
                  </MDBListGroupItem>
                </MDBListGroup>
                </MDBCard>
                  
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}