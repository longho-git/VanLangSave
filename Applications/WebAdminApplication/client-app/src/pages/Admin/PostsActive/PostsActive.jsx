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
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import AdminHeader from 'layouts/component/Header/AdminHeader';
import postService from 'services/post.service';
import { formatTime } from 'utils/fortmatTime';
import PaginationTable from './../../../layouts/component/Table/PaginationTable';
import SearchTable from 'layouts/component/Table/SearchTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';

function PostsActive() {
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [search, setSearch] = useState('');
  const ITEMS_PER_PAGE = 50;
  const headers = [
    {
      field: 'ownerName',
      name: 'Người đăng',
      sortable: true,
    },
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
    {
      field: '',
      name: '',
      sortable: false,
    },
  ];
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

  const hiddenPost = (id) => {
    postService.hiddenPost(id).then((req) => {
      if (req) {
        confirmedAlert();
      }
    });
  };

  useEffect(() => {
    postService.getPostsActiveAdmin().then((req) => {
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
      <AdminHeader name="Danh sách đã duyệt" parentName="Bài đăng" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
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
                {postsData.length > 0 ? (
                  <tbody>
                    {postsData.map((item) => {
                      return (
                        <tr>
                          <td className="table-user">
                            <img
                              alt="..."
                              className="avatar rounded-circle mr-3"
                              src={item.ownerAvatarImage}
                            />
                            <b>{item.ownerName}</b>
                          </td>
                          <td>
                            <a
                              className="font-weight-bold text-truncate mw-25"
                              style={{ maxWidth: 100 }}
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.title}
                            </a>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold text-truncate mw-25"
                              style={{ maxWidth: 200 }}
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.content}
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold"
                              style={{ maxWidth: 200 }}
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {formatTime(item.createdDate)}
                            </div>
                          </td>
                          <td>
                            <a
                              className="font-weight-bold"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.typeName}
                            </a>
                          </td>
                          <td>
                            <a
                              className="font-weight-bold"
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              {item.statusName}
                            </a>
                          </td>

                          <td className="table-actions text-right">
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
                ) : (
                  <h1 className="text-center">Không có bài viết </h1>
                )}
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
    </>
  );
}

export default PostsActive;
