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
import { Button, Modal, Form } from 'react-bootstrap';
import itemServices from "../../services/item.services";


const selectorIsAdminLoggedIn = (state) => state.auth.isAdminLoggedIn;
const selectorIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectorUserData = (state) => state.auth?.user?.data;

export const Film = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAdminLoggedIn = useSelector(selectorIsAdminLoggedIn); 
  const isLoggedIn = useSelector(selectorIsLoggedIn);
  const userData = useSelector(selectorUserData);

  const [modifyFilm, setMF] = useState(false);
  const [title, setTitle] = useState(location.state.item.title);
  const [description, setDescription] = useState(location.state.item.description);
  const [year, setYear] = useState(location.state.item.yearPublication);
  const [image, setImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [checkedList, setCheckedList] = useState("");
  
  const [addFilm, setAddFilm] = useState();

  const checkList = ["Fantasia", "Accion", "Aventuras", "Drama", "Historica", "Comedia", "Romance", "Ciencia Ficcion", "Terror"];
  const listsNames = ['Peliculas vistas', 'Peliculas para ver', 'Peliculas viendo'];

  
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
                <MDBCardImage src={require('../../assets/lcdp.jpg')}
                alt='Cartelera La Casa de Papel 5' className="my-5" style={{ width: '120px' }} fluid />
                     {
                    isLoggedIn && (
                    <>
                      <MDBBtn key='addFilm' noRipple outline className="ms-1" onClick={() => setAddFilm(true)}>
                        Añadir a la lista
                      </MDBBtn>

                      <Modal show={addFilm}  onHide={() => setAddFilm(false)}>
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
                              "items": [location.state.item._id],
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
                      <MDBBtn key='deleteFilm' noRipple outline
                        onClick={() => {
                            itemServices.deleteItem('film', location.state.item.title)
                              .then(data => { 
                                navigate('/filmList');
                              }).catch(err => {
                                  console.log(err);
                              });
                        }}
                      >
                      Eliminar
                      </MDBBtn>
                      <MDBBtn key='modififyFilm' noRipple outline className="ms-1" onClick={() => setMF(true)}>
                        Modificar
                      </MDBBtn>
                      {/* Modal Modificar */}
                      <Modal show={modifyFilm}  onHide={() => setMF(false)}>
                        <Modal.Header>
                          <Modal.Title>Modificar Pelicula</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Control
                                type="text"
                                placeholder="Titulo"
                                autoFocus
                                defaultValue={location.state.item.title}
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
                                placeholder="Año Publicación"
                                autoFocus
                                defaultValue={location.state.item.yearPublication}
                                onChange={(e) => setYear(e.target.value)}
                              /><br></br>
                              {checkList.map((item, index) => (
                                <div key={index}>
                                  <input value={item} 
                                  type="checkbox" 
                                  defaultValue={location.state.item.genres}
                                  onChange={handleCheck}/>
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
                              const filmData = {
                                "title": title,
                                "description": description,
                                "yearPublication": Number(year),
                                "genres": checked,
                                "image": image,
                              }
                              itemServices.updateItem('film', location.state.item.title, filmData)
                              .then(data => { 
                                navigate('/filmList');
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
