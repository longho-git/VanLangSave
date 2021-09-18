import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Row } from 'reactstrap';
import CardPost from '../CardPost/CardPost';
import homeService from 'services/home.service';
import { useHistory } from 'react-router';

function HomePostLasted(props) {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getPostActive();
  }, []);

  const getPostActive = () => {
    homeService.getPostActive().then((data) => {
      if (data.status === 400) {
        return;
      }
      setPosts(data);
    });
  };
  return (
    <>
      <Container>
        <Row className="mt-2">
          <Col md="8">
            <h5 className="display-3">Tin đăng dành cho bạn</h5>
          </Col>
        </Row>

        {posts.length > 0 ? (
          <Row className="align-items-center">
            {posts.map((item, i) => (
              <CardPost post={item} />
            ))}
          </Row>
        ) : (
          <>
            <Row className="align-items-center justify-content-center">
              <Col className="text-center " md="6">
                <h1 className="mb-0 text-center">không có bài viết</h1>
                <Button
                  color="default"
                  className="mt-5"
                  type="button"
                  onClick={() => history.push('/')}
                >
                  Trờ về trang chủ
                </Button>
              </Col>
            </Row>
          </>
        )}

        <Col className="ml-auto mr-auto mt-2 mb-5 text-center" md="3">
          <Button className="btn-icon mt-4" color="primary" type="button">
            <span className="btn-inner--text">Xem thêm</span>
            <span className="btn-inner--icon">
              <i className="ni ni-bold-right"></i>
            </span>
          </Button>
        </Col>
      </Container>
    </>
  );
}

HomePostLasted.propTypes = {};

export default HomePostLasted;
