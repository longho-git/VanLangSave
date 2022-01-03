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
  Container,
  Spinner,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import postService from 'services/post.service';
import { useHistory, useLocation } from 'react-router';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import { SelectCustom } from 'layouts/component/SmartFormHook/SelectCustom/SelectCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import categoryService from 'services/category.service';
import BackgroudUpload from 'pages/components/Upload/BackgroudUpload';
import ReactNotificationAlert from 'react-notification-alert';
import userService from 'services/user.service';
// core components

function UploadPostPage() {
  const userProfile = useSelector((state) => state.login.userProfile);
  const history = useHistory();
  const location = useLocation().search;
  const [imagePost, setImagePosts] = useState([]);
  const [defaultValues, setDefaultValues] = useState({});
  const [categories, setCategories] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const [noProfileMessage, setNoProfileMessage] = useState('');
  const form = new URLSearchParams(location).get('form');
  const id = new URLSearchParams(location).get('id');
  const notificationAlertRef = React.useRef(null);
  const notify = (type, message) => {
    let options = {
      place: 'tc',
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {type}
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: 'ni ni-bell-55',
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  useEffect(() => {
    userService.getUserProfile(userProfile.userId).then((req) => {
      if (req.phoneNumber === undefined) {
        setNoProfile(true);
        setNoProfileMessage('số điện thoại liên lạc');
      } else if (req.address === undefined) {
        setNoProfile(true);
        setNoProfileMessage('địa chỉ liên lạc');
      } else if (req.phoneNumber === undefined && req.Address === undefined) {
        setNoProfile(true);
        setNoProfileMessage('thông tin tài khoản');
      }
    });
    getCategories();
    form === 'edit' && getPost(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, id]);
  const getCategories = () => {
    categoryService.getCategories().then((data) => {
      if (data.status === 400) {
        return;
      }
      setCategories(data);
    });
  };
  function getPost(postId) {
    postService.getPostById(postId).then((data) => {
      setDefaultValues(data);
      var images = Array.from(data.imagePostModelRqList);
      setImagePosts(images);
    });
  }
  const onSubmit = (data) => {
    if (imagePost.length === 0 || imagePost[0].src === '') {
      notify('danger', 'Vui lòng thêm ảnh');
      return;
    }
    setSubmit(true);
    if (form === 'edit') {
      imagePost.length > 0 &&
        postService.uploadPost(data, imagePost).then((req) => {
          if (req.status === 400) {
            return;
          }
          setSubmit(false);
          history.push('/userpost');
        });
    } else {
      imagePost.length > 0 &&
        postService.createPost(data, imagePost).then((req) => {
          if (req.status === 400) {
            return;
          }
          setSubmit(false);
          history.push('/userpost');
        });
    }
  };
  const updateFieldChanged = (index, src) => {
    let newArr = [...imagePost]; // copying the old datas array
    if (src) {
      newArr[index].src = src; // replace e.target.value with whatever you want to change it to
      setImagePosts(newArr); // ??
    }
  };
  const updateMainPost = (index, value) => {
    let newArr = [...imagePost]; // copying the old datas array
    newArr[index].mainPost = value; // replace e.target.value with whatever you want to change it to
    setImagePosts(newArr); // ??
  };
  const removeImage = (index) => {
    let newArr = [...imagePost];
    const lastIndex = newArr.length - 1;
    if (newArr[lastIndex].src !== '') {
      newArr.splice(index, 1); // make a separate copy of the array
      setImagePosts(newArr);
      return;
    }
  };

  const addImage = () => {
    let newArr = [...imagePost];

    const lastIndex = newArr.length - 1;
    if (newArr.length === 0) {
      setImagePosts((oldArray) => [
        ...oldArray,
        {
          src: '',
          mainPost: true,
        },
      ]);
      return;
    } else if (newArr[lastIndex].src !== '') {
      setImagePosts((oldArray) => [
        ...oldArray,
        {
          src: '',
          mainPost: false,
        },
      ]);
      return;
    }
  };
  return (
    <div className="section section-hero section-shaped">
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <Container className="mt-5">
        <Card className="bg-secondary border-0">
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="12">
                <h5 className="h3 mb-0 text-center font-weight-700">
                  {form === 'edit' ? 'Chỉnh sửa bài viết' : ' Tạo bài viết'}
                </h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="bg-white">
            {!noProfile && (
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
            )}
            {!noProfile ? (
              <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
                <InputCustom
                  name="title"
                  placeholder="Vui Lòng nhập dưới 75 kí tự"
                  label="Tiêu đề"
                  maxLength="75"
                  required
                  rules={{
                    required: '*Vui lòng không bỏ trống',
                  }}
                />
                <SelectCustom
                  label="Hình thức"
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
                  maxLength="100"
                  textarea
                  required
                  rules={{
                    required: '*Vui lòng không bỏ trống',
                  }}
                />
                <InputCustom
                  name="quantity"
                  placeholder="Tối đa 10 sản phẩm"
                  label="Số lượng"
                  type="number"
                  maxLength="2"
                  required
                  rules={{
                    required: '*Vui lòng không bỏ trống',
                    pattern: {
                      value: /[0-9]/
                    },
                  }}
                />
                <Col sm="12">
                  {imagePost.length < 3 && (
                    <Button color="info" onClick={() => addImage()}>
                      <i className="fa fa-plus" /> Thêm ảnh
                    </Button>
                  )}
                  {imagePost.length > 0 && (
                    <Button color="danger" onClick={() => removeImage()}>
                      <i className="fa fa-times" /> Xoá ảnh
                    </Button>
                  )}
                  <Row className="mt-3">
                    {imagePost.map((item, i) => (
                      <Col md={4}>
                        <BackgroudUpload
                          key={i}
                          onChange={(src) => updateFieldChanged(i, src)}
                          imageInit={item.src}
                          mainPost={item.mainPost}
                          updateMainPost={(value) => updateMainPost(i, value)}
                          checkBox={i}
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col>
                  {submit ? (
                    <Button
                      className="mb-2"
                      color="primary"
                      disabled
                      size="lg"
                      block
                      type="button"
                    >
                      <Spinner color="" type={'border'} size="sm"></Spinner>{' '}
                      Loading...
                    </Button>
                  ) : (
                    <Button block color="primary">
                      {form === 'edit' ? 'Lưu' : '  Đăng bài'}
                    </Button>
                  )}
                </Col>
              </FormCustom>
            ) : (
              <>
                <div className="container">
                  <h5 className="h3 mb-0 text-center font-weight-700">
                    Bạn chưa cập nhật {noProfileMessage}
                  </h5>

                  <div className="d-flex justify-content-center mt-4">
                    <Button
                      className=""
                      color="primary"
                      onClick={() => history.push('/profile')}
                    >
                      Cập nhật thông tin
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default UploadPostPage;
