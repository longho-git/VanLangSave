import React, { useEffect, useState } from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import categoryService from 'services/category.service';
import CardCategory from '../CardCategory/CardCategory';

function HomeCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    categoryService.getCategories().then((data) => {
      if (data.status === 400) {
        return;
      }
      setCategories(data);
    });
  };
  return (
    <>
      <Container>
        <Row className="mt-2">
          <Col md="8">
            <h5 className="display-3">Khám phá danh mục</h5>
          </Col>
        </Row>
        <Row className="align-items-center">
          {categories.length > 0 &&
            categories.map((item, i) => (
              <Col md={item.col} key={i.toString()}>
                <CardCategory category={item} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeCategory;
