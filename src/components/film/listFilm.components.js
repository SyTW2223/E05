import React from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

export default function ListFilm() {
  return (
    <MDBContainer>
      <div className='welcome'>
        <h1 className="text-center my-5">Todas las películas</h1>
      </div>
    <MDBTable align='middle' bordered responsive className='caption-top'>
      <MDBTableHead>
        <tr className='table-secondary'>
          <th scope='col'>Título</th>
          <th scope='col'>Valoración</th>
          <th scope='col'>Estado</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <div className='d-flex justify-content-between'>
              <div className='p-2 ms-0 me-2'>
                <img
                  src={require('../../assets/avatar.jpg')}
                  alt='Cartelera Avatar 2'
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
              </div>
              <div className='p-2 mx-2'>
                <p className='fw-bold mb-1 text-left'>Avatar. El sentido del agua</p>
                <p className='text-muted mb-0 text-left'>Jake Sully y Ney'tiri han formado una familia...</p>
              </div>
              <div className='p-2 ms-2 me-0'>
                <MDBBtn className='rounded-circle' color='light' size='sm'>
                  Valorar
                </MDBBtn>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>9.0 <MDBIcon fas icon="star" style={{ color: '#FFD700' }}/></p>
          </td>
          <td>
            <MDBBadge color='success' pill>
              Visto
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex justify-content-between'>
              <div className='p-2'>
                <img
                  src={require('../../assets/black-adam.jpg')}
                  alt='Cartelera Black Adam'
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
              </div>
              <div className='p-2'>
                <p className='fw-bold mb-1 text-left'>Black Adam</p>
                <p className='text-muted mb-0 text-left'>Unos arqueólogos liberan de su tumba a Black..</p>
              </div>
              <div className='p-2'>
                <MDBBtn className='rounded-circle' color='light' size='sm'>
                    Valorar
                </MDBBtn>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>7.0 <MDBIcon fas icon="star" style={{ color: '#FFD700' }}/></p>
          </td>
          <td>
            <MDBBadge color='primary' pill>
              Añadir
            </MDBBadge>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex justify-content-between'>
              <div className='p-2'>
                <img
                  src={require('../../assets/morbius.jpg')}
                  alt='Cartelera Morbius'
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
              </div>
              <div className='d-flex flex-column'>
                <p className='fw-bold mb-1 text-left'>Morbius</p>
                <p className='text-muted mb-0 text-left'>Morbius, un doctor que tras sufrir una.....</p>
              </div>
              <div className='p-2'>
                <MDBBtn className='rounded-circle' color='light' size='sm'>
                    Valorar
                </MDBBtn>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>5.0 <MDBIcon fas icon="star" style={{ color: '#FFD700' }}/></p>
          </td>
          <td>
            <MDBBadge color='warning' pill>
              Viendo
            </MDBBadge>
          </td>
        </tr>
        
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
  );
}