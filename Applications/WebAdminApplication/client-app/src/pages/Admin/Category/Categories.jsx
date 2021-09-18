import React, { useEffect, useMemo, useState } from 'react';
import AdminHeader from './../../../layouts/component/Header/AdminHeader';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Modal,
  Row,
  Table,
  UncontrolledTooltip,
} from 'reactstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CreateCategoryForm from 'pages/components/CreateCategoryForm/CreateCategoryForm';
import categoryService from 'services/category.service';
const { SearchBar } = Search;

function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    categoryService.getCategories().then((data) => {
      if (data.status === 400) {
        return;
      }
      setCategories(data);
    });
  };
  const [modalOpen, setModalOpen] = React.useState(false);
  const tableRender = useMemo(() => {
    return (
      <ToolkitProvider
        data={categories}
        keyField="title"
        columns={[
          {
            dataField: 'name',
            text: 'Tên danh mục',
            sort: true,
          },
          {
            dataField: 'col',
            text: 'Col',
            sort: true,
          },
          {
            dataField: 'imageURL',
            text: 'Hình ảnh',
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
                        <td className="table-user">
                          <a
                            className="font-weight-bold"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item.name}
                          </a>
                        </td>
                        <td>
                          <b>{item.col}</b>
                        </td>
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
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-user-edit" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip874640709"
                          >
                            Edit product
                          </UncontrolledTooltip>
                          <a
                            className="table-action table-action-delete"
                            href="#pablo"
                            id="tooltip598568751"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-trash" />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip598568751"
                          >
                            Delete product
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
  }, [categories]);

  return (
    <>
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

          {tableRender}
        </Card>
        <Modal
          isOpen={modalOpen}
          toggle={() => setModalOpen(!modalOpen)}
          className="modal-lg"
          modalClassName=" bd-example-modal-lg"
        >
          <CreateCategoryForm />
        </Modal>
      </Container>
    </>
  );
}

export default Categories;
