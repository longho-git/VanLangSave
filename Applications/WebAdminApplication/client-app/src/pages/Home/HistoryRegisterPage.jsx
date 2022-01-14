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
  Col,
  UncontrolledTooltip,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
// core components
import { formatTime } from 'utils/fortmatTime';
import { useHistory } from 'react-router';
import SearchTable from 'layouts/component/Table/SearchTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';
import historyRegisterPostService from 'services/historyRegisterPost.service';
import CardInfo from 'pages/components/CardInfo/CardInfo';
import { Link } from 'react-router-dom';

const headers = [
  {
    field: 'registerDate',
    name: 'Ngày đăng ký',
    sortable: true,
  },
  {
    field: 'postTitle',
    name: 'Tiêu đề bài đăng',
    sortable: true,
  },
  {
    field: 'postConditrion',
    name: 'Hình thức',
    sortable: true,
  },
  {
    field: 'status',
    name: 'Trạng thái đăng ký',
    sortable: true,
  },
  {
    field: '',
    name: '',
    sortable: false,
  },
];

function HistoryRegisterPage() {
  const [posts, setPosts] = useState([]);
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
  const ITEMS_PER_PAGE = 50;
  function pushUrl(url) {
    history.push(url);
  }
  useEffect(() => {
    historyRegisterPostService.getHistoryRegisterPost().then((req) => {
      setPosts(req);
      setCountValue(req.lenght);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue]);
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
    let computedPosts = posts;
    if (search) {
      computedPosts = computedPosts.filter(
        (comment) =>
          comment.postTitle.toLowerCase().includes(search.toLowerCase()) ||
          comment.status.toLowerCase().includes(search.toLowerCase()),
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
          <Row>
            <Col md="12">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/">Trang chủ</Link>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page" className="active">
                  Lịch sử giao dịch
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <div className="col">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Lịch sử giao dịch</h3>
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
                              {formatTime(item.registerDate)}
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold text-truncate cus-text2"
                              href="#pablo"
                              style={{ maxWidth: 150 }}
                            >
                              {item.postTitle}
                            </div>
                          </td>

                          <td>
                            <div
                              className="font-weight-bold"
                              style={{ maxWidth: 200 }}
                            >
                              {item.postConditrion}
                            </div>
                          </td>
                          <td>
                            <div
                              className="font-weight-bold text-truncate mw-25"
                              style={{ maxWidth: 200 }}
                            >
                              {item.status}
                            </div>
                          </td>
                          <td className="table-actions text-right">
                            {((item.statusId === 4 &&
                              item.postConditrion === 'Tặng') ||
                              (item.statusId === 5 &&
                                item.postConditrion === 'Trao đổi')) && (
                              <>
                                <Button
                                  className=" btn-icon"
                                  color="info"
                                  size="sm"
                                  type="button"
                                  id="tooltip2"
                                  onClick={() => rowEvent(item.userId)}
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

export default HistoryRegisterPage;
