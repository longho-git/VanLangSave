import React from 'react';
// reactstrap components
import { NavItem, Container, Row, Col } from 'reactstrap';

function HomeFooter(props) {
  return (
    <>
      <div className="section-shaped no-tilt">
        <div className="shape shape-style-1 shape-default">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <footer className="footer bg-transparent">
          <Container>
            <Row>
              <Col md="5">
                <div className="column">
                  <img
                    alt="..."
                    className="logo"
                    src={require('assets/img/brand/white.png').default}
                  ></img>
                </div>
              </Col>


              <Col md="6" xs="6">
                <div className="column">
                  <h4 className="mt-3">TRƯỜNG ĐẠI HỌC VĂN LANG</h4>
                  <div className="social-feed">
                    <div className="feed-line text-white">
                      <p>
                        Cơ sở chính: 69/68 Đặng Thùy Trâm, P. 13, Q. Bình Thạnh,
                        TP. HCM
                      </p>
                    </div>
                    <div className="feed-line text-white">
                      <p>
                        Cơ sở 1: 45 Nguyễn Khắc Nhu, P. Cô Giang, Q.1, TP. HCM
                      </p>
                    </div>
                    <div className="feed-line text-white">
                      <p>
                        Cơ sở 2: 233A Phan Văn Trị, P.11, Q. Bình Thạnh, TP. HCM
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
}

HomeFooter.propTypes = {};

export default HomeFooter;
