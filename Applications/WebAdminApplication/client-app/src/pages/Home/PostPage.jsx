import HomeCarousel from 'pages/components/HomeCarousel/HomeCarousel';
import HomeCategory from 'pages/components/HomeCategory/HomeCategory';
import HomePostLasted from 'pages/components/HomePostLasted/HomePostLasted';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
  UncontrolledCarousel,
} from 'reactstrap';
import postService from 'services/post.service';
import { formatTime } from './../../utils/fortmatTime';

// Core Components

function PostPage() {
  const [post, setPost] = useState({});
  const [items, setItems] = useState([]);
  const { id } = useParams();
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
            <CardHeader className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <h4 className="display-4">{post.title}</h4>
              </div>
              <div className="text-right ml-auto">
                <Button color="default" outline size="sm">
                  Về trang chủ
                </Button>
                <Button color="warning" outline size="sm">
                  Tin tiếp
                </Button>
              </div>
            </CardHeader>
            <CardBody className="bg-white">
              <Row>
                <Col md="7" className="mx-auto">
                  <UncontrolledCarousel
                    className="post-carousel"
                    items={items}
                  />
                  <hr style={{ width: '100%' }}></hr>
                  <Row className="mt-5">
                    <Col md="6">
                      <h4 className="display-5">Số lượng : {post.quantity}</h4>
                    </Col>
                    <Col md="6">
                      <h4 className="display-5">
                        Tình trạng sử dụng: {post.conditionName}
                      </h4>
                    </Col>
                  </Row>
                </Col>
                <Col md="5" className="mx-auto">
                  <Container>
                    <Row>
                      <Col className="mx-auto" lg="10">
                        <div className="media-area">
                          <div className="media-header">
                            <Row>
                              <Col
                                className="d-flex justify-content-start"
                                md="12"
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
                                  <div className="meta">
                                    {formatTime(post.createdDate)}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <p className="description mt-5">{post.content}</p>
                            <div className="actions mb-5">
                              <Button color="info" outline size="sm">
                                Đăng ký
                              </Button>
                            </div>
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
      </div>
    </>
  );
}

export default PostPage;
