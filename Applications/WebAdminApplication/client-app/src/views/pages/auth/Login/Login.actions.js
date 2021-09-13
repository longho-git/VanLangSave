import authService from 'services/auth.service';
import { LOGIN_SUCCESS, LOGOUT, CHANGE_USEPROFILE } from './Login.constants';

export function login(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: { user: data },
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
