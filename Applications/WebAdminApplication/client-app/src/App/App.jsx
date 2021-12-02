import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from 'redux/Login/Login.actions';
import AdminRoutes from 'routes/admin.routes';
import HomeRoutes from 'routes/home.routes';
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const decodedJwt = parseJwt(token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(logout());
        history.push('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      <HomeRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;
