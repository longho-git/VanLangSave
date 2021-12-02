import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'reactstrap';
import postService from 'services/post.service';
import registerPostExchangeService from 'services/registerPostExchange.service';
import SelectPost from '../RegisterPostDialog/SelectPost';
import CardSelect from './CardSelect';

function ChoosePostExchange({
  closeModal,
  registerExchangeId,
  userProfileId,
  userRegisterName,
}) {
  const [options, setOptions] = useState([]);
  const [postSelect, setPostSelect] = useState();
  const onSubmit = () => {
    registerPostExchangeService
      .acceptRegisterPostExchangeByOwner(registerExchangeId, postSelect.id)
      .then((req) => {
        closeModal();
      });
  };
  useEffect(() => {
    postService.getActivePostByUserProfileId(userProfileId).then((req) => {
      setOptions(req);
      setPostSelect(req[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="bg-secondary border-0 mb-0">
      <CardHeader className="d-flex align-items-center justify-content-between">
        <h5 className="display-4 text-center">
          Chọn sản phẩm muốn trao đổi với {userRegisterName}
        </h5>
        <div className="d-flex">
          <Button color="danger" onClick={() => closeModal()}>
            Huỷ
          </Button>
          <Button color="primary" onClick={() => onSubmit()}>
            Xác nhận
          </Button>
        </div>
      </CardHeader>
      <CardBody className="bg-white align-items-center">
        <Row>
          <Col md={12}>
            {options.length > 0 && (
              <SelectPost
                options={options}
                onChange={(e) => setPostSelect(e)}
              />
            )}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={12}>
            {postSelect && <CardSelect postId={postSelect.id} />}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

ChoosePostExchange.propTypes = {};

export default ChoosePostExchange;
