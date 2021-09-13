// react library for routing
import { useState } from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from 'reactstrap';
import RegisterForm from './../../views/pages/auth/components/RegisterForm';
function AuthNavbar() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/" tag={Link}>
            <img alt="..." src={require('assets/img/brand/logo.png').default} />
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/admin/login">
                    <img
                      alt="..."
                      src={require('assets/img/brand/logo.png').default}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <hr className="d-lg-none" />
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  onClick={() => setModalOpen(true)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-user-plus mr-2" />
                  </span>
                  <span className="nav-link-inner--text">Đăng ký</span>
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
        <Modal
          className="modal-dialog-centered"
          size="sm"
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
        >
          <RegisterForm />
        </Modal>
      </Navbar>
    </>
  );
}

export default AuthNavbar;
