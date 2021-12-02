import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Media,
  Row,
  UncontrolledCarousel,
} from 'reactstrap';
import { formatTime } from 'utils/fortmatTime';
import postService from 'services/post.service';

function PostDialog({ post }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getPost(post.id);
  }, [post]);
  function getPost(postId) {
    postService.getPostById(postId).then((data) => {
      var images = Array.from(data.imagePostModelRqList);
      setItems(images);
    });
  }
  //   const [items, setItems] = useState(Array.from(post.imagePostModelRqList));
  return (
    <div>
      <Card className="bg-secondary border-0">
        <CardHeader className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <h4 className="display-4">{post.title}</h4>
          </div>
        </CardHeader>
        <CardBody className="bg-white">
          <Row>
            <Col md="7" className="mx-auto">
              <UncontrolledCarousel className="post-carousel" items={items} />
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
                          <Col className="d-flex justify-content-start" md="12">
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
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

PostDialog.propTypes = {};

export default PostDialog;
