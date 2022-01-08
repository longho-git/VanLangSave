import AdminHeader from 'layouts/component/Header/AdminHeader';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  CardHeader,
  Container,
  Row,
  TabPane,
  Spinner,
} from 'reactstrap';
import StaticsUserList from './StaticsUserList';
import historyRegisterPostService from 'services/historyRegisterPost.service';
import moment from 'moment/min/moment-with-locales';

function Dashboard() {
  var today = new Date();
  const [defaultValues, setDefaultValues] = useState({
    fromDate: moment(today).format('YYYY-MM-DD'),
    toDate: moment(today).format('YYYY-MM-DD'),
  });
  const [statics, setStatics] = useState({
    countPost: 0,
    countUser: 0,
    countTrans: 0,
    userList: [],
  });
  const [loading, setLoading] = useState();
  useEffect(() => {
    getValue({
      fromDate: moment(today).format('YYYY-MM-DD'),
      toDate: moment(today).format('YYYY-MM-DD'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValue = (value) => {
    setLoading(true);
    historyRegisterPostService
      .getStatics(value.fromDate, value.toDate)
      .then((req) => {
        setStatics(req);
        setLoading(false);
      });
  };

  const onSubmit = (value) => {
    getValue(value);
  };

  return (
    <>
      <AdminHeader name="Thống kê" parentName="Hệ thống" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="d-flex">
                <h3 className="mb-0 mr-3">Thống kê</h3>
              </CardHeader>
              <div className="m-3">
                <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
                  <InputCustom
                    name="fromDate"
                    placeholder="31/03/1999"
                    col={2}
                    label="Từ ngày"
                    type="date"
                    icon={<i className="ni ni-hat-3" />}
                    rules={{
                      required: 'required',
                    }}
                  />
                  <InputCustom
                    name="toDate"
                    placeholder="12/12/2021"
                    col={2}
                    label="Đến"
                    type="date"
                    icon={<i className="ni ni-hat-3" />}
                    rules={{
                      required: 'required',
                    }}
                  />
                  <div className="text-center">
                    <Button
                      className="btn-icon"
                      color="info"
                      size="lg"
                      style={{
                        height: '45px',
                        width: '50px',
                        margin: '30px 20px 0 10px',
                      }}
                    >
                      <i class="fas fa-chevron-down text-center"></i>
                    </Button>
                  </div>
                </FormCustom>
              </div>
              <>
                <TabPane className="ml-3 mr-3">
                  <Row>
                    <Col md="3" xl="3">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Số lượng bài viết
                              </CardTitle>
                              {loading === false ? (
                                <span className="h2 font-weight-bold mb-0">
                                  {statics.countPost !== undefined
                                    ? statics.countPost
                                    : 0}
                                </span>
                              ) : (
                                <Spinner>
                                  <span className=" sr-only">Loading...</span>
                                </Spinner>
                              )}
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                <i class="fas fa-file-alt"></i>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="3" xl="3">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Số lượng người dùng
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {loading === false ? (
                                  statics.countUser !== undefined ? (
                                    statics.countUser
                                  ) : (
                                    0
                                  )
                                ) : (
                                  <Spinner>
                                    <span className=" sr-only">Loading...</span>
                                  </Spinner>
                                )}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                <i class="fas fa-child"></i>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="3" xl="3">
                      <Card className="card-stats">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                Giao dịch thành công
                              </CardTitle>
                              <span className="h2 font-weight-bold mb-0">
                                {loading === false ? (
                                  statics.countTrans !== undefined ? (
                                    statics.countTrans
                                  ) : (
                                    0
                                  )
                                ) : (
                                  <Spinner>
                                    <span className=" sr-only">Loading...</span>
                                  </Spinner>
                                )}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-gradient-purple text-white rounded-circle shadow">
                                <i class="fas fa-people-carry"></i>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                {loading && (
                  <Button className=" mb-2" disabled size="sm" type="button">
                    <Spinner size="sm" role="status"></Spinner>
                    Loading...
                  </Button>
                )}
                {statics && statics.userList.length > 0 && !loading && (
                  <StaticsUserList userList={statics.userList} />
                )}
              </>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
