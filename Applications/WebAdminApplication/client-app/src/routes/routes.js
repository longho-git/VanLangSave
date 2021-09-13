import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeLayout from 'layouts/HomeLayout';
import HomePage from 'views/pages/home/Loadable';
import UserProfilePage from 'views/pages/userProfile/Loadable';
import AuthLayout from 'layouts/AuthLayout';
import LoginPage from 'views/pages/auth/Login/Loadable';
import AdminLayout from 'layouts/AdminLayout';
import routes from './../routes';
import ListPostUser from 'views/pages/listPostUser';

export default function Routes() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === '/admin') {
        return (
          <AdminLayout
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <Switch>
      {getRoutes(routes)}
      <HomeLayout exact path="/" component={HomePage} />
      <HomeLayout exact path="/profile" component={UserProfilePage} />
      <HomeLayout exact path="/posts" component={ListPostUser} />
      <AuthLayout exact path="/login" component={LoginPage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
}
