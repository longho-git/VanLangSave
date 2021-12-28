import AdminHeader from 'layouts/component/Header/AdminHeader';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import PaginationTable from 'layouts/component/Table/PaginationTable';
import SearchTable from 'layouts/component/Table/SearchTable';
import React, { useMemo, useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Modal,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  UncontrolledAlert,
  UncontrolledTooltip,
} from 'reactstrap';
import userService from 'services/user.service';
import { formatTime } from 'utils/fortmatTime';
import CreateAccountManager from './../../components/CreateAccountManager/CreateAccountManager';
import ReactBSAlert from 'react-bootstrap-sweetalert';
const headers = [
  {
    field: 'email',
    name: 'Email',
    sortable: true,
  },
  {
    field: 'phoneNumber',
    name: 'Số điện thoại',
    sortable: true,
  },
  {
    field: 'userName',
    name: 'Tài khoản',
    sortable: false,
  },
  {
    field: 'status',
    name: 'Kích hoạt',
    sortable: false,
  },
  {
    field: '',
    name: '',
    sortable: false,
  },
];
function UserManager(props) {
  const ITEMS_PER_PAGE = 5;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [datas, setDatas] = useState([]);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [countValue, setCountValue] = useState(null);
  const [role, setRole] = useState('normal');
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const postsData = useMemo(() => {
    let computedDatas = datas;
    if (search) {
      computedDatas = computedDatas.filter(
        (comment) =>
          comment.userName.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setTotalItems(computedDatas.length);

    //Sorting posts
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedDatas = computedDatas.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]),
      );
    }

    //Current Page slice
    return computedDatas.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    );
  }, [datas, currentPage, search, sorting]);
  useEffect(() => {
    userService.getUserByRole(role).then((req) => {
      setDatas(req);
      setCountValue(req.lenght);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue, role]);

  const activeUser = (id, active) => {
    userService.activeUser(id, active).then(({ status }) => {
      if (status === 400) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        setAlert(true);
        userService.getUserByRole(role).then((req) => {
          setDatas(req);
          setCountValue(req.lenght);
        });
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      }
    });
  };

  return (
    <>
      <Modal
        className=""
        modalClassName=""
        isOpen={show}
        toggle={() => setShow(!show)}
      >
        <CreateAccountManager isClose={() => setShow(false)} />
      </Modal>
      <AdminHeader name="Danh sách tài khoản" parentName="Hệ thông" />
      <Container className="mt--6" fluid>
        <Alert color="danger" isOpen={error}>
          <span className="alert-icon">
            <i className="ni ni-like-2"></i>
          </span>
          <span className="alert-text">
            <strong>Không thành công!</strong> Có lỗi khi thực hiện
          </span>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setAlert(false);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Alert>
        <Alert color="success" isOpen={alert}>
          <span className="alert-icon">
            <i className="ni ni-like-2"></i>
          </span>
          <span className="alert-text">
            <strong>success!</strong> Bạn đã cập nhật thành công
          </span>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => {
              setAlert(false);
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </Alert>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="d-flex">
                <h3 className="mb-0 mr-3">
                  Danh sách tài khoản {role === 'normal' ? 'thường' : 'quản lý'}
                </h3>
                {role === 'manager' && (
                  <Button
                    className=" btn-icon"
                    color="danger"
                    size="sm"
                    type="button"
                    onClick={() => setShow(true)}
                  >
                    <i className=" ni ni-fat-add pt-1"></i>
                  </Button>
                )}
              </CardHeader>
              <Col md="12">
                <div className="nav-wrapper">
                  <Nav className="nav-pills-primary" pills role="tablist">
                    <NavItem>
                      <NavLink
                        className={role === 'normal' ? 'active' : ''}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setRole('normal');
                        }}
                      >
                        Thường
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={role === 'manager' ? 'active' : ''}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setRole('manager');
                        }}
                      >
                        Quản lý
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <SearchTable
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                placeholder={'Nhập tài khoản, email'}
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
                            {item.email}
                          </div>
                        </td>
                        <td>
                          <div
                            className="font-weight-bold"
                            href="#pablo"
                            style={{ maxWidth: 100 }}
                          >
                            {item.phoneNumber}
                          </div>
                        </td>

                        <td>
                          <div
                            className="font-weight-bold"
                            style={{ maxWidth: 200 }}
                          >
                            {item.userName}
                          </div>
                        </td>
                        <td>
                          <div
                            className="font-weight-bold"
                            style={{ maxWidth: 200 }}
                          >
                            {item.status ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                          </div>
                        </td>

                        <td className="table-actions text-right">
                          <Button
                            className=" btn-icon"
                            color={item.status ? 'danger' : 'info'}
                            size="sm"
                            type="button"
                            id="tooltip6010652343"
                            onClick={() => activeUser(item.id, !item.status)}
                          >
                            {item.status ? (
                              <i className="fas fa-ban"></i>
                            ) : (
                              <i className="fas fa-check"></i>
                            )}
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip6010652343"
                          >
                            {item.status ? 'Kích hoạt' : 'Vô hiệu hoá'}
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
    </>
  );
}

UserManager.propTypes = {};

export default UserManager;
