import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  UncontrolledCarousel,
  Container,
  Media,
  Table,
  Badge,
} from 'reactstrap';
import { formatTime } from 'utils/fortmatTime';
import Scrollbars from 'react-custom-scrollbars';
import postService from 'services/post.service';

function CardSelect({ postId }) {
  const [post, setPost] = useState({});
  const [items, setItems] = useState([]);
  useEffect(() => {
    getPost(postId);
  }, [postId]);
  function getPost(postId) {
    postService.getPostById(postId).then((data) => {
      setPost(data);
      var images = Array.from(data.imagePostModelRqList);
      setItems(images);
    });
  }
  return (
    <Card className="bg-secondary border-0">
      <CardBody className="bg-white">
        <Row>
          <Col md={12}>
            <blockquote className="blockquote">
              <h4 className="display-4 text-uppercase">{post.title}</h4>
              <footer className="blockquote-footer">
                <cite title="Source Title">{formatTime(post.createdDate)}</cite>
              </footer>
            </blockquote>
          </Col>
          <Col md="7" className="mx-auto">
            <UncontrolledCarousel className="post-carousel" items={items} />
          </Col>
          <Col md="5" className="mx-auto">
            <Container>
              <Row>
                <Col className="mx-auto" lg="12">
                  <div className="media-area">
                    <div className="media-header">
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
                                <td className="text-right">{post.quantity}</td>
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
                                <td className="text-right">{post.typeName}</td>
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
  );
}

CardSelect.propTypes = {};

export default CardSelect;
