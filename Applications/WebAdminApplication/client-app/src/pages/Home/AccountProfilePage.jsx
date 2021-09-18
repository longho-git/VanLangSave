import React, { useState } from 'react';
// JavaScript library for creating Dropdown Selects
// reactstrap components
import {
  Button,
  Card,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from 'reactstrap';
import ImageUpload from 'pages/components/Upload/ImageUpload';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import { SelectCustom } from 'layouts/component/SmartFormHook/SelectCustom/SelectCustom';
import userService from 'services/user.service';
import { useSelector } from 'react-redux';

// Core Components

function AccountProfilePage() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [defaultValues, setDefaultValues] = useState({});
  const userProfile = useSelector((state) => state.login.userProfile);
  function getUserProfile(acountId) {
    userService.getUserProfileById(acountId).then((data) => {
      if (data.status === 400) {
        return;
      }
      setDefaultValues(data);
    });
  }
  React.useEffect(() => {
    getUserProfile(userProfile.id);
  }, [userProfile.id]);
  React.useEffect(() => {
    document.body.classList.add('account-settings');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('account-settings');
    };
  }, []);
  const onSubmit = async (data) => {
    console.log(
      '🚀 ~ file: AccountProfilePage.jsx ~ line 54 ~ onSubmit ~ data',
      data,
    );
  };
  return (
    <>
      <div className="section-shaped my-0 skew-separator skew-mini">
        <div className="page-header page-header-small header-filter">
          <div
            className="page-header-image"
            style={{
              backgroundImage:
                'url(' + require('assets/img/pages/georgie.jpg').default + ')',
            }}
          ></div>
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col className="px-5" lg="6" md="8" xl="5">
                  <h1 className="text-white">Tài khoản của bạn</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      <div className="bg-secondary">
        <Card className="container bg-white mb-0">
          <Row>
            <Col md="3">
              <div className="section">
                <section className="text-center">
                  <ImageUpload
                    avatar={userProfile.avatarURL}
                    changeBtnColor="primary"
                    changeBtnClasses="btn-sm btn-round mt-3"
                    addBtnColor="primary"
                    addBtnClasses="btn-sm btn-round mt-3"
                    removeBtnClasses="btn-sm btn-round mt-1"
                  />
                  <h3 className="title mt-4">Charlie Bailey</h3>
                </section>
                <section>
                  <br></br>
                  <Nav className="flex-column" role="tablist">
                    <NavItem>
                      <NavLink
                        className={activeTab === 'tab1' ? 'active' : ''}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('tab1');
                        }}
                      >
                        <i className="tim-icons icon-single-02"></i>
                        Thông tin cá nhân
                      </NavLink>
                    </NavItem>
                    <hr className="line-primary"></hr>
                  </Nav>
                </section>
                <br></br>
                <br></br>
                <br></br>
              </div>
            </Col>
            <Col className="ml-auto" md="8">
              <div className="section">
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="tab1">
                    <div>
                      <header>
                        <h2 className="text-uppercase">Thông tin chung</h2>
                      </header>
                      <hr className="line-primary"></hr>
                      <br></br>
                      <FormCustom
                        onSubmit={onSubmit}
                        defaultValues={defaultValues}
                        className="row"
                      >
                        <InputCustom
                          name="lastName"
                          placeholder="Nguyễn, Lê,..."
                          col={6}
                          label="Họ"
                          rules={{
                            required: 'Vui lòng không bỏ trống',
                          }}
                        />
                        <InputCustom
                          name="firstName"
                          placeholder="Hùng,Tùng,..."
                          col={4}
                          label="Tên"
                          rules={{
                            required: 'Vui lòng không bỏ trống',
                          }}
                        />
                        {/* <SelectCustom
                          name="sex"
                          label="Giới tính"
                          col={2}
                          options={[
                            {
                              name: 'Nam',
                              value: 1,
                            },
                            {
                              name: 'Nữ',
                              value: 2,
                            },
                          ]}
                        /> */}

                        <InputCustom
                          name="address"
                          placeholder="Địa chỉ"
                          label="Địa chỉ"
                        />
                        <InputCustom
                          name="email"
                          placeholder="email"
                          col={6}
                          label="Email"
                          rules={{
                            required: 'Vui lòng không bỏ trống',
                          }}
                        />
                        <InputCustom
                          name="phoneNumber"
                          placeholder="Số điện thoại"
                          col={6}
                          label="Số điện thoại"
                        />
                        <Col md="6">
                          <Button color="primary" type="submit">
                            Chỉnh sửa
                          </Button>
                          <Button color="primary" outline type="reset">
                            Huỷ
                          </Button>
                        </Col>
                      </FormCustom>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default AccountProfilePage;
