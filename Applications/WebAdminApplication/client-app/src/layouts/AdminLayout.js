import React, { Fragment } from 'react';
// react library for routing
import { useLocation, Route } from 'react-router-dom';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';

function AdminLayout(props) {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf('admin/alternative-dashboard') === -1
      ? 'dark'
      : 'light';
  };

  return (
    <>
      <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
          <Fragment>
            <Sidebar
              routes={routes}
              toggleSidenav={toggleSidenav}
              sidenavOpen={sidenavOpen}
              logo={{
                innerLink: '/',
                imgSrc: require('assets/img/brand/logo.png').default,
                imgAlt: '...',
              }}
            />
            <div className="main-content" ref={mainContentRef}>
              <AdminNavbar
                theme={getNavbarTheme()}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                brandText={getBrandText(location.pathname)}
              />
              {<props.component {...propsComponent} />}
              <AdminFooter />
            </div>
            {sidenavOpen ? (
              <div className="backdrop d-xl-none" onClick={toggleSidenav} />
            ) : null}
          </Fragment>
        )}
      />
    </>
  );
}

export default AdminLayout;
