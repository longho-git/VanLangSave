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
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import registerPostExchangeService from 'services/registerPostExchange.service';
import CardInfo from '../CardInfo/CardInfo';
import RegisterPostExchange from '../RegisterPostDialog/RegisterPostExchange';
import ChoosePostExchange from '../ChoosePostExchange/ChoosePostExchange';
import ViewMessage from '../MessageRejectForm/ViewMessage';
import MessageRejectForm from '../MessageRejectForm/MessageRejectForm';

function RegisterPostExchangeList({ postId }) {
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);
  const [userProfileId, setUserProfileId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [content, setContent] = useState(null);
  const [message, setMessage] = useState(null);
  const [userRegisterId, setUserRegisterId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const rowEvent = (item, content) => {
    setUserProfileId(item);
    setContent(content);
    handleShow();
  };
  const ModalContent = () => {
    return (
      <Modal
        className="modal-xl"
        modalClassName=" bd-example-modal-xl"
        onClosed={handleClose}
        toggle={() => handleClose()}
        isOpen={show}
      >
        {content}
      </Modal>
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
  const reject = (id, mgs) => {
    registerPostExchangeService
      .rejectedRegisterPostExchangeByOwner(id, mgs)
      .then((req) => {
        req && confirmedAlert();
      });
  };
  useEffect(() => {
    registerPostExchangeService.getPostExchangeByPostId(postId).then((req) => {
      setPosts(req);
      setCountValue(req.lenght);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            text: 'Trạng thái',
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
                            style={{ maxWidth: 300 }}
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
                                onClick={() =>
                                  rowEvent(
                                    item.userRegister.userId,
                                    <ChoosePostExchange
                                      closeModal={() => handleClose()}
                                      registerExchangeId={item.id}
                                      userProfileId={item.userRegisterId}
                                      userRegisterName={
                                        item.userRegister.lastName +
                                        ' ' +
                                        item.userRegister.firstName
                                      }
                                    />,
                                  )
                                }
                              >
                                <i className="fas fa-exchange-alt"></i>
                              </Button>
                              <UncontrolledTooltip
                                placement="right"
                                delay={0}
                                target="tooltip1"
                              >
                                Chọn sản phẩm muốn trao đổi
                              </UncontrolledTooltip>
                              <Button
                                className=" btn-icon"
                                color="danger"
                                size="sm"
                                type="button"
                                id="tooltip601065234"
                                onClick={(e) => {
                                  setOpenModalForm(true);
                                  setUserRegisterId(item.id);
                                }}
                              >
                                <i className="fas fa-ban"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip601065234"
                              >
                                Huỷ yêu cầu
                              </UncontrolledTooltip>
                            </>
                          )}
                          {item.statusId === 5 && (
                            <>
                              <Button
                                className=" btn-icon"
                                color="info"
                                size="sm"
                                type="button"
                                id="tooltip2"
                                onClick={() =>
                                  rowEvent(
                                    item.userRegister.userId,
                                    <CardInfo
                                      userProfileId={item.userRegister.userId}
                                    />,
                                  )
                                }
                              >
                                <i className="fas fa-eye pt-1"></i>
                              </Button>
                              <UncontrolledTooltip delay={0} target="tooltip2">
                                Xem thông tin liên lạc
                              </UncontrolledTooltip>
                            </>
                          )}
                          {item.userRegisterStatusId === 3 && (
                            <>
                              <Button
                                className=" btn-icon"
                                color="danger"
                                size="sm"
                                type="button"
                                id="tooltip322"
                                onClick={() =>
                                  handleViewMessage(
                                    item.remarkUserRegisterReject,
                                  )
                                }
                              >
                                <i className="fas fa-eye pt-1"></i>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target="tooltip322"
                              >
                                Xem lý do bị từ chối
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
  const handleViewMessage = (mgs) => {
    setMessage(mgs);
    setOpenModal(true);
  };
  return (
    <>
      {alert}
      <Row>
        <div className="col">
          <Card>
            <CardHeader>
              <h3 className="mb-0">Danh sách yêu cầu trao đổi</h3>
            </CardHeader>
            {posts.length > 0 ? (
              tableRender
            ) : (
              <h3 className="mb-0 text-center">Chưa có yêu cầu</h3>
            )}
          </Card>
        </div>
      </Row>
      {show ? <ModalContent /> : null}
      <ViewMessage
        open={openModal}
        handleModal={(e) => setOpenModal(e)}
        message={message}
      />
      <MessageRejectForm
        open={openModalForm}
        handleModal={(e) => setOpenModalForm(e)}
        hanldeAction={(e) => reject(userRegisterId, e)}
      />
    </>
  );
}

export default RegisterPostExchangeList;
