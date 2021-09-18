import React from 'react';
// reactstrap components
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

function HomeFooter(props) {
  const [searchFocus, setSearchFocus] = React.useState('');
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
              <Col md="4">
                <div className="column">
                  <img
                    alt="..."
                    className="logo"
                    src={require('assets/img/brand/white.png').default}
                  ></img>
                </div>
              </Col>
              <Col md="2" xs="6">
                <div className="column">
                  <h4 className="mt-3">Danh mục</h4>
                  <ul>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Payments</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Billing</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Connect</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Sigma</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Issuing</span>
                      </a>
                    </li>
                    <li>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <span>Terminal</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="2" xs="6">
                <div className="column">
                  <h4 className="mt-3">Menu</h4>
                  <ul>
                    <NavItem>
                      <a href="https://creative-tim.com/contact-us">
                        Trang chủ
                      </a>
                    </NavItem>
                    <NavItem>
                      <a href="https://creative-tim.com/about-us">Danh mục</a>
                    </NavItem>
                  </ul>
                </div>
              </Col>

              <Col md="3" xs="6">
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
