import React from 'react';
import { UncontrolledCarousel, Row, Col, Container } from 'reactstrap';

const items = [
  {
    src: 'https://cdn.chotot.com/admincentre/-WzMX7rGqx5tnDsLnM0t6qWfoIJMJLR2_cEcQ21qDe4/preset:raw/plain/605d4f8d46909c3e597a128ec30b7e54-2736364669635181163.jpg',
    altText: 'Slide 1',
    caption: '',
    header: '',
    key: '1',
  },
  {
    src: 'https://cdn.chotot.com/admincentre/kBp5caJKCXTwCGeAXUkabPbwdcJA6R56JjLGCmI61B0/preset:raw/plain/20bef60d38cba6def762b822afc38a87-2734629818208685567.jpg',
    altText: 'Slide 3',
    caption: '',
    header: '',
    key: '2',
  },
];

const HomeCarousel = () => (
  <div className="section section-hero section-shaped">
    <div className="page-header">
      <img
        alt="..."
        className="bg-image"
        src={require('assets/img/ill/index_bg.svg').default}
      ></img>
      <Container>
        <UncontrolledCarousel items={items} />
      </Container>
    </div>
  </div>
);

export default HomeCarousel;
