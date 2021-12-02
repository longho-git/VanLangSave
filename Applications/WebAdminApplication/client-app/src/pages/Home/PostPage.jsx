import RegisterPostGive from 'pages/components/RegisterPostDialog/RegisterPostGive';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Modal,
  Row,
  Table,
  UncontrolledCarousel,
  UncontrolledTooltip,
} from 'reactstrap';
import postService from 'services/post.service';
import { formatTime } from './../../utils/fortmatTime';
import Scrollbars from 'react-custom-scrollbars';
import PostByCategory from 'pages/components/PostByCategory/PostByCategory';
import RegisterPostExchange from 'pages/components/RegisterPostDialog/RegisterPostExchange';

// Core Components

function PostPage({ isLoggedIn }) {
  const userProfile = useSelector((state) => state.login.userProfile);
  const [post, setPost] = useState({});
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    getPost(id);
  }, [id]);
  function getPost(postId) {
    postService.getPostById(postId).then((data) => {
      setPost(data);
      var images = Array.from(data.imagePostModelRqList);
      setItems(images);
    });
  }

  return (
    <>
      <Modal
        className="modal-lg"
        modalClassName=" bd-example-modal-lg"
        onClosed={handleClose}
        toggle={() => handleClose()}
        isOpen={show}
      >
        {post.type === 1 ? (
          <RegisterPostGive closeModal={() => handleClose()} postId={post.id} />
        ) : (
          <RegisterPostExchange
            closeModal={() => handleClose()}
            postId={post.id}
          />
        )}
      </Modal>
      <div className="section section-hero section-shaped">
        <div className="page-header">
          <img
            alt="..."
            className="bg-image"
            src={require('assets/img/ill/index_bg.svg').default}
          ></img>
        </div>
        <Container className="mt-3">
          <Card className="bg-secondary border-0">
            <CardBody className="bg-white">
              <Row>
                <Col md="7" className="mx-auto">
                  <blockquote className="blockquote">
                    <h4 className="display-4 text-uppercase">{post.title}</h4>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        {formatTime(post.createdDate)}
                      </cite>
                    </footer>
                  </blockquote>
                  <UncontrolledCarousel
                    className="post-carousel"
                    items={items}
                  />
                </Col>
                <Col md="5" className="mx-auto">
                  <Container>
                    <Row>
                      <Col className="mx-auto" lg="12">
                        <div className="media-area">
                          <div className="media-header">
                            <Row className="mb-5">
                              <Col
                                className="d-flex justify-content-start"
                                md="6"
                              >
                                <div className="avatar">
                                  <Media
                                    alt="..."
                                    className="shadow"
                                    object
                                    src={post.ownerAvatarImage}
                                  ></Media>
                                </div>
                                <div className="text">
                                  <span className="name">{post.ownerName}</span>
                                </div>
                              </Col>
                              <Col
                                className="d-flex justify-content-end"
                                md="6"
                              >
                                {isLoggedIn && (
                                  <ButtonGroup>
                                    {post.userId !== userProfile.userId && (
                                      <Button
                                        className="btn-icon-only"
                                        color="info"
                                        outline
                                        size="sm"
                                        id="tooltip601065234"
                                        onClick={() => handleShow()}
                                      >
                                        <i className="ni ni-badge"></i>
                                      </Button>
                                    )}
                                    <UncontrolledTooltip
                                      delay={0}
                                      target="tooltip601065234"
                                    >
                                      Đăng ký {post.typeName}
                                    </UncontrolledTooltip>
                                  </ButtonGroup>
                                )}
                              </Col>
                            </Row>
                            <Row className="mt-1">
                              <Col md="12">
                                <Table className="tablesorter" responsive>
                                  <tbody>
                                    <tr>
                                      <td className="text-left pl-0">
                                        <Badge
                                          className="badge-circle mr-2"
                                          color="info"
                                        >
                                          <i className="fas fa-sort-numeric-up-alt"></i>
                                        </Badge>
                                        Số lượng
                                      </td>
                                      <td className="text-right">
                                        {post.quantity}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left pl-0">
                                        <Badge
                                          className="badge-circle mr-2"
                                          color="info"
                                        >
                                          <i className="fas fa-thumbs-up"></i>
                                        </Badge>
                                        Tình trạng sử dụng
                                      </td>
                                      <td className="text-right">
                                        {post.conditionName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left pl-0">
                                        <Badge
                                          className="badge-circle mr-2"
                                          color="info"
                                        >
                                          <i className="ni ni-paper-diploma"></i>
                                        </Badge>
                                        Hình thức
                                      </td>
                                      <td className="text-right">
                                        {post.typeName}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-left pl-0">
                                        <Badge
                                          className="badge-circle mr-2"
                                          color="info"
                                        >
                                          <i className="ni ni-single-copy-04"></i>
                                        </Badge>
                                        Loại
                                      </td>
                                      <td className="text-right">
                                        {post.categoryName}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Col>
                              <Col md="12" className="mb-3">
                                <Scrollbars
                                  style={{
                                    minHeight: 250,
                                    height: '100%',
                                    fontSize: 20,
                                  }}
                                  autoHide
                                >
                                  <p className="description ">{post.content}</p>
                                </Scrollbars>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        <PostByCategory id={post.categoryId}></PostByCategory>
      </div>
    </>
  );
}

export default PostPage;
