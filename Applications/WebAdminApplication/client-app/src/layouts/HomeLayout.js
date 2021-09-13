import AuthFooter from 'components/Footers/AuthFooter.js';
import HomeNavbar from 'components/Navbars/HomeNavbar';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function HomeLayout(props) {
  return (
    <>
      <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) =>
          props.isAuthenticated && props.userProfile ? (
            <Fragment>
              <HomeNavbar />
              <div className="main-content">
                {<props.component {...propsComponent} />}
              </div>
              <AuthFooter />
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isLoggedIn,
  userProfile: state.login.userProfile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
