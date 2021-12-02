import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Badge, Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import postService from 'services/post.service';
import { formatTime } from '../../utils/fortmatTime';
import Scrollbars from 'react-custom-scrollbars';
import RegisterPostExchangeList from 'pages/components/RegisterPostList/RegisterPostExchangeList';

// Core Components

function RegisterExChangeOfPostPage() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [id]);
  function getPost(postId) {
    postService.getPostById(postId).then((data) => {
      setPost(data);
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
            <CardBody className="bg-white">
              <Row>
                <Col md="12" className="mx-auto">
                  <blockquote className="blockquote">
                    <h4 className="display-4 text-uppercase">{post.title}</h4>
                    <footer className="blockquote-footer">
                      <cite title="Source Title">
                        {formatTime(post.createdDate)}
                      </cite>
                    </footer>
                  </blockquote>
                </Col>
                <Col md="12" className="mx-auto">
                  <Container>
                    <Row>
                      <Col className="mx-auto" lg="12">
                        <div className="media-area">
                          <div className="media-header">
                            <Row className="mt-1">
                              <Col md="5">
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
                              <Col md="7">
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
                <Col md="12" className="mx-auto">
                  <RegisterPostExchangeList postId={id} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default RegisterExChangeOfPostPage;
