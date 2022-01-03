import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import authService from 'services/auth.service';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from 'redux/Login/Login.actions';
import { useHistory } from 'react-router';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from 'utils/authConfig';

function SignInForm(props) {
  const { instance } = useMsal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    setLoading(true);
    authService.loginMSA(data).then((data) => {
      if (data.status === 400) {
        setError(data.data.message);
        setLoading(false);
        return;
      }
      loginDispatch(data);
    });
  };
  const loginDispatch = ({ data }) => {
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
  };
  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((req) => {
        onSubmit({
          firstName: req.idTokenClaims.family_name,
          lastName: req.idTokenClaims.given_name,
          email: req.account.username,
          uniqueId: req.uniqueId,
        });
      })
      .catch((e) => {
        setError('Vui lòng sử dụng email của hệ thống giáo dục Văn Lang!');
      });
  };

  return (
    <>
      <form>
        <Row className="align-items-center justify-content-center">
          <Col className="text-center " md="12">
            <h2>Đăng nhập</h2>
            <Button
              className="btn-neutral btn-icon"
              color="default"
              onClick={() => handleLogin()}
            >
              <span className="btn-inner--icon mr-1">
                <img
                  alt="..."
                  src={require('assets/img/icons/common/outlook.svg').default}
                />
              </span>
              <span className="btn-inner--text">Email Văn Lang</span>
            </Button>
          </Col>
          <Col className="text-center " md="12">
            {error && <p class="mb-0 text-danger">{error}</p>}
          </Col>
        </Row>
      </form>
    </>
  );
}

SignInForm.propTypes = {};

export default SignInForm;
