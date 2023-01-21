import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import './home.css';

export const Home = () => {
  return (
    <MDBContainer>
      <div className='welcome'>
        <h1 className="text-center my-5">¡Bienvenido a MyStoryApp!</h1>
        <p className="text-center my-5">Con esta página web podrás estar al día con tus series, películas y libros favoritos <br/>personalizando tus propias listas de visionado.</p>
      </div>

      <div className="mt-5 mb-3">
        <h2 className="text-center">Últimos Añadidos</h2>
      </div>
      <MDBRow>
        <MDBCarousel showControls showIndicators fade>
          <MDBCarouselItem
            className='w-70 d-block rounded-pill'
            itemId={1}
            src={require('../../assets/avatar.jpg')}
            alt='Cartelera Avatar 2'
          />
          <MDBCarouselItem
            className='w-70 d-block rounded-pill'
            itemId={2}
            src={require('../../assets/lcdp.jpg')}
            alt='Cartelera La Casa de Papel 5'
          />
          <MDBCarouselItem
            className='w-70 d-block rounded-pill'
            itemId={3}
            src={require('../../assets/cuando-era-divertido.jpg')}
            alt='Portada libro Cuando era divertido'
          />
        </MDBCarousel>
      </MDBRow>
    </MDBContainer>
  );
}