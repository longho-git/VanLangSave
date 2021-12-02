import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import postService from 'services/post.service';
import { formatTime } from './../../../utils/fortmatTime';

function PostByCategory({ id }) {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getPostActive(id);
  }, [id]);

  const getPostActive = (categoryID) => {
    postService.getPostByCategoryId(categoryID).then((data) => {
      if (data.status === 400) {
        return;
      }
      setPosts(data.slice(0, 3));
    });
  };

  return (
    <>
      {posts.length > 0 && (
        <Container>
          <Row>
            <Col className="mx-auto" lg="10" md="8">
              <h2 className="title mb-5">Bài đăng cùng chủ đề</h2>
              {posts.map((item, idx) => (
                <Card
                  className="card-blog card-plain blog-horizontal mb-5"
                  key={idx}
                >
                  <Row>
                    <Col lg="4">
                      <div className="card-image shadow">
                        <a onClick={(e) => history.push(`/post/${item.id}`)}>
                          <img
                            alt="..."
                            className="img rounded"
                            src={item.imageMain}
                          ></img>
                        </a>
                      </div>
                    </Col>
                    <Col lg="8">
                      <CardBody>
                        <CardTitle tag="h3">
                          <a onClick={(e) => history.push(`/post/${item.id}`)}>
                            {item.title}
                          </a>
                        </CardTitle>
                        <p>
                          <p className="card-description"> {item.content}</p>
                          <a onClick={(e) => history.push(`/post/${item.id}`)}>
                            Xem tiếp
                          </a>
                        </p>

                        <div className="author">
                          <img
                            alt="..."
                            className="avatar img-raised"
                            src={item.ownerAvatarImage}
                          ></img>
                          <div className="text">
                            <span className="name"> {item.ownerName}</span>
                            <div className="meta">
                              {formatTime(item.createdDate)}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default PostByCategory;
