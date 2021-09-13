import React, { useEffect, useState } from 'react';
import { formatTime } from './../../../../utils/fortmatTime';
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  Row,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { connect, useSelector } from 'react-redux';
import userService from 'services/user.service';

function Newfeed({ item }) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const [owner, setOwner] = useState(null);
  useEffect(() => {
    item &&
      userService.getUserProfile(item.userId).then((req) => {
        setOwner(req);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    owner && (
      <>
        <Card>
          <CardHeader className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="avatar"
                  src={
                    owner.avatarURL
                      ? owner.avatarURL
                      : require('assets/img/theme/team-1.jpg').default
                  }
                />
              </a>
              <div className="mx-3">
                <a
                  className="text-dark font-weight-600 text-sm"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  {owner.firstName}
                </a>

                <small className="d-block text-muted">
                  {formatTime(item.createdDate)}
                </small>
              </div>
            </div>
            <div className="text-right ml-auto">
              <Button
                className="btn-icon"
                color={item.type === 1 ? 'primary' : 'info'}
                size="sm"
                type="button"
              >
                <span className="btn-inner--icon mr-1">
                  {item.type === 1 ? (
                    <i className="fas fa-gift" />
                  ) : (
                    <i className="fas fa-exchange-alt" />
                  )}
                </span>
                <span className="btn-inner--text">{item.typeName}</span>
              </Button>
              {item.userId === userProfile.userId && (
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Button color="secondary" size="sm" type="button">
                      ...
                    </Button>
                  </DropdownToggle>
                  <DropdownMenu left>
                    <DropdownItem tag="button">
                      <i className="ni ni-fat-remove" />
                      <span>xoá</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </div>
          </CardHeader>
          <CardBody>
            <p className="mb-4">{item.title}</p>
            <img alt="..." className="img-fluid rounded" src={item.imageMain} />
            <Row className="align-items-center my-3 pb-3 border-bottom">
              <Col sm="6">
                <div className="icon-actions">
                  <a
                    className="like active"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="ni ni-like-2" />
                    <span className="text-muted">150</span>
                  </a>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-chat-round" />
                    <span className="text-muted">36</span>
                  </a>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <i className="ni ni-curved-next" />
                    <span className="text-muted">12</span>
                  </a>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </>
    )
  );
}

Newfeed.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.login.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Newfeed);
