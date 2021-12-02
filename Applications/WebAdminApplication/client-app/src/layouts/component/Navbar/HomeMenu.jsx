import React from 'react';
import {
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function HomeMenu(props) {
  return (
    <UncontrolledDropdown nav>
      <DropdownToggle className="nav-link" color="" tag="a">
        <div className="nav-link-icon">
          <i className="ni ni-books "></i>
          <span className="nav-link-inner--text d-lg-none">Another action</span>
        </div>
      </DropdownToggle>
      <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
        <DropdownItem to="/userpost" tag={Link}>
          <i className="fas fa-newspaper text-info"></i>
          Danh sách bài viết
        </DropdownItem>
        <DropdownItem to="/registerList" tag={Link}>
          <i className="fas fa-file-alt text-info"></i>
          Danh sách đăng ký
        </DropdownItem>
        <DropdownItem to="/registerExchangeList" tag={Link}>
          <i className="fas fa-file-alt text-info"></i>
          Danh sách yêu cầu trao đổi
        </DropdownItem>
        <DropdownItem to="/history" tag={Link}>
          <i className="fas fa-file-alt text-info"></i>
          Lịch sử trao đổi
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

HomeMenu.propTypes = {};

export default HomeMenu;
