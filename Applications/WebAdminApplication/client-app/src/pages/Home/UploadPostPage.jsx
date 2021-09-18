/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// javascript plugin that creates nice dropzones for files
import Dropzone from 'dropzone';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Container,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import postService from 'services/post.service';
import { useHistory } from 'react-router';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import { SelectCustom } from 'layouts/component/SmartFormHook/SelectCustom/SelectCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import categoryService from 'services/category.service';
const API_URL = process.env.REACT_APP_API_ENDPOINT;
// core components
Dropzone.autoDiscover = false;

function UploadPostPage() {
  const userProfile = useSelector((state) => state.login.userProfile);
  const history = useHistory();
  const [imagePost, setImagePosts] = useState([]);
  const [defaultValues, setDefaultValues] = useState({});
  const [categories, setCategories] = useState([]);
  const onSubmit = (data) => {
    postService.createPost(data, imagePost).then((req) => {
      if (req.status === 400) {
        return;
      }
      history.push('/userpost');
    });
  };
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

  useEffect(() => {
    // it is just to make the HTML DOM a bit better, and keep it light
    let currentMultipleFile = undefined;
    // multiple dropzone file - accepts any type of file
    new Dropzone(document.getElementById('dropzone-multiple'), {
      url: `${API_URL}FileManager/uploadFileDefault`,
      success: function (file, response) {
        response &&
          categories.length < 3 &&
          setImagePosts((oldArray) => [
            ...oldArray,
            {
              src: response.value,
              mainPost: currentMultipleFile ? false : true,
            },
          ]);
        if (currentMultipleFile) {
        }
        currentMultipleFile = file;
      },
      paramName: 'formFile',
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        'dz-preview-multiple',
      )[0],
      dictDefaultMessage: 'Thêm ảnh',
      previewTemplate: document.getElementsByClassName('dz-preview-multiple')[0]
        .innerHTML,
      maxFiles: 3,
      acceptedFiles: 'image/*',
      init: function () {
        this.on('maxfilesexceeded', function (file) {
          alert('Đã đủ ảnh vui lòng xoá bớt ảnh');
          this.removeFile(file);
        });
      },
    });
    document.getElementsByClassName('dz-preview-multiple')[0].innerHTML = '';
  }, []);
  return (
    <div className="section section-hero section-shaped">
      <Container className="mt-5">
        <Card className="bg-secondary border-0">
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="12">
                <h5 className="h3 mb-0 text-center font-weight-700">
                  Tạo bài viết
                </h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="bg-white">
            <Row className="align-items-center">
              <Col className="col-auto">
                <a
                  className="avatar avatar-sm rounded-circle"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <img
                    alt="..."
                    src={
                      userProfile.avatarURL
                        ? userProfile.avatarURL
                        : 'https://www.dropbox.com/s/t4jamyq65xt41uo/t3ohtfyk.cjw.png?dl=1'
                    }
                  />
                </a>
              </Col>
              <div className="col ml--2">
                <h4 className="mb-0">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {userProfile.lastName + ' ' + userProfile.firstName}
                  </a>
                </h4>
              </div>
            </Row>
            <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
              <InputCustom
                name="title"
                placeholder="Tiêu đề."
                label="Tiêu đề"
                rules={{
                  required: 'Vui lòng không bỏ trống',
                }}
              />
              <SelectCustom
                label="Loại"
                name="type"
                options={[
                  {
                    name: 'Tặng',
                    id: 1,
                  },
                  {
                    name: 'Trao đổi',
                    id: 2,
                  },
                ]}
              />
              <SelectCustom
                label="Tình trạng sản phẩm"
                name="condition"
                options={[
                  {
                    name: 'Mới',
                    id: 1,
                  },
                  {
                    name: 'Đã qua sử dụng',
                    id: 2,
                  },
                ]}
              />
              <SelectCustom
                label="Danh mục bài viết"
                name="categoryId"
                options={categories}
              />
              <InputCustom
                name="content"
                placeholder="Mô tả."
                label="Mô tả"
                rows="5"
                textarea
                rules={{
                  required: 'Vui lòng không bỏ trống',
                }}
              />
              <InputCustom
                name="quantity"
                placeholder="Số lượng"
                label="Số lượng"
                rules={{
                  required: 'Vui lòng không bỏ trống',
                }}
              />
              <Col sm="12">
                <div
                  className="dropzone dropzone-multiple py-5"
                  id="dropzone-multiple"
                >
                  <div className="fallback">
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="customFileUploadMultiple"
                        multiple="multiple"
                        type="file"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="customFileUploadMultiple"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <p className="text-primary">Ảnh đầu tiên sẽ là ảnh chính</p>
                  <p className="text-warning mb-0">Upload tối đa 3 ảnh</p>
                  <ListGroup
                    className=" dz-preview dz-preview-multiple list-group-lg"
                    flush
                  >
                    <ListGroupItem className=" px-0">
                      <Col className=" col-auto">
                        <div className=" avatar">
                          <img
                            alt="..."
                            className=" avatar-img rounded"
                            data-dz-thumbnail
                            src="..."
                          />
                        </div>
                      </Col>
                      <div className=" col ml--3">
                        <h4 className=" mb-1" data-dz-name>
                          ...
                        </h4>
                        <p className=" small text-muted mb-0" data-dz-size>
                          ...
                        </p>
                      </div>

                      <Button size="sm" color="danger" data-dz-remove>
                        <i className="fas fa-trash" />
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </Col>
              <Col>
                <Button block color="primary" size="lg">
                  Đăng bài
                </Button>
              </Col>
            </FormCustom>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default UploadPostPage;
