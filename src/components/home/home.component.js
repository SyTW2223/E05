import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import './home.css'


function Home() {
  return (
    <html>
      <Stack gap={5}>
        <div className='welcome'>
          <h1 class="text-center">¡Bienvenido a MyStoryApp!</h1>
          <p class="text-center">Con esta página web podrás estar al día con tus series, películas y libros favoritos <br></br> personalizando tus propias listas de visionado.</p>
        </div>
        <div className='summary-movies'>
          <Container fluid="sm">
            <div display="flex">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  width={400}
                  src={require('../../assets/avatar.jpg')}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  width={400}
                  src={require('../../assets/lcdp.jpg')}
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  width={400}
                  src={require('../../assets/cuando-era-divertido.jpg')}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
            </div>
          </Container>
        </div>
      </Stack>
    </html>
  );
}

export default Home;