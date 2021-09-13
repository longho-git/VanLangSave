/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// nodejs library that concatenates classes
// reactstrap components
import { Button, Card, CardBody } from 'reactstrap';
import InpuxText from 'components/Form/InputText';
import { FormHook } from 'components/Form';
import authService from 'services/auth.service';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { login } from './../Login/Login.actions';
// core components

function RegisterForm() {
  const [defaultValues, setDefaultValues] = useState({
    firstName: 'Phi Hùng',
    lastName: 'HoàngSDSA',
  });
  const [passwordLength, setPasswordLength] = useState(false);
  const [containsNumbers, setContainsNumbers] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [containsSymbols, setContainsSymbols] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    setLoading(true);
    authService.register(data).then((req) => {
      if (req.status === 400) {
        setError(req.data.message);
        setLoading(false);
        return;
      }
      dispatch(login(req.data));
      setLoading(false);
      history.push('/');
    });
  };
  const checkPass = (e) => {
    checkForNumbers(e.target.value);
    checkForUpperCase(e.target.value);
    checkForSymbols(e.target.value);
    checkPasswordLength(e.target.value);
  };
  const checkForNumbers = (string) => {
    var matches = new RegExp(/[0-9]/);
    setContainsNumbers(matches.test(string) ? true : false);
  };
  const checkForUpperCase = (string) => {
    var matches = new RegExp(/[A-Z]/);
    setIsUpperCase(matches.test(string) ? true : false);
  };
  const checkForSymbols = (string) => {
    var matches = new RegExp(/[^A-Z a-z0-9]/);
    setContainsSymbols(matches.test(string) ? true : false);
  };
  const checkPasswordLength = (string) => {
    setPasswordLength(string.length > 7 ? true : false);
  };
  let btnStatus =
    passwordLength && containsNumbers && isUpperCase && containsSymbols
      ? false
      : true;
  return (
    <div className="modal-body p-0">
      <Card className="bg-secondary border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h1>Đăng ký </h1>
            <p className="text-lead ">Nhanh chóng và dễ dàng</p>
          </div>
          <FormHook onSubmit={onSubmit} defaultValues={defaultValues}>
            <InpuxText
              name="lastName"
              placeholder="Nguyễn, Lê,..."
              label="Họ"
              icon={<i className="ni ni-hat-3" />}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />
            <InpuxText
              name="firstName"
              placeholder="Hùng,Tùng,..."
              label="Tên"
              icon={<i className="ni ni-hat-3" />}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />
            <InpuxText
              name="birthDay"
              placeholder="31/03/1999"
              label="Ngày sinh"
              type="date"
              icon={<i className="ni ni-hat-3" />}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />
            <InpuxText
              name="email"
              placeholder="hung.t174800@vanlanguni.vn"
              label="Email"
              icon={<i className="ni ni-email-83" />}
              rules={{
                required: 'Vui lòng không bỏ trống',
                pattern: {
                  value:
                    /^([a-zA-Z0-9]+[a-zA-Z0-9\.]*[a-zA-Z0-9]+)@(vanlanguni)\.(vn)$/,
                  message:
                    'Vui lòng dùng email của văn lang có định dạng @vanlanguni.vn',
                },
              }}
            />

            <InpuxText
              name="password"
              placeholder="Password@1"
              label="Mật khẩu"
              type="password"
              icon={<i className="ni ni-lock-circle-open" />}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
              onChange={(value) => checkPass(value)}
            />
            <div className="text-muted font-italic">
              <small>
                password strength:{' '}
                <div
                  className={
                    passwordLength
                      ? 'text-success'
                      : 'text-danger font-weight-700'
                  }
                >
                  Hơn 8 ký tự{' '}
                  {passwordLength ? (
                    <i className="ni ni-check-bold"></i>
                  ) : (
                    <i className="ni  ni-fat-remove"></i>
                  )}
                </div>
                <div
                  className={
                    containsNumbers
                      ? 'text-success'
                      : 'text-danger font-weight-700'
                  }
                >
                  Có số{' '}
                  {containsNumbers ? (
                    <i className="ni ni-check-bold"></i>
                  ) : (
                    <i className="ni  ni-fat-remove"></i>
                  )}
                </div>
                <div
                  className={
                    isUpperCase ? 'text-success' : 'text-danger font-weight-700'
                  }
                >
                  Chữ cái viết hoa{' '}
                  {isUpperCase ? (
                    <i className="ni ni-check-bold"></i>
                  ) : (
                    <i className="ni  ni-fat-remove"></i>
                  )}
                </div>
                <div
                  className={
                    containsSymbols
                      ? 'text-success'
                      : 'text-danger font-weight-700'
                  }
                >
                  Ký tự đặt biệt{' '}
                  {containsSymbols ? (
                    <i className="ni ni-check-bold"></i>
                  ) : (
                    <i className="ni  ni-fat-remove"></i>
                  )}
                </div>
              </small>
            </div>
            <div className="text-center">
              {!loading && (
                <Button disabled={btnStatus} className="mt-4" color="info">
                  Tạo tài khoản
                </Button>
              )}
              {loading && (
                <Button className="my-4" color="info" type="button" disabled>
                  <i class="fas fa-spinner fa-spin"></i>
                  Vui lòng đợi
                </Button>
              )}
            </div>
          </FormHook>
        </CardBody>
      </Card>
    </div>
  );
}

export default RegisterForm;
