import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import { Switch } from 'react-router-dom';
import routes from 'routes';

export default function AdminRoutes() {
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
  return <Switch>{getRoutes(routes)}</Switch>;
}
