import React from 'react';

// reactstrap components
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import SignInFormAdmin from './../../components/SignInForm/SignInFormAdmin';

// Core Components

function LoginPage() {
  React.useEffect(() => {
    document.body.classList.add('login-page');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('login-page');
    };
  });
  return (
    <>
      <div className="section-shaped my-0 skew-separator skew-mini">
        <div className="page-header page-header-small header-filter">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                'url(' +
                require('assets/img/sections/unsplashs.jpg').default +
                ')',
            }}
          ></div>
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col className="px-5" lg="6" md="8" xl="5">
                  <h1 className="text-white">Chào mừng!</h1>
                  <p className="text-lead text-white">
                    Đăng nhập hệ thống Văn Lang Save.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      <section className="upper">
        <Container>
          <Col className="mx-auto" lg="5" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <SignInFormAdmin />
              </CardBody>
            </Card>
          </Col>
        </Container>
      </section>
    </>
  );
}

export default LoginPage;
