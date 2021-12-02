import AdminHeader from 'layouts/component/Header/AdminHeader';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import PaginationTable from 'layouts/component/Table/PaginationTable';
import SearchTable from 'layouts/component/Table/SearchTable';
import React, { useMemo, useState, useEffect } from 'react';
import {
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
  UncontrolledTooltip,
} from 'reactstrap';
import userService from 'services/user.service';
import { formatTime } from 'utils/fortmatTime';
import CreateAccountManager from './../../components/CreateAccountManager/CreateAccountManager';
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
    field: '',
    name: '',
    sortable: false,
  },
];
function UserManager(props) {
  const ITEMS_PER_PAGE = 15;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [datas, setDatas] = useState([]);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const [countValue, setCountValue] = useState(null);
  const [role, setRole] = useState('normal');
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
                        <td className="table-actions text-right">
                          <Button
                            className=" btn-icon"
                            color="danger"
                            size="sm"
                            type="button"
                            id="tooltip601065234"
                          >
                            <i className=" ni ni-fat-remove pt-1"></i>
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip601065234"
                          >
                            Xoá tài khoản
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
