/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import SearchTable from 'layouts/component/Table/SearchTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import CardInfo from 'pages/components/CardInfo/CardInfo';
import registerPostExchangeService from 'services/registerPostExchange.service';
import MessageRejectForm from 'pages/components/MessageRejectForm/MessageRejectForm';
import ViewMessage from 'pages/components/MessageRejectForm/ViewMessage';

const headers = [
  {
    field: 'createdDate',
    name: 'Ngày yêu cầu trao đổi',
    sortable: true,
  },
  {
    field: 'postTitle',
    name: 'Tiêu đề bài đăng',
    sortable: true,
  },
  {
    field: '',
    name: 'Hình thức',
    sortable: false,
  },
  {
    field: 'statusName',
    name: 'Trạng thái yêu cầu trao đổi',
    sortable: true,
  },
  {
    field: '',
    name: 'Bài viết muốn trao đổi với tôi',
    sortable: false,
  },
  {
    field: '',
    name: '',
    sortable: false,
  },
];

function RegisterPostExchangeOfUserPage() {
  const userProfile = useSelector((state) => state.login.userProfile);
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [alert, setAlert] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [show, setShow] = useState(false);
  const [userProfileId, setUserProfileId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const rowEvent = (item) => {
    setUserProfileId(item);
    handleShow();
  };
  const ModalContent = () => {
    return (
      <Modal
        className="modal-lg"
        modalClassName=" bd-example-modal-lg"
        onClosed={handleClose}
        toggle={() => handleClose()}
        isOpen={show}
      >
        <CardInfo userProfileId={userProfileId} />
      </Modal>
    );
  };
  const ITEMS_PER_PAGE = 50;
  const confirmAlert = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => deletePost(id)}
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
  const confirmAcceptAlert = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => accecpt(id)}
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
      >
         Đăng kí của bạn đã được xóa.
      </ReactBSAlert>,
    );
  };
  const deletePost = (id) => {
    registerPostExchangeService.deletePost(id).then((req) => {
      if (req) {
        confirmedAlert();
        setTimeout(() => {
          setCountValue(countValue - 1);
        }, 2000);
      }
    });
  };
  const accecpt = (id) => {
    registerPostExchangeService
      .acceptRegisterPostExchangeByUserRegister(id)
      .then((req) => {
        req && confirmedAlert();
      });
  };
  const reject = (id, mgs) => {
    registerPostExchangeService
      .rejectedRegisterPostExchangeByUserRegister(id, mgs)
      .then((req) => {
        req && confirmedAlert();
      });
  };
  useEffect(() => {
    registerPostExchangeService
      .getPostExchangeByUserRegisterId(userProfile.id)
      .then((req) => {
        setPosts(req);
        setCountValue(req.lenght);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue]);
  const postsData = useMemo(() => {
    let computedPosts = posts;
    if (search) {
      computedPosts = computedPosts.filter(
        (comment) =>
          comment.title.toLowerCase().includes(search.toLowerCase()) ||
          comment.typeName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setTotalItems(computedPosts.length);

    //Sorting posts
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedPosts = computedPosts.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]),
      );
    }

    //Current Page slice
    return computedPosts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    );
  }, [posts, currentPage, search, sorting]);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className="section section-hero section-shaped">
        <Container className="mt-5" fluid>
          {alert}
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Danh sách yêu cầu trao đổi</h3>
                </CardHeader>
                <SearchTable
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                  placeholder={'Nhập tiêu đề, hình thức bài viết'}
                />
                <Table className="align-items-center table-flush" responsive>
                  <HeaderTable
                    headers={headers}
                    onSorting={(field, order) => setSorting({ field, order })}
                  />
                  <tbody>
                    {postsData.map((item) => {
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
                            {item.postStatuts === 4 ||
                            item.postStatuts === 5 ? (
                              <a
                                className="font-weight-bold text-truncate"
                                onClick={() =>
                                  openInNewTab(`/post/${item.postId}`)
                                }
                                style={{ maxWidth: 100 }}
                              >
                                {item.postTitle}
                              </a>
                            ) : (
                              <div
                                className="font-weight-bold text-truncate"
                                href="#pablo"
                                style={{ maxWidth: 100 }}
                              >
                                {item.postTitle}
                              </div>
                            )}
                          </td>

                          <td>
                            <div
                              className="font-weight-bold"
                              style={{ maxWidth: 200 }}
                            >
                              yêu cầu trao đổi
                            </div>
                          </td>
                          <td>
                            <div className="font-weight-bold text-truncate mw-25">
                              {item.statusName}
                            </div>
                          </td>
                          {item.postExchange && item.postExchange.title ? (
                            <td>
                              {item.userRegisterStatusId === 3 ? (
                                <div class="font-weight-bold text-truncate mw-25 text-danger">
                                  Bạn đã từ chối trao đổi
                                </div>
                              ) : (
                                <a
                                  className="font-weight-bold"
                                  onClick={() =>
                                    openInNewTab(
                                      `/post/${item.postExchange.id}`,
                                    )
                                  }
                                  style={{ maxWidth: 100 }}
                                >
                                  {item.postExchange.title}
                                </a>
                              )}
                            </td>
                          ) : (
                            <td></td>
                          )}
                          <td className="table-actions text-right">
                            {item.postOwnerStatusId === 4 &&
                              item.statusId !== 5 &&
                              item.statusId !== 4 && (
                                <>
                                  <Button
                                    className=" btn-icon"
                                    color="info"
                                    size="sm"
                                    type="button"
                                    id="tooltip2"
                                    onClick={() => confirmAcceptAlert(item.id)}
                                  >
                                    <i className="fas fa-check"></i>
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip2"
                                  >
                                    Chấp nhận
                                  </UncontrolledTooltip>
                                  <Button
                                    className=" btn-icon"
                                    color="danger"
                                    size="sm"
                                    type="button"
                                    id="tooltip1"
                                    onClick={() => setOpenModalForm(true)}
                                  >
                                    <i className="fas fa-window-close"></i>
                                  </Button>
                                  <UncontrolledTooltip
                                    delay={0}
                                    target="tooltip1"
                                  >
                                    Không chấp nhận
                                  </UncontrolledTooltip>
                                </>
                              )}
                            {item.postOwnerStatusId === 3 && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="danger"
                                  size="sm"
                                  type="button"
                                  id="tooltip2323"
                                  onClick={() => setOpenModal(true)}
                                >
                                  <i className="fas fa-eye pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip2323"
                                >
                                  Xem lý do từ chối
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
                                  id="tooltip232"
                                  onClick={() => rowEvent(item.post.userId)}
                                >
                                  <i className="fas fa-eye pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip232"
                                >
                                  Xem thông tin liên lạc
                                </UncontrolledTooltip>
                              </>
                            )}
                            {item.statusId === 1 && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="danger"
                                  size="sm"
                                  type="button"
                                  id="tooltip601065234"
                                  onClick={(e) => confirmAlert(item.id)}
                                >
                                  <i className=" ni ni-fat-remove pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip601065234"
                                >
                                  Xoá yêu cầu trao đổi
                                </UncontrolledTooltip>
                              </>
                            )}
                          </td>
                          <MessageRejectForm
                            open={openModalForm}
                            handleModal={(e) => setOpenModalForm(e)}
                            hanldeAction={(e) => reject(item.id, e)}
                          />
                          <ViewMessage
                            open={openModal}
                            handleModal={(e) => setOpenModal(e)}
                            message={item.remarkPostOwnerReject}
                          />
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
      {show ? <ModalContent /> : null}
    </>
  );
}

export default RegisterPostExchangeOfUserPage;
