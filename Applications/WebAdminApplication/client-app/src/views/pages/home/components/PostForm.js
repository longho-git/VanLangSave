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
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { FormHook } from './../../../../components/Form/index';
import InpuxText from 'components/Form/InputText';
import { Select } from 'components/Form/Select';
import postService from 'services/post.service';
import { useHistory } from 'react-router';
const API_URL = process.env.REACT_APP_API_ENDPOINT;
// core components
Dropzone.autoDiscover = false;

function PostForm({ closeModal }) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const history = useHistory();
  const [imagePost, setImagePosts] = useState([]);
  const [defaultValues, setDefaultValues] = useState({
    title: '',
    content: '',
    type: 1,
  });
  const onSubmit = (data) => {
    postService.createPost(data, imagePost).then((req) => {
      if (req.status === 400) {
        return;
      }
      closeModal();
      history.push('/posts');
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
          setImagePosts((oldArray) => [
            ...oldArray,
            {
              imageURL: response.value,
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
        });
      },
    });
    document.getElementsByClassName('dz-preview-multiple')[0].innerHTML = '';
  }, []);
  return (
    <div className="modal-body p-0">
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
          <FormHook onSubmit={onSubmit} defaultValues={defaultValues}>
            <InpuxText
              name="title"
              placeholder="Tiêu đề."
              style={{ border: 0 }}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />
            <Select
              name="type"
              options={[
                {
                  name: 'Tặng',
                  value: 1,
                },
                {
                  name: 'Trao đổi',
                  value: 2,
                },
              ]}
            ></Select>
            <InpuxText
              name="content"
              placeholder="Mô tả."
              rows="5"
              textarea
              style={{ border: 0 }}
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />

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
                  <Row className=" align-items-center">
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
                    <Col className=" col-auto">
                      <Button size="sm" color="danger" data-dz-remove>
                        <i className="fas fa-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </div>
            <Row className="align-items-center">
              <Button className="mt-4" color="info">
                Đăng bài
              </Button>
            </Row>
          </FormHook>
        </CardBody>
      </Card>
    </div>
  );
}

export default PostForm;
