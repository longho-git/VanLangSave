import SignInForm from 'pages/components/SignInForm/SignInForm';
import SignUpForm from 'pages/components/SignUpForm/SignUpForm';
import React from 'react';
import { useHistory } from 'react-router';

// reactstrap components
import { Button, Container } from 'reactstrap';

function AuthenticationPage({ isLoggedIn }) {
  const [activeContainer, setActiveContainer] = React.useState('');
  const history = useHistory();
  React.useEffect(() => {
    isLoggedIn && history.push('/');
    document.body.classList.add('register-page');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
    };
  }, []);

  return (
    <>
      <div className="register-header  page-header ">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              'url(' + require('assets/img/ill/index_bg.svg').default + ')',
          }}
        ></div>
        <Container className={activeContainer}>
          <div className="form-container sign-up-container">
            <SignUpForm />
          </div>
          <div className="form-container sign-in-container">
            <SignInForm />
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="text-white">Chào mừng trở lại!</h1>
                <p>
                  Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông
                  tin cá nhân của bạn
                </p>
                <Button
                  className="btn-neutral"
                  color="default"
                  id="signIn"
                  size="sm"
                  onClick={() => setActiveContainer('')}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="text-white">Chào bạn!</h1>
                <p>
                  Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng
                  tôi
                </p>
                <Button
                  className="btn-neutral"
                  color="default"
                  id="signUp"
                  size="sm"
                  onClick={() => setActiveContainer('right-panel-active')}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default AuthenticationPage;
