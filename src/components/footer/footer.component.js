import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

export const Footer = () => {
  return (
    <MDBFooter style={{ backgroundColor: '#92C9D5' }} className='text-white text-center text-lg-left absolute-bottom mt-5'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>My Story App</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
              Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est
              atque cumque eum delectus sint!
            </p>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Acerca de nosotros</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white'>
                  Andrea Hernández Martín
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Ainoa
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Karina Kalwani Israni
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#54B4D3' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-white' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}