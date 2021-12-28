import AdminHeader from 'layouts/component/Header/AdminHeader';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import SearchTable from 'layouts/component/Table/SearchTable';
import React, { useMemo, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  CardHeader,
  Container,
  Row,
  Table,
  TabPane,
} from 'reactstrap';
const headers = [
  {
    field: 'email',
    name: 'Email',
    sortable: true,
  },
  {
      field: 'ownerName',
      name: 'Tên người dùng',
      sortable: true,
    },
  {
    field: 'postTitle',
    name: 'Số lượng bài đăng',
    sortable: true,
  },
  {
    field: 'SuccessTrade',
    name: 'Giao dịch thành công',
    sortable: true,
  },
  {
    field: 'registerDate',
    name: 'Đăng nhập gần nhất',
    sortable: true,
  },
];

function Dashboard(){
  return(
  <>
        <AdminHeader name="Thống kê" parentName="Hệ thống" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className='d-flex'>
                  <h3 className="mb-0 mr-3">Thống kê</h3>
                </CardHeader>
                <div className='m-3'>
                <FormCustom>
                  <InputCustom
                    name="Since"
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
                    name="To"
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
                  className='btn-icon'
                  color='info'
                  size='lg'
                  type='button'  
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

                <TabPane className='ml-3 mr-3'>
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
                                <span className="h2 font-weight-bold mb-0">
                                1 
                                </span>
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
                                4 
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
                                4 
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
                
                <SearchTable
                  placeholder={'Nhập Email, Tên người dùng'}
                />
                <Table className="align-items-center table-flush" responsive>
                  <HeaderTable
                    headers={headers}
                  />
                  <tbody>
                        <tr>
                          <td>
                            <div
                              className="font-weight-bold"
                              style={{ maxWidth: 100 }}
                            >
                            PhamVanA@gmail.com
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              href="#pablo"
                              style={{ maxWidth: 100 }}
                            >
                            Pham Van A
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              href="#pablo"
                              style={{ maxWidth: 100 }}
                            >
                            12  
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              href="#pablo"
                              style={{ maxWidth: 100 }}
                            >
                            4  
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              href="#pablo"
                              style={{ maxWidth: 100 }}
                            >
                            17 giờ trước
                            </div>
                          </td>
                        </tr>
                  </tbody>
                </Table>
                
              </Card>
            </div>
          </Row>
        </Container>
  </>
  );
}

export default Dashboard