import CardPost from 'pages/components/CardPost/CardPost';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Col,
  Container,
  Row,
} from 'reactstrap';
import postService from 'services/post.service';

// Core Components

function SearchPage() {
  const [posts, setPosts] = useState([]);
  const location = useLocation().search;
  const textSearch = new URLSearchParams(location).get('value');
  const history = useHistory();
  useEffect(() => {
    getPostActive(textSearch);
  }, [textSearch]);

  const getPostActive = (textSearch) => {
    postService.searchActivePost(textSearch).then((data) => {
      if (data.status === 400) {
        return;
      }
      setPosts(data);
    });
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="mt-2">
          <Col md="12">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Trang chủ</Link>
              </BreadcrumbItem>
              <BreadcrumbItem aria-current="page" className="active">
                Kết quả tìm kiếm
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col md="12">
            <p className="h2">{textSearch}</p>
          </Col>
          <Col md="12">
            <p>
              <small>
                {posts.length} bài viết được tìm thấy theo "{textSearch}"
              </small>
            </p>
          </Col>
        </Row>

        {posts.length > 0 ? (
          <Row className="align-items-center">
            {posts.map((item, i) => (
              <CardPost post={item} />
            ))}
          </Row>
        ) : (
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
        )}
      </Container>
    </>
  );
}

export default SearchPage;
