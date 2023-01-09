/* eslint-disable no-unused-expressions */
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBCheckbox,
  MDBFile
  // MDBListGroup,
  // MDBListGroupItem,
} from 'mdb-react-ui-kit'; 

import item from "../../services/item.services";

const selectorIsLoggedIn = (state) => state.auth?.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const AdminProfile = () => {

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectorIsLoggedIn);
  const userData = useSelector(selectorUserData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [author, setAuthor] = useState();
  const [saga, setSaga] = useState("");
  const [year, setYear] = useState();
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState([]);

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

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

  if (!isLoggedIn) {
      return <Navigate to="/login" />;
  }
  return (
    <section>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                  <div className="d-flex justify-content-center mb-2">
                    ADMINISTRADOR
                  </div>
                  <MDBBtn outline noRipple>Editar Perfil</MDBBtn>
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
                    <MDBCardText className="text-muted">{userData.name}</MDBCardText>
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
              </MDBCardBody>
            </MDBCard>
            <hr></hr>
            <Button variant="primary" onClick={handleShow}>
              Añadir Libro
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Libro</Modal.Title>
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
                <Button variant="secondary" onClick={handleClose}>
                  Volver
                </Button>
                <Button variant="primary" 
                  onClick={() => {
                    const bookData = {
                      "title": title,
                      "description": description,
                      "yearPublication": Number(year),
                      "categories": checked,
                      "author": author,
                      "saga": saga,
                      "image": image,
                    }
                    dispatch(item.createItem("book", bookData))
                    .then((data) => {
                        console.log('Creado libro correctamente.')
                        console.log(data)
                    })
                    .catch(() => {
                        console.log('Error, no se ha podido crear el libro.');
                    });
                }}
                  >Listo
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Pelicula */}
            <MDBBtn noRipple onClick={toggleShow}>Añadir Película</MDBBtn>
            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
              <MDBModalDialog centered>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Película</MDBModalTitle>
                    <MDBBtn noRipple className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>
                  <form>
                    <MDBInput id='form4Example1' wrapperClass='mb-4' placeholder='Título' onChange={(e) => setTitle(e.target.value)}/>
                    <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} placeholder='Descripción' onChange={(e) => setDescription(e.target.value)} />
                    <MDBInput id='form4Example2' wrapperClass='mb-4' placeholder='Año de estreno' onChange={(e) => setYear(e.target.value)}/>
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Fantasía'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Acción'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Aventuras'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Drama'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Historica'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Comedia'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Romance'
                    />
                    <MDBCheckbox
                      wrapperClass='d-flex mb-4'
                      id='form4Example4'
                      label='Ciencia ficción'
                    />
                    <MDBFile id='customFile' />
                  </form>
        
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn noRipple color='secondary' onClick={toggleShow}>
                      Cerrar
                    </MDBBtn>
                    <MDBBtn noRipple>Guardar</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}