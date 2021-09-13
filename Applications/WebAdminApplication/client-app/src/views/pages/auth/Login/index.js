import React, { memo, useState } from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
// core components
import AuthHeader from 'components/Headers/AuthHeader.js';
import { Link, useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { login } from './Login.actions';
import { compose } from 'redux';
import authService from 'services/auth.service';
import userService from 'services/user.service';
import { storeUserProfile } from 'views/pages/auth/Login/Login.actions';
import jwt_decode from 'jwt-decode';

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (data) => {
      dispatch(login(data));
    },
  };
}

function LoginPage({ onLogin }) {
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    authService.login(username, password).then((data) => {
      if (data.status === 400) {
        setError(data.data.message);
        setLoading(false);
        return;
      }
      const user = jwt_decode(data.access_token);
      localStorage.setItem('token', JSON.stringify(data.access_token));
      onLogin(user);
      setLoading(false);

      userService
        .getUserProfile(
          user[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ],
        )
        .then((req) => {
          dispatch(storeUserProfile(req));
          if (
            user[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ] === 'NormalUser'
          ) {
            history.push('/');
            return;
          }
          history.push('/admin/post/waiting');
        });
    });
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
    setTimeout(() => {
      setError('');
    }, 1000);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setTimeout(() => {
      setError('');
    }, 1000);
  };
  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead="Văn Lang Save giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Đăng nhập với</small>
                </div>

                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require('assets/img/icons/common/outlook.svg').default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Email Văn Lang</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Hoặc tài khoản đã đăng ký</small>
                </div>
                {error && (
                  <Alert color="danger" fade>
                    <span className="alert-inner--text">
                      <strong>Danger!</strong> {error}
                    </span>
                  </Alert>
                )}
                <Form role="form">
                  <FormGroup
                    className={classnames('mb-3', {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onChange={handleUsername}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        onChange={handlePassword}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Nhớ mật khẩu</span>
                    </label>
                  </div>
                  <div className="text-center">
                    {!loading && (
                      <Button
                        className="my-4"
                        color="info"
                        type="button"
                        onClick={(event) => {
                          submit(event);
                        }}
                      >
                        Đăng nhập
                      </Button>
                    )}
                    {loading && (
                      <Button
                        className="my-4"
                        color="info"
                        type="button"
                        disabled
                      >
                        <i class="fas fa-spinner fa-spin"></i>
                        Đang kiểm tra
                      </Button>
                    )}
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <a
                  className="text-light"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot password?</small>
                </a>
              </Col>
              <Col className="text-right" xs="6">
                <Link className="text-light" to="/auth/register">
                  <small>Create new account</small>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
