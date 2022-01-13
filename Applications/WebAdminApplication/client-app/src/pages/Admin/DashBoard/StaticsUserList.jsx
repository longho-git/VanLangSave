import React, { useEffect, useMemo, useState } from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Container,
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
// core components
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import SearchTable from 'layouts/component/Table/SearchTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import PaginationTable from '../../../layouts/component/Table/PaginationTable';
import historyRegisterPostService from 'services/historyRegisterPost.service';
import CardInfo from 'pages/components/CardInfo/CardInfo';
import AdminHeader from 'layouts/component/Header/AdminHeader';
import { Link } from 'react-router-dom';

const headers = [
  {
    field: 'email',
    name: 'Email',
    sortable: true,
  },
  {
    field: 'name',
    name: 'Tên người dùng',
    sortable: true,
  },
  {
    field: 'countPost',
    name: 'Số lượng bài đăng',
    sortable: true,
  },
  {
    field: 'countTrans',
    name: 'Giao dịch thành công',
    sortable: true,
  },
];

function StaticsUserList({ userList, postId }) {
  console.log(
    '🚀 ~ file: StaticsUserList.jsx ~ line 63 ~ StaticsUserList ~ userList',
    userList,
  );
  const userProfile = useSelector((state) => state.login.userProfile);
  const [countValue, setCountValue] = useState(null);
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
  const ITEMS_PER_PAGE = 10;
  function pushUrl(url) {
    history.push(url);
  }

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
  const postsData = useMemo(() => {
    let computedPosts = userList;
    if (search) {
      computedPosts = computedPosts.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()),
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
  }, [userList, currentPage, search, sorting]);

  return (
    <>
      <Row>
        <div className="col">
          <Card>
            <SearchTable
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              placeholder={'Nhập tên, email'}
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
                          className="font-weight-bold cus-text2"
                          style={{ maxWidth: 300 }}
                        >
                          {item.email}
                        </div>
                      </td>
                      <td>
                        <div
                          className="font-weight-bold cus-text2"
                          href="#pablo"
                          style={{ maxWidth: 300 }}
                        >
                          {item.name}
                        </div>
                      </td>

                      <td>
                        <div
                          className="font-weight-bold"
                          style={{ maxWidth: 100 }}
                        >
                          {item.countPost}
                        </div>
                      </td>
                      <td>
                        <div
                          className="font-weight-bold text-truncate mw-25"
                          style={{ maxWidth: 100 }}
                        >
                          {item.countTrans}
                        </div>
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
      {show ? <ModalContent /> : null}
    </>
  );
}

export default StaticsUserList;
