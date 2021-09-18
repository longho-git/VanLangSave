import React from 'react';
import AdminRoutes from 'routes/admin.routes';
import HomeRoutes from 'routes/home.routes';

function App() {
  return (
    <>
      <HomeRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;
