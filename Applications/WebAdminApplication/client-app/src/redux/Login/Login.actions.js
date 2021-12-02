import authService from 'services/auth.service';
import { LOGIN_SUCCESS, LOGOUT, CHANGE_USEPROFILE } from './Login.constants';
import jwt_decode from 'jwt-decode';

export function login(data) {
  const user = jwt_decode(data.token.access_token);
  return {
    type: LOGIN_SUCCESS,
    payload: { user: user, userProfile: data.userProfile },
  };
}
export function storeUserProfile(data) {
  const userProfile = data;
  return {
    type: CHANGE_USEPROFILE,
    payload: { userProfile: userProfile },
  };
}

export const logout = () => {
  authService.logout();
  return {
    type: LOGOUT,
  };
};
