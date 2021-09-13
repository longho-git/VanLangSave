import React from 'react';
import {
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from 'views/pages/auth/Login/Login.actions';

const DropdownProfile = ({ userName, avartarURL }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  function handleClick(url) {
    history.push(url);
  }
  function logoutUser(e) {
    // e.preventDefault();
    dispatch(logout());
    history.push('/login');
  }
  return (
    <>
      <UncontrolledDropdown nav>
        <DropdownToggle className="nav-link pr-0" color="" tag="a">
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              <img alt="..." src={avartarURL} />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">{userName}</span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem href="#pablo" onClick={() => handleClick('/profile')}>
            <i className="ni ni-single-02" />
            <span>Thông tin của tôi</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={(e) => logoutUser(e)}>
            <i className="ni ni-user-run" />
            <span>Đăng xuất</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

DropdownProfile.propTypes = {};

export default DropdownProfile;
