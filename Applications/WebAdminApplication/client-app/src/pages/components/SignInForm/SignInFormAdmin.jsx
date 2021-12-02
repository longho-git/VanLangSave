import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import authService from 'services/auth.service';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from 'redux/Login/Login.actions';
import { useHistory } from 'react-router';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';

function SignInFormAdmin(props) {
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
        'Manager'
      ) {
        history.push('/admin/postwaiting');
        return;
      }
      history.push('/admin/categories');
    });
  };
  return (
    <>
      <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
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
        <Button className="mt-3" color="primary">
          Đăng nhập
        </Button>
      </FormCustom>
    </>
  );
}

SignInFormAdmin.propTypes = {};

export default SignInFormAdmin;
