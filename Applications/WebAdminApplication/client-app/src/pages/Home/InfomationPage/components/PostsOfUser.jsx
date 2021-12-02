/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// react plugin that prints a given react component
// react component for creating dynamic tables
// react component used to create sweet alerts
// reactstrap components
import { CardFooter, Col, Modal, Nav, NavItem, Row, NavLink } from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import postService from 'services/post.service';
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import PaginationTable from 'layouts/component/Table/PaginationTable';
import SearchTable from 'layouts/component/Table/SearchTable';
import RegisterPostGiveList from 'pages/components/RegisterPostList/RegisterPostGiveList';
import PostItem from 'pages/components/PostItem/PostItem';

function PostsOfUser() {
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
  const ITEMS_PER_PAGE = 5;
  const [hTabs1, setHTabs1] = useState(1);
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
    postService.getPostByUserId(hTabs1).then((req) => {
      setPosts(req);
      setCountValue(req.lenght);
    });
  }, [countValue, hTabs1]);
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
      <Row>
        <Col md="12">
          <div className="nav-wrapper">
            <Nav className="nav-pills-primary" pills role="tablist">
              <NavItem>
                <NavLink
                  className={hTabs1 === 1 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(1);
                  }}
                >
                  Đang xét duyệt
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={hTabs1 === 4 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(4);
                  }}
                >
                  Hoạt động
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={hTabs1 === 5 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(5);
                  }}
                >
                  Đang giao dịch
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={hTabs1 === 6 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(6);
                  }}
                >
                  Bài viết bị ẩn
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={hTabs1 === 3 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(3);
                  }}
                >
                  Không duyệt
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={hTabs1 === 2 ? 'active' : ''}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setHTabs1(2);
                  }}
                >
                  Hoàn tất giao dịch
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Col>
        <div className="col">
          <SearchTable
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
            placeholder={'Nhập tiêu đề, hình thức bài viết'}
          />
          {postsData.map((item) => {
            return (
              // <tr>
              <PostItem item={item} />
              /* <td className="table-actions text-right">
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
                      <UncontrolledTooltip delay={0} target="tooltipView">
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
                      <UncontrolledTooltip delay={0} target="tooltipView2">
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
                  <UncontrolledTooltip delay={0} target="tooltip601065234">
                    Xoá bài viết
                  </UncontrolledTooltip>
                </td>
              </tr> */
            );
          })}
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
        </div>
      </Row>
      {show ? <ModalContent /> : null}
    </>
  );
}

export default PostsOfUser;
