import React from 'react';
import {
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
  DropdownMenu,
  DropdownItem,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/Login/Login.actions';
import { useHistory } from 'react-router';

function AccountMenu(props) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const dispatch = useDispatch();
  const history = useHistory();
  function logoutUser() {
    dispatch(logout());
    history.push('/login');
  }
  return (
    <>
      <UncontrolledDropdown nav>
        <DropdownToggle
          tag={NavLink}
          data-toggle="dropdown"
          className="nav-link-icon"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
          id="navbar-success_dropdown_1"
          role="button"
        >
          <Media className="align-items-center">
            <span className="avatar avatar-sx rounded-circle">
              <img
                alt="..."
                src={
                  userProfile.avatarURL
                    ? userProfile.avatarURL
                    : 'https://www.dropbox.com/s/t4jamyq65xt41uo/t3ohtfyk.cjw.png?dl=1'
                }
              />
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span
                className="mb-0 text-sm font-weight-bold"
                style={{ fontSize: 14 }}
              >
                {userProfile.lastName + ' ' + userProfile.firstName}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu aria-labelledby="navbar-success_dropdown_1" left>
          <DropdownItem onClick={(e) => logoutUser(e)}>
            <i className="ni ni-lock-circle-open text-muted"></i>
            Đăng xuất
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}

AccountMenu.propTypes = {};

export default AccountMenu;
