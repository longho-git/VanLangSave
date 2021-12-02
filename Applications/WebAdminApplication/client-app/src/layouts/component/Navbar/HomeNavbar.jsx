import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';

// reactstrap components
import {
  Collapse,
  Media,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from 'reactstrap';
import AccountMenu from './AccountMenu';
import { useSelector } from 'react-redux';
import Notification from './Notification';
import HomeMenu from './HomeMenu';

function HomeNavbar(props) {
  const [collapseOpen, toggleCollapse] = React.useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const location = useLocation().search;
  const textSearch = new URLSearchParams(location).get('value');

  const [input, setInput] = useState(textSearch || '');
  const [searchFocus, setSearchFocus] = useState('');
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const routeChange = (input) => {
    let path = `/search?value=${input}`;
    history.push(path);
  };

  //trigger handleSubmit only when enter button is pressed within search input field or search icon is clicked
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.currentTarget.title === 'search') {
      e.preventDefault();
      input ? handleSubmit() : alert('Please enter search term to get results');
    }
  };

  const handleSubmit = () => {
    routeChange(input);
  };
  const toUrl = (url) => {
    if (!isLoggedIn) {
      history.push('/login');
      return;
    }
    history.push(url);
  };
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById('dark-navbar-main'));
    // initialise
    headroom.init();
  });
  let navbarType = '';
  switch (props.type) {
    case 'dark':
      navbarType = 'bg-default navbar-dark';
      break;
    case 'transparent':
      navbarType = 'navbar-transparent';
      break;
    case 'primary':
      navbarType = 'bg-primary navbar-dark';
      break;
    case 'white':
      navbarType = 'bg-white';
      break;
    default:
      navbarType = 'bg-default navbar-dark';
      break;
  }
  return (
    <>
      <Navbar
        className={'navbar-main headroom ' + navbarType}
        expand="lg"
        id="dark-navbar-main"
      >
        <Container>
          <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <img
              alt="..."
              src={require('assets/img/brand/white.png').default}
            ></img>
          </NavbarBrand>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => toggleCollapse(!collapseOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Collapse
            id="navbar_global"
            navbar
            toggler="#navbar_global"
            isOpen={collapseOpen}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/index">
                    <img
                      alt="..."
                      src={require('assets/img/brand/blue.png')}
                    ></img>
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    onClick={() => toggleCollapse(!collapseOpen)}
                  >
                    <span></span>
                    <span></span>
                  </button>
                </Col>
              </Row>
            </div>
            <Form className="navbar-search form-inline mr-sm-3 navbar-search-light">
              <FormGroup className={'mb-0' + searchFocus}>
                <InputGroup className="input-group-alternative input-group-merge">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      title={'search'}
                      onClick={(e) => handleKeyPress(e)}
                    >
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Tìm kiếm"
                    type="text"
                    value={input || ''}
                    onChange={(e) => handleInput(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    onFocus={() => setSearchFocus('focused')}
                    onBlur={() => setSearchFocus('')}
                  />

                  <InputGroupAddon addonType="append">
                    <InputGroupText onClick={() => input && setInput(null)}>
                      {input && <i className=" ni ni-fat-remove" />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <button aria-label="Close" className="close" type="button">
                <span aria-hidden={true}>×</span>
              </button>
            </Form>
            <Nav
              className="navbar-nav-hover align-items-lg-center ml-lg-auto"
              navbar
            >
              {isLoggedIn ? (
                <>
                  <HomeMenu />
                  <Notification />
                  <AccountMenu />
                </>
              ) : (
                <NavLink
                  data-toggle="dropdown"
                  onClick={() => toUrl()}
                  role="button"
                >
                  <Media className="align-items-center">
                    <span className="avatar avatar-sx rounded-circle">
                      <img
                        alt="..."
                        src={require('assets/img/faces/face.png').default}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span
                        className="mb-0 text-sm font-weight-bold"
                        style={{ cursor: 'pointer' }}
                      >
                        Đăng nhập
                      </span>
                    </Media>
                  </Media>
                </NavLink>
              )}

              <Button
                className="btn-icon"
                color="secondary"
                type="button"
                onClick={() => {
                  toUrl('/newpost');
                }}
              >
                <span className="btn-inner--icon">
                  <i className="fas fa-edit"></i>
                </span>
                <span className="btn-inner--text">Đăng bài</span>
              </Button>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

HomeNavbar.defaultProps = {
  type: 'dark',
};

HomeNavbar.propTypes = {
  type: PropTypes.oneOf(['dark', 'transparent', 'primary', 'white']),
};

export default HomeNavbar;
