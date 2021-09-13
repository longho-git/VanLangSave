import React from 'react';
// react library for routing
import { useLocation } from 'react-router-dom';

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.js';
import AuthFooter from 'components/Footers/AuthFooter.js';
import { Route } from 'react-router-dom';
import { Fragment } from 'react';

function AuthLayout(props) {
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
    document.body.classList.add('bg-default');
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.remove('bg-default');
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
          <Fragment>
            <AuthNavbar />
            <div className="main-content" ref={mainContentRef}>
              {<props.component {...propsComponent} />}
            </div>
            <AuthFooter />
          </Fragment>
        )}
      />
    </>
  );
}

export default AuthLayout;
