import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Col,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';

export default function MenuNav(props) {
  const user = useSelector((state) => state.login.user);
  const role =
    user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const history = useHistory();
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="nav-link" color="" tag="a">
        <i className="ni ni-ungroup" />
      </DropdownToggle>
      <DropdownMenu
        className="dropdown-menu-lg dropdown-menu-dark bg-default"
        right
      >
        <Row className="shortcuts px-4">
          <Col
            className="shortcut-item"
            onClick={(e) => history.push('/posts')}
            xs="4"
            tag="a"
          >
            <span className="shortcut-media avatar rounded-circle bg-gradient-red">
              <i className="ni ni-folder-17" />
            </span>
            <small>Danh sách bài viết</small>
          </Col>
          {role === 'SysAdmin' && (
            <Col
              className="shortcut-item"
              onClick={(e) => history.push('/admin/post/waiting')}
              xs="4"
              tag="a"
            >
              <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                <i className="ni ni-lock-circle-open" />
              </span>
              <small>Trang quản trị</small>
            </Col>
          )}
        </Row>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
