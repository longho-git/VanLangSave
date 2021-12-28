/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// react plugin that prints a given react component
// react component for creating dynamic tables
import RegisterPostGiveList from '../components/RegisterPostList/RegisterPostGiveList';
// react component used to create sweet alerts
// reactstrap components
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  Input,
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
import HeaderTable from 'layouts/component/Table/HeaderTable';
import PaginationTable from 'layouts/component/Table/PaginationTable';
import SearchTable from 'layouts/component/Table/SearchTable';
import RegisterPostExchangeList from 'pages/components/RegisterPostList/RegisterPostExchangeList';
import { push } from 'connected-react-router';

function UserPostsPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [search, setSearch] = useState('');
  const ITEMS_PER_PAGE = 50;
  const headers = [
    {
      field: 'title',
      name: 'Tiêu đề',
      sortable: true,
    },
    {
      field: 'content',
      name: 'Nội dung',
      sortable: true,
    },
    {
      field: 'createdDate',
      name: 'Ngày đăng',
      sortable: true,
    },
    {
      field: 'typeName',
      name: 'Hình thức',
      sortable: true,
    },
    {
      field: 'statusName',
      name: 'Trạng thái bài viết',
      sortable: true,
    },
    {
      field: '',
      name: '',
      sortable: false,
    },
  ];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggleTrueFalse = () => {
    setModalOpen(handleShow);
  };
  const rowEvent = (item) => {
    if (item.type === 2) {
      pushUrl(`/registerExchange/post/${item.id}`);
      return;
    }
    setPost(item);
    toggleTrueFalse();
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
        <RegisterPostGiveList postId={post.id} />
      </Modal>
    );
  };
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
    postService.deletePost(id).then((req) => {
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
    postService.getAllPostByUserId().then((req) => {
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
      {alert}
      <div className="section section-hero section-shaped">
        <Container className="mt-5" fluid>
          <Row>
            <div className="col">
              <Card>
                <CardHeader className="d-flex justify-content-start">
                  <h3 className="mb-0">Bài đăng</h3>
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
                            {item.statuts === 4 || item.statuts === 5 ? (
                              <a
                                className="font-weight-bold"
                                onClick={() => pushUrl(`/post/${item.id}`)}
                                style={{ maxWidth: 100 }}
                              >
                                {item.title}
                              </a>
                            ) : (
                              <div
                                className="font-weight-bold text-truncate"
                                href="#pablo"
                                style={{ maxWidth: 200 }}
                              >
                                {item.title}
                              </div>
                            )}
                          </td>
                          <td>
                            <div
                              className="font-weight-bold text-truncate"
                              style={{ maxWidth: 500 }}
                            >
                              {item.content}
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              style={{ maxWidth: 200 }}
                            >
                              {formatTime(item.createdDate)}
                            </div>
                          </td>
                          <td>
                            <div className="font-weight-bold">
                              {item.typeName}
                            </div>
                          </td>
                          <td>
                            <div className="font-weight-bold">
                              {item.statusName}
                            </div>
                          </td>
                          <td className="table-actions text-right">
                            {item.statuts === 1 && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="success"
                                  size="sm"
                                  type="button"
                                  id="tooltipView"
                                  onClick={() =>
                                    history.push({
                                      pathname: '/newpost',
                                      search: `?form=edit&id=${item.id}`,
                                    })
                                  }
                                >
                                  <i className=" fas fa-pen pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltipView"
                                >
                                  Sửa bài đăng
                                </UncontrolledTooltip>
                              </>
                            )}
                            {(item.statuts === 4 ||
                              item.statuts === 5 ||
                              (item.type === 2 && item.statuts === 2)) && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="success"
                                  size="sm"
                                  type="button"
                                  id="tooltipView2"
                                  onClick={() => rowEvent(item)}
                                >
                                  <i className=" ni ni-zoom-split-in pt-1"></i>
                                </Button>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltipView2"
                                >
                                  Xem danh sách đăng ký
                                </UncontrolledTooltip>
                              </>
                            )}

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
                              Xoá bài viết
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <PaginationTable
                      total={totalItems}
                      itemsPerPage={ITEMS_PER_PAGE}
                      currentPage={currentPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
      {show ? <ModalContent /> : null}
    </>
  );
}

export default UserPostsPage;
