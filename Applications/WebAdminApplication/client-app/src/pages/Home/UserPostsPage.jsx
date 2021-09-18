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
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

import ReactBSAlert from 'react-bootstrap-sweetalert';
import postService from 'services/post.service';

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Show{' '}
        {
          <select
            name="datatable-basic_length"
            aria-controls="datatable-basic"
            className="form-control form-control-sm"
            onChange={(e) => onSizePerPageChange(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        }{' '}
        entries.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function UserPostsPage() {
  const [posts, setPosts] = useState([]);
  const [countValue, setCountValue] = useState(null);
  const [alert, setAlert] = useState(null);
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
  useEffect(() => {
    postService.getPostByUserId().then((req) => {
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
            dataField: 'title',
            text: 'Tiêu đề',
            sort: true,
          },
          {
            dataField: 'content',
            text: 'Nội dung',
            sort: true,
          },
          {
            dataField: 'typeName',
            text: 'Loại bài viết',
            sort: true,
          },
          {
            dataField: 'statusName',
            text: 'Trạng thái bài viết',
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
              <div
                id="datatable-basic_filter"
                className="dataTables_filter px-4 pb-1"
              >
                <label>
                  Tìm kiếm:
                  <SearchBar
                    className="form-control-sm"
                    placeholder=""
                    {...props.searchProps}
                  />
                </label>
              </div>
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
                          <a
                            className="font-weight-bold"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.title}
                          </a>
                        </td>
                        <td>
                          <a
                            className="font-weight-bold"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.content}
                          </a>
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
                        <td className="table-actions">
                          <Button
                            className=" btn-icon-only rounded-circle table-action table-action-delete"
                            id="tooltip601065234"
                            onClick={(e) => confirmAlert(item.id)}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip601065234"
                          >
                            Xoá bài đăng
                          </UncontrolledTooltip>
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
      <div className="section section-hero section-shaped">
        <Container className="mt-5">
          <Row>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Bài đăng</h3>
                </CardHeader>
                {tableRender}
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserPostsPage;
