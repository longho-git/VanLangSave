import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import authService from 'services/auth.service';
import userService from 'services/user.service';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { storeUserProfile } from 'redux/Login/Login.actions';
import { login } from 'redux/Login/Login.actions';
import { useHistory } from 'react-router';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';

function SignInForm(props) {
  const [defaultValues, setDefaultValues] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    setLoading(true);
    authService.login(data.username, data.password).then((data) => {
      if (data.status === 400) {
        setError(data.data.message);
        setLoading(false);
        return;
      }
      const user = jwt_decode(data.token.access_token);
      localStorage.setItem('token', JSON.stringify(data.token.access_token));
      dispatch(login(data));
      setLoading(false);
      if (
        user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ===
        'NormalUser'
      ) {
        history.push('/');
        return;
      }
      history.push('/admin/categories');
    });
  };
  return (
    <>
      <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
        <Row className="align-items-center justify-content-center">
          <Col className="text-center " md="9">
            <h2>Đăng nhập</h2>
            <Button
              className="btn-neutral btn-icon"
              color="default"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon mr-1">
                <img
                  alt="..."
                  src={require('assets/img/icons/common/outlook.svg').default}
                />
              </span>
              <span className="btn-inner--text">Email Văn Lang</span>
            </Button>
            <span className="text-default mb-4">
              hoặc sử dụng tài khoản của bạn
            </span>
          </Col>
        </Row>
        <InputCustom
          name="username"
          label="Email hoặc Username"
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <InputCustom
          name="password"
          label="Mật khẩu"
          type="password"
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <a href="#pablo" onClick={(e) => e.preventDefault()}>
          Quên mật khẩu?
        </a>
        <Button className="mt-3" color="primary">
          Đăng nhập
        </Button>
      </FormCustom>
    </>
  );
}

SignInForm.propTypes = {};

export default SignInForm;
