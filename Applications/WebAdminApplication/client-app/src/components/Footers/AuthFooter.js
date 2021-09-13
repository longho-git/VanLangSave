/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 TRƯỜNG ĐẠI HỌC VĂN LANG (https://www.creative-tim.com)

* Coded by TRƯỜNG ĐẠI HỌC VĂN LANG

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from 'reactstrap';

function AuthFooter() {
  return (
    <>
      <footer className="py-5" id="footer-main">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{' '}
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.vanlanguni.edu.vn/"
                  target="_blank"
                >
                  TRƯỜNG ĐẠI HỌC VĂN LANG
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.vanlanguni.edu.vn/"
                    target="_blank"
                  >
                    TRƯỜNG ĐẠI HỌC VĂN LANG
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com/presentation?ref=adpr-auth-footer"
                    target="_blank"
                  >
                    <i className="fab fa-facebook"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="http://blog.creative-tim.com?ref=adpr-auth-footer"
                    target="_blank"
                  >
                    <i className="fab fa-youtube"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://www.creative-tim.com/license?ref=adpr-auth-footer"
                    target="_blank"
                  >
                    <i className="fab fa-instagram"></i>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
