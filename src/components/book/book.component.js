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
  MDBIcon,
  MDBRadio
} from 'mdb-react-ui-kit';
import itemServices from "../../services/item.services";
import { Button, Modal, Form } from 'react-bootstrap';




const selectorIsAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const Book = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // usuarios logueados
  const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn);
  const isLoggedIn = useSelector(selectorIsLoggedIn);
  const userData = useSelector(selectorUserData);

  const [modifyBook, setMB] = useState(false);
  const [title, setTitle] = useState(location.state.item.title);
  const [description, setDescription] = useState(location.state.item.description);
  const [author, setAuthor] = useState(location.state.item.author);
  const [saga, setSaga] = useState(location.state.item.saga);
  const [year, setYear] = useState(location.state.item.yearPublication);
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [checkedList, setCheckedList] = useState("");

  const [addBook, setAddBook] = useState();

  const checkList = ["Fantasia", "Accion", "Aventuras", "Drama", "Historica", "Comedia", "Romance", "Ciencia Ficcion", "Terror"];
  const listsNames = ['Libros leidos', 'Libros para leer', 'Libros leyendo'];


  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
     updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
   
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
                    <>
                      <MDBBtn key='addBook' noRipple outline className="ms-1" onClick={() => setAddBook(true)}>
                        Añadir a lista
                      </MDBBtn>  

                      <Modal show={addBook}  onHide={() => setAddBook(false)}>
                      <Modal.Header>
                        <Modal.Title>Mis listas</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <br></br>
                            {listsNames.map((item, index) => (
                              <div key={index}>
                                <MDBRadio 
                                  name='flexRadioDefault' 
                                  id='flexRadioDefault1' 
                                  label={item} 
                                  value={item}
                                  onChange={(e) => setCheckedList(e.target.value)}
                                  />
                              </div>
                            ))}
                            <br></br>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={() => 
                          {
                            var idList = "";
                            userData.lists.forEach(id => {
                              if (id["name"] === checkedList) idList =  id["_id"];
                            });
                            const addData = {
                              "_id": idList,
                              "items": location.state.item._id,
                            }
                            console.log(addData)
                            dispatch(itemServices.addItem("list", addData))
                              .then(data => {
                                  console.log('data', data);
                              })
                              .catch(err => {
                                  return err;
                              });
                          }} 
                          >Guardar
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>    
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
                              defaultValue={location.state.item.title}
                              autoFocus
                              onChange={(e) => setTitle(e.target.value)}
                            /><br></br>
                            <Form.Control 
                              as="textarea" 
                              rows={3}
                              placeholder="Descripción"
                              defaultValue={location.state.item.description}
                              onChange={(e) => setDescription(e.target.value)}
                              /><br></br>
                            <Form.Control
                              type="text"
                              placeholder="Autor"
                              defaultValue={location.state.item.author}
                              autoFocus
                              onChange={(e) => setAuthor(e.target.value)}
                            /><br></br>
                              <Form.Control
                              type="text"
                              placeholder="Saga"
                              defaultValue={location.state.item.saga}
                              autoFocus
                              onChange={(e) => setSaga(e.target.value)}
                            /><br></br>
                            <Form.Control
                              type="text"
                              placeholder="Año Publicación"
                              defaultValue={location.state.item.yearPublication}
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
                            itemServices.updateItem('book', location.state.item.title, bookData)
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
