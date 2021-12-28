import React, { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import {
  Badge,
  Col,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
// react library that creates nice scrollbar on windows devices
import { useSelector } from 'react-redux';
import notificationService from 'services/notification.service';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import ReactNotificationAlert from 'react-notification-alert';
const WS_URL = process.env.REACT_APP_WS_ENDPOINT;
function Notification(props) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const [connection, setConnection] = useState(null | HubConnection);
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();
  const [countNotifications, setCountNotifications] = useState(0);
  const notificationAlertRef = React.useRef(null);
  const notify = (type, message) => {
    let options = {
      place: 'tc',
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {type}
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(WS_URL + 'signalr')
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
    getNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getNotification = () => {
    notificationService
      .getNotificationByUserProfileId(userProfile.id)
      .then((req) => {
        setNotifications(req);
        for (let index = 0; index < req.length; index++) {
          var filtered = req.filter((r) => r.isRead === false);
          var count = filtered.length;
          setCountNotifications(count);
        }
      });
  };
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('BroadcastMessage', (message) => {
            if (message.recipientId === userProfile.id) {
              getNotification();
              notify('info', 'Bạn có 1 thông báo mới');
            }
          });
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection]);
  return (
    <UncontrolledDropdown nav>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <DropdownToggle className="nav-link" color="" tag="a">
        <div className="nav-link-icon">
          <i className="ni ni-bell-55 "></i>
          <span className="nav-link-inner--text d-lg-none">Another action</span>
        </div>
      </DropdownToggle>

      <DropdownMenu
        className="dropdown-menu-xl"
        aria-labelledby="navbar-success_dropdown_1"
        right
      >
        <div className="px-3 py-3">
          {countNotifications > 0 && (
            <h4 className="text-sm text-muted m-0">
              Bạn có <strong className="text-info">{countNotifications}</strong>{' '}
              thông báo mới.
            </h4>
          )}
        </div>
        <ListGroup style={{ maxHeight: 400, overflow: 'auto' }}>
          {notifications.map((item, i) => (
            <ListGroupItem
              className="list-group-item-action"
              onClick={(e) => history.push(item.notification.mainURL)}
              tag="a"
              key={i}
            >
              <Row className="align-items-center">
                <Col className="col-auto">
                  <img
                    alt="..."
                    className="avatar rounded-circle"
                    src={item.notificationActor.avatarURL}
                  />
                </Col>
                <div className="col ml--2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0 text-sm">
                        {item.notificationActor.lastName}{' '}
                        {item.notificationActor.firstName}
                      </h4>
                    </div>
                    <div className="text-right text-muted">
                      <small>{formatTime(item.notification.createdDate)}</small>
                    </div>
                  </div>
                  <p className="text-sm mb-0">{item.notification.message}</p>
                </div>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

Notification.propTypes = {};

export default Notification;
