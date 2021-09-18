import React from 'react';
import { useHistory } from 'react-router';
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from 'reactstrap';
import { formatTime } from './../../../utils/fortmatTime';

function CardPost({ post }) {
  const history = useHistory();
  function pushUrl(url) {
    history.push(url);
  }
  return (
    <Col lg="3">
      <Card
        className="card-background"
        data-animation="zooming"
        onClick={() => pushUrl(`/post/${post.id}`)}
      >
        <CardImg alt="..." src={post.imageMain} bottom></CardImg>
        <a href="#pablo" onClick={(e) => e.preventDefault()}>
          <CardBody>
            <div className="content-bottom">
              <h4 className="card-category  opacity-8">{post.typeName}</h4>
              <CardTitle tag="h3">{post.title}</CardTitle>
              <CardText>
                <div className="author">
                  <img
                    alt="..."
                    className="avatar img-raised"
                    src={post.ownerAvatarImage}
                  ></img>
                </div>
                <small className=" text-muted">
                  {formatTime(post.createdDate)}
                </small>
              </CardText>
            </div>
          </CardBody>
        </a>
      </Card>
    </Col>
  );
}

CardPost.propTypes = {};

export default CardPost;
