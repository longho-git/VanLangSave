// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  Container,
  Row,
  Col,
} from 'reactstrap';
// core components
import ProfileHeader from 'components/Headers/ProfileHeader.js';
import { useEffect, useState } from 'react';
import userService from 'services/user.service';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'dropzone';
import { storeUserProfile } from '../auth/Login/Login.actions';
import UserProfileSetting from './component/UserProfileSetting';
import UserSetting from './component/UserSetting';
const API_URL = process.env.REACT_APP_API_ENDPOINT;
function UserProfilePage() {
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const userProfile = useSelector((state) => state.login.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    new Dropzone(document.getElementById('dropzone-single'), {
      url: `${API_URL}FileManager/uploadFileDefault`,
      success: function (file, response) {
        userService
          .changeImageUser(userProfile.id, response.value)
          .then((req) => {
            if (req.status === 400) {
              return;
            }
            userService.getUserProfileById(req).then((data) => {
              dispatch(storeUserProfile(data));
              setEdit(false);
            });
          });
      },
      thumbnailWidth: null,
      thumbnailHeight: null,
      paramName: 'formFile',
      dictDefaultMessage: 'Đổi ảnh',
      previewsContainer:
        document.getElementsByClassName('dz-preview-single')[0],
      previewTemplate:
        document.getElementsByClassName('dz-preview-single')[0].innerHTML,
      maxFiles: 1,
      acceptedFiles: 'image/*',
      init: function () {
        this.on('addedfile', function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      },
    });
    document.getElementsByClassName('dz-preview-single')[0].innerHTML = '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProfileHeader name={userProfile.firstName} />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-2" xl="4">
            <Card className="card-profile">
              <CardImg
                alt="..."
                src={require('assets/img/theme/img-1-1000x600.jpg').default}
                top
              />
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          userProfile.avatarURL
                            ? userProfile.avatarURL
                            : require('assets/img/theme/team-4.jpg').default
                        }
                      />
                    </a>
                  </div>
                  <div
                    className="card-profile-image dropzone"
                    id="dropzone-single"
                  >
                    <div className="fallback">
                      <div className="custom-file">
                        <input
                          className="custom-file-input"
                          id="projectCoverUploads"
                          type="file"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="projectCoverUploads"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    <div className="dz-preview dz-preview-single">
                      <div className="dz-preview-cover">
                        <img
                          alt="..."
                          className="dz-preview-img rounded-circle dz-preview-single"
                          style={{ zIndex: 1000 }}
                          data-dz-thumbnail=""
                          src={require('assets/img/theme/team-2.jpg').default}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Kêt nối
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Tin nhắn
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Bạn bè</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Ảnh</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Bình luận</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h5 className="h3">
                    {userProfile.lastName + ' ' + userProfile.firstName}
                  </h5>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Thông tin cá nhân</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => setEdit(!edit)}
                      size="sm"
                    >
                      {!edit ? (
                        <i className="fas fa-edit"></i>
                      ) : (
                        <i className="fas fa-window-close"></i>
                      )}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Thông tin người dùng
                </h6>
                <UserProfileSetting
                  edit={edit}
                  userId={userProfile.userId}
                  userProfileId={userProfile.id}
                  setEdit={(value) => setEdit(value)}
                />
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Tài khoản</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => setEdit(!edit)}
                      size="sm"
                    >
                      {!edit ? (
                        <i className="fas fa-edit"></i>
                      ) : (
                        <i className="fas fa-window-close"></i>
                      )}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  Thông tin tài khoản
                </h6>
                <UserSetting
                  edit={editUser}
                  userId={userProfile.userId}
                  setEdit={(value) => setEditUser(value)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserProfilePage;
