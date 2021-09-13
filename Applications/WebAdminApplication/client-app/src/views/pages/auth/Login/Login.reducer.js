/* eslint-disable import/no-anonymous-default-export */

import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './Login.constants';
import { produce } from 'immer';
import { CHANGE_USEPROFILE } from './Login.constants';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type, payload } = action;
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
          userProfile: null,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          userProfile: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
          userProfile: payload.userProfile,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          userProfile: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          userProfile: null,
        };
      case CHANGE_USEPROFILE:
        return {
          ...state,
          userProfile: payload.userProfile,
        };
      default:
        return state;
    }
  });

export default loginReducer;
