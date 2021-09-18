import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import loginReducer from 'redux/Login/Login.reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    login: loginReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
