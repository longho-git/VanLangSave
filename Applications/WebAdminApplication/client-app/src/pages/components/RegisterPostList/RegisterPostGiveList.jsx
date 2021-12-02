/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// react plugin that prints a given react component
// react component for creating dynamic tables
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// react component used to create sweet alerts
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import registerPostGiveService from 'services/registerPostGive.service';

function RegisterPostGiveList({ postId }) {
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  const acceptRegister = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => acceptRegisterPostGive(id)}
        showCancel
        confirmBtnBsStyle="danger"
        cancelBtnText="Huỷ"
        cancelBtnBsStyle="secondary"
        confirmBtnText="Vâng, chắn chắn!"
        btnSize=""
      >
        Bạn sẽ không thể phục hồi khi thực hiện!
      </ReactBSAlert>,
    );
  };
  const rejectRegister = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => rejectedRegisterPostGive(id)}
        showCancel
        confirmBtnBsStyle="danger"
        cancelBtnText="Huỷ"
        cancelBtnBsStyle="secondary"
        confirmBtnText="Vâng, chắn chắn!"
        btnSize=""
      >
        Bạn sẽ không thể phục hồi khi thực hiện!
      </ReactBSAlert>,
    );
  };

  const confirmedAlert = () => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title="Thành công!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="primary"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>,
    );
  };
  const acceptRegisterPostGive = (id) => {
    registerPostGiveService.acceptRegisterPostGive(id).then((req) => {
      if (req) {
        confirmedAlert();
        setTimeout(() => {
          setCountValue(countValue - 1);
        }, 2000);
      }
    });
  };
  const rejectedRegisterPostGive = (id) => {
    registerPostGiveService.rejectedRegisterPostGive(id).then((req) => {
      if (req) {
        confirmedAlert();
        setTimeout(() => {
          setCountValue(countValue - 1);
        }, 2000);
      }
    });
  };
  function pushUrl(url) {
    history.push(url);
  }
  useEffect(() => {
    registerPostGiveService.getPostgiveByPostId(postId).then((req) => {
      setPosts(req);
      setCountValue(req.lenght);
    });
  }, [countValue]);
  const tableRender = useMemo(() => {
    return (
      <ToolkitProvider
        data={posts.reverse()}
        keyField="title"
        columns={[
          {
            dataField: 'createDate',
            text: 'Ngày đăng ký',
            sort: true,
          },
          {
            dataField: 'remark',
            text: 'Ghi chú',
            sort: true,
          },
          {
            dataField: 'createPost',
            text: 'Người đăng ký',
            sort: true,
          },
          {
            dataField: 'statusName',
            text: 'Trang thái',
            sort: true,
          },
          {
            dataField: 'action',
            text: '',
            sort: true,
          },
        ]}
        search
      >
        {(props) => {
          return (
            <div className="py-4 table-responsive">
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    {props.baseProps.columns.map((item) => (
                      <th>{item.text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.baseProps.data.map((item) => {
                    return (
                      <tr>
                        <td>
                          <div
                            className="font-weight-bold"
                            style={{ maxWidth: 200 }}
                          >
                            {formatTime(item.createdDate)}
                          </div>
                        </td>
                        <td>
                          <div
                            className="font-weight-bold text-truncate mw-25"
                            style={{ maxWidth: 200 }}
                          >
                            {item.remark}
                          </div>
                        </td>

                        <td className="table-user">
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={item.userRegister.avatarURL}
                          />
                          <b>
                            {item.userRegister.lastName}{' '}
                            {item.userRegister.firstName}
                          </b>
                        </td>
                        <td>
                          <div
                            className="font-weight-bold text-truncate mw-25"
                            style={{ maxWidth: 200 }}
                          >
                            {item.statusName}
                          </div>
                        </td>
                        <td className="table-actions text-right">
                          {item.statusId === 1 && (
                            <>
                              <Button
                                className=" btn-icon"
                                color="info"
                                size="sm"
                                type="button"
                                id="tooltip1"
                                onClick={(e) => acceptRegister(item.id)}
                              >
                                <i className="fas fa-check"></i>
                              </Button>
                              <UncontrolledTooltip delay={0} target="tooltip1">
                                Duyệt
                              </UncontrolledTooltip>
                              <Button
                                className=" btn-icon"
                                color="danger"
                                size="sm"
                                type="button"
                                id="tooltip601065234"
                                onClick={(e) => rejectRegister(item.id)}
                              >
                                <i className="fas fa-ban"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip601065234"
                              >
                                Huỷ
                              </UncontrolledTooltip>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          );
        }}
      </ToolkitProvider>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);
  return (
    <>
      {alert}
      <Row>
        <div className="col">
          <Card>
            <CardHeader>
              <h3 className="mb-0">Danh sách đăng ký</h3>
            </CardHeader>
            {posts.length > 0 ? (
              tableRender
            ) : (
              <h3 className="mb-0 text-center">Chưa có đăng ký</h3>
            )}
          </Card>
        </div>
      </Row>
    </>
  );
}

export default RegisterPostGiveList;
