import React from 'react';
import ReactDOM from 'react-dom';
// react library for routing

// plugins styles from node_modules
import 'react-notification-alert/dist/animate.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'select2/dist/css/select2.min.css';
import 'quill/dist/quill.core.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// plugins styles downloaded
import 'assets/vendor/nucleo/css/nucleo.css';
// core styles
import 'assets/scss/argon-dashboard-pro-react.scss?v1.2.0';

// import AuthLayout from 'layouts/Auth.js';
import { Provider } from 'react-redux';
import configureStore from 'utils/store';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import App from './App/App';

// Create redux store with history
const initialState = {};
const storeConfig = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <Provider store={storeConfig}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  MOUNT_NODE,
);
