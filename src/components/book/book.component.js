import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
import itemServices from "../../services/item.services";
import { Button, Modal, Form } from 'react-bootstrap';

const selectorIsAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;

export const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn);
  const isLoggedIn = useSelector(selectorIsLoggedIn);

  const [modifyBook, setMB] = useState(false);

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [author, setAuthor] = useState();
  const [saga, setSaga] = useState("");
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
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="my-5" style={{ width: '120px' }} fluid />
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
                      <MDBBtn key='deleteBook' noRipple outline
                        onClick={() => {
                          itemServices.deleteItem('book', location.state.item.title)
                            .then(data => { 
                              navigate('/bookList');
                            }).catch(err => {
                                console.log(err);
                            });
                      }}
                      >Borrar</MDBBtn>
                      <MDBBtn key='modififyBook' noRipple outline className="ms-1" onClick={() => setMB(true)}>
                        Modificar
                      </MDBBtn>                      
                      {/* Modal Modificar */}
                      <Modal show={modifyBook}  onHide={() => setMB(false)}>
                        <Modal.Header>
                          <Modal.Title>Modificar Libro</Modal.Title>
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
                                placeholder="Autor"
                                autoFocus
                                onChange={(e) => setAuthor(e.target.value)}
                              /><br></br>
                                <Form.Control
                                type="text"
                                placeholder="Saga"
                                autoFocus
                                onChange={(e) => setSaga(e.target.value)}
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
                              const bookData = {
                                "title": title,
                                "description": description,
                                "yearPublication": Number(year),
                                "genres": checked,
                                "author": author,
                                "saga": saga,
                                "image": image,
                              }
                              itemServices.updateItem('book', bookData)
                              .then(data => { 
                                navigate('/bookList');
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
                      <MDBTypography tag="h6">Autor</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.author}</MDBCardText>
                    </MDBCol>
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Saga</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.saga}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                      <MDBTypography tag="h6">Valoración</MDBTypography>
                      <MDBCardText className="text-muted">{location.state.item.rating} <MDBIcon icon="fas fa-star"  style={{color: '#ffed2d'}}/></MDBCardText>
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
