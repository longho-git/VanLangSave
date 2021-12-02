import React, { useEffect } from 'react';
// JavaScript library for creating Dropdown Selects
// reactstrap components
import {
  Alert,
  Button,
  Card,
  FormGroup,
  Form,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Media,
  CardBody,
  CardTitle,
} from 'reactstrap';

// Core Components
import { Link } from 'react-router-dom';
import AccountProfileForm from './components/AccountProfileForm';
import PostsOfUser from './components/PostsOfUser';
import postService from 'services/post.service';
import registerPostExchangeService from 'services/registerPostExchange.service';
import { useSelector } from 'react-redux';
function InfomationPage({ isLoggedIn }) {
  const [activeTab, setActiveTab] = React.useState('tab1');
  const [countPost, setCountPost] = React.useState(0);
  const [countExchangeDone, setCountExchangeDone] = React.useState(0);
  const userProfile = useSelector((state) => state.login.userProfile);
  useEffect(() => {
    postService.getAllPostByUserId().then((req) => {
      setCountPost(req.length);
    });
    registerPostExchangeService
      .countExchangeDone(userProfile.id)
      .then((req) => {
        console.log(
          '🚀 ~ file: InfomationPage.jsx ~ line 41 ~ registerPostExchangeService.countExchangeDone ~ req',
          req,
        );
        setCountExchangeDone(req);
      });
  }, []);
  return (
    <>
      {/* <DemoNavbar type="transparent" /> */}
      <Container className="mt-5 " style={{ maxWidth: 1200 }}>
        <Row>
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Trang chủ</Link>
              </BreadcrumbItem>
              <BreadcrumbItem aria-current="page" className="active">
                Tài khoản của tôi
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md="3">
            <div className="section">
              <section>
                <Media className="align-items-center">
                  <img
                    alt="..."
                    className="avatar-xl rounded-circle"
                    src={userProfile.avatarURL}
                  ></img>
                  <Media body className="pl-2">
                    <h4 className="mb-0 d-block">
                      {userProfile.lastName} {userProfile.firstName}
                    </h4>
                    {/* <span className="text-muted text-small">Sửa hồ sơ</span> */}
                  </Media>
                </Media>
                <br></br>
                <Nav className="flex-column" role="tablist">
                  <NavItem>
                    <NavLink
                      className={activeTab === 'tab1' ? 'active' : ''}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('tab1');
                      }}
                    >
                      <i className="tim-icons icon-single-02"></i>
                      Thông tin tài khoản
                    </NavLink>
                  </NavItem>
                  <hr
                    className="line-primary"
                    style={{
                      width: '100%',
                      height: 0,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  ></hr>
                  <NavItem>
                    <NavLink
                      className={activeTab === 'tab2' ? 'active' : ''}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('tab2');
                      }}
                    >
                      <i className="tim-icons icon-credit-card"></i>
                      Bài đăng
                    </NavLink>
                  </NavItem>
                  <hr
                    className="line-primary"
                    style={{
                      width: '100%',
                      height: 0,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  ></hr>
                  <NavItem>
                    <NavLink
                      className={activeTab === 'tab3' ? 'active' : ''}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('tab3');
                      }}
                    >
                      <i className="tim-icons icon-credit-card"></i>
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <hr
                    className="line-primary"
                    style={{
                      width: '100%',
                      height: 0,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  ></hr>
                  {/* <NavItem>
                    <NavLink
                      className={activeTab === 'tab3' ? 'active' : ''}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('tab3');
                      }}
                    >
                      <i className="tim-icons icon-lock-circle"></i>
                      Security
                    </NavLink>
                  </NavItem>
                  <hr
                    className="line-primary"
                    style={{
                      width: '100%',
                      height: 0,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  ></hr>
                  <NavItem>
                    <NavLink
                      className={activeTab === 'tab4' ? 'active' : ''}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('tab4');
                      }}
                    >
                      <i className="tim-icons icon-volume-98"></i>
                      Notifications
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </section>
            </div>
          </Col>
          <Col md="9">
            <Card className="container bg-white mb-0 py-2">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="tab1">
                  {isLoggedIn && <AccountProfileForm />}
                </TabPane>
                <TabPane tabId="tab2">
                  <header>
                    <h2 className="text-uppercase">Bài đăng</h2>
                  </header>
                  <hr
                    className="line-primary"
                    style={{
                      width: '100%',
                      height: 0,
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
                  ></hr>
                  <br></br>
                  {isLoggedIn && <PostsOfUser />}
                </TabPane>
                <TabPane tabId="tab3">
                  <Row>
                    <Col md="6" xl="6">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Số lượng bài viết
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {countPost}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                <i className="ni ni-active-40" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6" xl="6">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Số lượng trao đổi thành công
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {countExchangeDone}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                <i className="ni ni-chart-pie-35" />
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="tab4">
                  <Container>
                    <Row>
                      <Col xs="12">
                        <Alert className="text-small" color="primary">
                          <i className="icon-shield"></i>
                          <span>
                            We will never distribute your email address to third
                            parties. Read about email communication in our
                            privacy policy.
                          </span>
                        </Alert>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col xs="12">
                        <Form>
                          <h5 className="mb-4">Notification Preferences</h5>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              defaultChecked
                              id="notification1"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification1"
                            >
                              <span>Someone mentions me</span>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              defaultChecked
                              id="notification2"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification2"
                            >
                              <span>Someone follows me</span>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="notification3"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification3"
                            >
                              <span>Someone shares my activty</span>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="notification4"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification4"
                            >
                              <span>Someone messages me</span>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="notification5"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification5"
                            >
                              <span>Someone adds me to a project</span>
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox mb-3">
                            <input
                              className="custom-control-input"
                              id="notification6"
                              type="checkbox"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="notification6"
                            >
                              <span>Sales and promotions</span>
                            </label>
                          </div>
                          <Button
                            className="mt-3 mb-5"
                            color="primary"
                            size="sm"
                            type="submit"
                          >
                            Update preferences
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col xs="12">
                        <Form>
                          <h5>Notification Frequency</h5>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id="freq1"
                              name="custom-radio-1"
                              type="radio"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="freq1"
                            >
                              <span>Daily</span>
                            </label>
                          </div>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id="freq2"
                              name="custom-radio-1"
                              type="radio"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="freq2"
                            >
                              <span>Weekly</span>
                            </label>
                          </div>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              id="freq3"
                              name="custom-radio-1"
                              type="radio"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="freq3"
                            >
                              <span>Monthly</span>
                            </label>
                          </div>
                          <div className="custom-control custom-radio mb-3">
                            <input
                              className="custom-control-input"
                              defaultChecked
                              id="freq4"
                              name="custom-radio-1"
                              type="radio"
                            ></input>
                            <label
                              className="custom-control-label"
                              htmlFor="freq4"
                            >
                              <span>Never</span>
                            </label>
                          </div>
                          <Button
                            className="mt-3"
                            color="primary"
                            size="sm"
                            type="submit"
                          >
                            Update
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InfomationPage;
