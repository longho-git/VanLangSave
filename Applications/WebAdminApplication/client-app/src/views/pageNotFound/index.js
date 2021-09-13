import React from 'react';
// nodejs library that concatenates classes
// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
// core components

const NotFound = () => (
  <>
    <div className=" bg-gradient-info py-7 py-lg-8 pt-lg-9">
      <Container>
        <div className="header-body text-center mb-7">
          <Row className="justify-content-center">
            <Col className="px-5" lg="6" md="8" xl="5">
              <h1 className="text-white">Không tìm thấy trang !!</h1>
              <Link className="text-lead text-white" to="/">
                Về trang chủ
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  </>
);

export default NotFound;
