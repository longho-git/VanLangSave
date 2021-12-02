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
  Container,
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import postService from 'services/post.service';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import registerPostGiveService from 'services/registerPostGive.service';
import { useSelector } from 'react-redux';
import SearchTable from 'layouts/component/Table/SearchTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import CardInfo from 'pages/components/CardInfo/CardInfo';

const headers = [
  {
    field: 'createdDate',
    name: 'Ngày đăng ký',
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
    name: 'Trạng thái đăng ký',
    sortable: true,
  },
  {
    field: '',
    name: '',
    sortable: false,
  },
];

function RegisterPostGiveOfUserPage({ postId }) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
  const history = useHistory();
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
        Your file has been deleted.
      </ReactBSAlert>,
    );
  };
  const deletePost = (id) => {
    registerPostGiveService.deletePost(id).then((req) => {
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
    registerPostGiveService
      .getPostgiveByUserRegisterId(userProfile.id)
      .then((req) => {
        setPosts(req);
        setCountValue(req.lenght);
      });
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

  return (
    <>
      <div className="section section-hero section-shaped">
        <Container className="mt-5" fluid>
          {alert}
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Danh sách đăng ký</h3>
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
                            {item.post.statuts === 4 ? (
                              <a
                                className="font-weight-bold"
                                onClick={() => pushUrl(`/post/${item.postId}`)}
                                style={{ maxWidth: 100 }}
                              >
                                {item.postTitle}
                              </a>
                            ) : (
                              <div
                                className="font-weight-bold"
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
                              Tặng
                            </div>
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
                            {item.statusId === 4 && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="info"
                                  size="sm"
                                  type="button"
                                  id="tooltip2"
                                  onClick={() => rowEvent(item.post.userId)}
                                >
                                  <i className="fas fa-eye pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip2"
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
                                  Xoá đăng ký
                                </UncontrolledTooltip>
                              </>
                            )}
                          </td>
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

export default RegisterPostGiveOfUserPage;
