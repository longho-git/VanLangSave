import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router';

function CardCategory({ category }) {
  const history = useHistory();
  function pushUrl(url) {
    history.push(url);
  }
  return (
    <Card
      className="card-blog card-background"
      data-animation="zooming"
      onClick={() => pushUrl(`/post/category/${category.id}`)}
    >
      <div
        className="full-background"
        style={{
          backgroundImage: 'url(' + category.imageURL + ')',
        }}
      ></div>
      <a href="#pablo" onClick={(e) => e.preventDefault()}>
        <CardBody>
          <div className="content-bottom">
            <h2 className="card-category text-white ">{category.name}</h2>
          </div>
        </CardBody>
      </a>
    </Card>
  );
}

CardCategory.propTypes = {};

export default CardCategory;
