import React, { Fragment } from 'react';
import HomeNavbar from './component/Navbar/HomeNavbar';
import HomeFooter from './component/Footer/HomeFooter';
import { Button } from 'reactstrap';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function HomeLayout(props) {
  const user = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useHistory();
  React.useEffect(() => {
    if (
      isLoggedIn &&
      user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ===
        'SysAdmin'
    ) {
      history.push('/admin/categories');
      return;
    }
    document.body.classList.add('index-page');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    var href = window.location.href.substring(
      window.location.href.lastIndexOf('#') + 1,
    );
    if (
      window.location.href.lastIndexOf('#') > 0 &&
      document.getElementById(href)
    ) {
      document.getElementById(href).scrollIntoView();
    }
    return function cleanup() {
      document.body.classList.remove('index-page');
    };
  });

  return (
    <>
      <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
          <Fragment>
            <HomeNavbar type="primary" isLoggedIn={isLoggedIn} />
            <Button
              className="btn-icon-only back-to-top show"
              color="primary"
              name="button"
              type="button"
              onClick={() => {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
              }}
            >
              <i className="ni ni-bold-up"></i>
            </Button>
            <div className="wrapper">
              <div className="section section-hero section-shaped">
                <div className="page-header">
                  <img
                    alt="..."
                    className="bg-image"
                    src={require('assets/img/ill/index_bg.svg').default}
                  ></img>
                </div>
                {
                  <props.component
                    {...propsComponent}
                    isLoggedIn={isLoggedIn}
                    token={token}
                  />
                }
              </div>
              <HomeFooter />
            </div>
          </Fragment>
        )}
      />
    </>
  );
}

HomeLayout.propTypes = {};

export default HomeLayout;
