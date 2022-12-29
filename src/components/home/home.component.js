import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import './home.css';

export default function Home() {
  return (
    <MDBContainer>
      <div className='welcome'>
        <h1 class="text-center">¡Bienvenido a MyStoryApp!</h1>
        <p class="text-center">Con esta página web podrás estar al día con tus series, películas y libros favoritos <br/>personalizando tus propias listas de visionado.</p>
      </div>
      <MDBRow>
        <MDBCarousel showControls showIndicators fade>
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={1}
            src={require('../../assets/avatar.jpg')}
            alt='Cartelera Avatar 2'
          />
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={2}
            src={require('../../assets/lcdp.jpg')}
            alt='Cartelera La Casa de Papel 5'
          />
          <MDBCarouselItem
            className='w-100 d-block'
            itemId={3}
            src={require('../../assets/cuando-era-divertido.jpg')}
            alt='Portada libro Cuando era divertido'
          />
        </MDBCarousel>
      </MDBRow>
    </MDBContainer>
  );
}