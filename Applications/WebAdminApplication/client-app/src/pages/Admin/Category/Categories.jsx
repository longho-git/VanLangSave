/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react';
import AdminHeader from './../../../layouts/component/Header/AdminHeader';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Col,
  Container,
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import CreateCategoryForm from 'pages/components/CreateCategoryForm/CreateCategoryForm';
import categoryService from 'services/category.service';
import CategoryDialog from 'pages/components/CategoryDialog/CategoryDialog';
import SearchTable from 'layouts/component/Table/SearchTable';
import ReactBSAlert from 'react-bootstrap-sweetalert';
import PaginationTable from 'layouts/component/Table/PaginationTable';
import HeaderTable from 'layouts/component/Table/HeaderTable';



function Categories() {
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(null);
  const [countValue, setCountValue] = useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [item, setItem] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleShow = () => setShow(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState({ field: '', order: '' });
  const ITEMS_PER_PAGE = 10;
  const headers = [
    {
      field: 'name',
      name: 'Tên danh mục',
      sortable: true,
    },
    //{
      //field: 'col',
      //name: 'Col',
      //sortable: false,
    //},
    {
      field: 'imageURL',
      name: 'Hình ảnh',
      sortable: false,
    },
    {
      field: '',
      name: '',
      sortable: false,
    },
  ];

  useEffect(() => {
    getCategories();
  }, []);

  const postCategories = useMemo(() => {
    let computedCategories = categories;
    if (search) {
      computedCategories = computedCategories.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setTotalItems(computedCategories.length);

    //Sorting posts
    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedCategories = computedCategories.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]),
      );
    }

    //Current Page slice
    return computedCategories.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    );
  }, [categories, currentPage, search, sorting]);

  const getCategories = () => {
    categoryService.getCategories().then((data) => {
      if (data.status === 400) {
        return;
      }
      setCategories(data);
    });
  };

  const confirmAlert = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => deleteCategory(id)}
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
    if(deleteCategory == true){
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
        Danh mục đã xóa
      </ReactBSAlert>,
      );
    } else {
      setAlert(
        <ReactBSAlert
          danger
          style={{ display: 'block', marginTop: '-100px' }}
          title="Thất bại!"
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Không thể xóa vì đã có bài đăng trong danh mục
        </ReactBSAlert>,
      );
    }
  };

  const deleteCategory = (id) => {
    categoryService.deleteCategory(id).then((req) => {
      if (req) {
        confirmedAlert();
        setTimeout(() => {
          setCountValue(countValue - 1);
        }, 2000);
      }
    });
  };

  const handleClose = () => {
    setShow(false);
    getCategories();
  };
  
  const toggleTrueFalse = () => {
    setModalEdit(handleShow);
  };
  
  const rowEvent = (item) => {
    setItem(item);
    toggleTrueFalse();
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
        <CategoryDialog item={item} />
      </Modal>
    );
  };

  

  return (
    <>
    {alert}
      <AdminHeader name="Danh mục" parentName="Danh sách" />
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row>
              <Col xs="6">
                <h3 className="mb-0">Danh mục</h3>
              </Col>
              <Col className="text-right" xs="6">
                <Button
                  className="btn-neutral btn-round btn-icon"
                  color="default"
                  id="tooltip969372949"
                  onClick={() => setModalOpen(!modalOpen)}
                  size="sm"
                >
                  <span className="btn-inner--icon mr-1">
                    <i className="fas fa-plus" />
                  </span>
                  <span className="btn-inner--text">Thêm mới</span>
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip969372949">
                  Thêm
                </UncontrolledTooltip>
              </Col>
            </Row>
          </CardHeader>
          <SearchTable
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
               }}
                placeholder={'Nhập tên danh mục'}
              />
          <Table className="align-items-center table-flush" responsive>
            <HeaderTable
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
            />
                <tbody>
                  {postCategories.map((item) => {
                    return (
                      <tr>
                        <td className="table-user">
                          <a
                            className="font-weight-bold"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.name}
                          </a>
                        </td>
                        {/* <td>
                         <b>{item.col}</b>
                       </td> */}
                        <td className="table-user">
                          <img
                            alt="..."
                            className=" img-fluid rounded shadow-lg mr-3"
                            style={{ width: 150 }}
                            src={item.imageURL}
                          />
                        </td>
                        <td className="table-actions">
                          <a
                            className="table-action"
                            href="#pablo"
                            id="tooltip874640709"
                            onClick={() => rowEvent(item)}
                          >
                            <i className="fas fa-user-edit" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip874640709"
                          >
                            Cập nhật danh mục
                          </UncontrolledTooltip>
                          <a
                            className="table-action table-action-delete"
                            id="tooltip598568751"
                            onClick={(e) => confirmAlert(item.id)}
                          >
                            <i className="fas fa-trash" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip598568751"
                          >
                            Xóa danh mục
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
        
        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          className="modal-lg"
          modalClassName=" bd-example-modal-lg"
        >
          <CreateCategoryForm />
        </Modal>
        {show ? <ModalContent /> : null}
      </Container>
    </>
    
  );
  
}

export default Categories;
