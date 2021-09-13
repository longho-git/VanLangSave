// react library for routing
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col, Modal } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import PostForm from './PostForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function HomeHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const userProfile = useSelector((state) => state.login.userProfile);
  return (
    <>
      <div className="header pt-5 pb-2">
        <Container fluid>
          <div className="header-body">
            <Row className="justify-content-center text-center">
              <Col md="6">
                <Card>
                  <CardHeader className=" bg-transparent ">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <a
                          className="avatar avatar-xl rounded-circle"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={
                              userProfile.avatarURL
                                ? userProfile.avatarURL
                                : 'https://www.dropbox.com/s/t4jamyq65xt41uo/t3ohtfyk.cjw.png?dl=1'
                            }
                          />
                        </a>
                      </Col>
                      <div className="col ml--2">
                        <Button
                          className="text-left"
                          block
                          color="secondary"
                          size="lg"
                          type="button"
                          style={{
                            color: '#00000033',
                          }}
                          onClick={() => setModalOpen(true)}
                        >
                          Bạn đang nghĩ gì??
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody></CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
        <Modal
          className="modal-dialog-centered"
          size="lg"
          isOpen={modalOpen}
          toggle={() => setModalOpen(false)}
        >
          <PostForm closeModal={() => setModalOpen(false)} />
        </Modal>
      </div>
    </>
  );
}

export default HomeHeader;
