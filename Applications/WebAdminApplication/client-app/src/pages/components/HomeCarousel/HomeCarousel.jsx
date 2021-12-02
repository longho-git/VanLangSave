import React from 'react';
import { UncontrolledCarousel, Row, Col, Container } from 'reactstrap';

const items = [
  {
    src: 'https://www.vanlanguni.edu.vn/images/2020/banner/hd-08.jpg',
    altText: 'Slide 1',
    caption: '',
    header: '',
    key: '1',
  },
  {
    src: 'https://www.vanlanguni.edu.vn/images/2020/banner/cs3-01.jpg',
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
