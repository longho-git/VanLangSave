/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// react library for routing
// reactstrap components
import { Container, Row, Col, Button } from 'reactstrap';
import Newfeed from './components/Newfeed';
import HomeHeader from './components/HomeHeader';
import homeService from 'services/home.service';
import { useEffect, useState } from 'react';

function HomePage() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    homeService.getNewFeed().then((data) => {
      if (data.status === 400) {
        return;
      }
      setNews(data);
    });
  }, []);
  return (
    <>
      <HomeHeader />
      <section className=" pb-9 ">
        <Container fluid>
          {news.length > 0 ? (
            news.reverse().map((item, i) => (
              <Row
                className="justify-content-center text-center"
                key={i.toString()}
              >
                <Col md="6">
                  <Newfeed item={item}></Newfeed>
                </Col>
              </Row>
            ))
          ) : (
            <>
              <Row className="justify-content-center text-center">
                <Col md="12">
                  <h1 className="mb-0 text-center">không có bài viết</h1>
                </Col>
                <Button color="secondary" outline type="button">
                  tải lại
                </Button>
              </Row>
            </>
          )}
        </Container>
      </section>
    </>
  );
}

export default HomePage;
