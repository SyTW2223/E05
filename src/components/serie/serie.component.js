import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
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
import { Button, Modal, Form } from 'react-bootstrap';

import itemServices from "../../services/item.services";


const selectorIsAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;


export const Serie = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn); 
  const isLoggedIn = useSelector(selectorIsLoggedIn);

  const [modifySerie, setMS] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [seasons, setSeasons] = useState("");
  const [year, setYear] = useState();
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState([]);


  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
     updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkList = ["Fantasia", "Accion", "Aventuras", "Drama", "Historica", "Comedia", "Romance", "Ciencia Ficcion"];


  return (
    <section style={{ backgroundColor: '#f4f5f7' }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="10" >
          <MDBCard style={{ height: 'auto', borderRadius: '.5rem' }}>
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
                      <MDBBtn key='deleteSerie' noRipple outline
                        onClick={() => {
                            itemServices.deleteItem('serie', location.state.item.title)
                              .then(data => { 
                                navigate('/serieList');
                              }).catch(err => {
                                  console.log(err);
                              });
                        }}
                      >
                      Eliminar
                      </MDBBtn>
                      <MDBBtn key='modififySerie' noRipple outline className="ms-1" onClick={() => setMS(true)}>
                        Modificar
                      </MDBBtn>
                      {/* Modal Modificar */}
                      <Modal show={modifySerie}  onHide={() => setMS(false)}>
                        <Modal.Header>
                          <Modal.Title>Modificar Serie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Control
                                type="text"
                                placeholder="Titulo"
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                              /><br></br>
                              <Form.Control 
                                as="textarea" 
                                rows={3}
                                placeholder="Descripción"
                                onChange={(e) => setDescription(e.target.value)}
                                /><br></br>
                              <Form.Control
                                type="text"
                                placeholder="Temporadas"
                                autoFocus
                                onChange={(e) => setSeasons(e.target.value)}
                              /><br></br>
                              <Form.Control
                                type="text"
                                placeholder="Año Publicación"
                                autoFocus
                                onChange={(e) => setYear(e.target.value)}
                              /><br></br>
                              {checkList.map((item, index) => (
                                <div key={index}>
                                  <input value={item} type="checkbox" onChange={handleCheck}/>
                                  <span>{item}</span>
                                </div>
                              ))}
                              <br></br>
                            <Form.Control 
                              type="file"
                              onChange={(e) => setImage(e.target.value)}
                              /><br></br>
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={() => 
                            {
                              const serieData = {
                                "title": title,
                                "description": description,
                                "yearPublication": Number(year),
                                "genres": checked,
                                "seasons": seasons,
                                "image": image,
                              }
                              itemServices.updateItem('serie', serieData)
                              .then(data => { 
                                console.log('hola')
                                navigate('/serieList');
                              }).catch(err => {
                                  console.log(err);
                              });
                            }} 
                            >Guardar
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
