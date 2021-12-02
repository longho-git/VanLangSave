import CardPost from 'pages/components/CardPost/CardPost';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Col, Container, Row } from 'reactstrap';
import categoryService from 'services/category.service';
import postService from 'services/post.service';

// Core Components

function CategoryPostsPage() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    getPostActive(id);
    getCategoryService(id);
  }, [id]);

  const getPostActive = (categoryID) => {
    postService.getPostByCategoryId(categoryID).then((data) => {
      if (data.status === 400) {
        return;
      }
      setPosts(data);
    });
  };

  const getCategoryService = (categoryID) => {
    categoryService.getCategoryById(categoryID).then((data) => {
      if (data.status === 400) {
        return;
      }
      setCategory(data);
    });
  };

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
        <Container className="mt-5">
          <Row className="mt-2">
            <Col md="8">
              <h5 className="display-3">{category.name}</h5>
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
      </div>
    </>
  );
}

export default CategoryPostsPage;
