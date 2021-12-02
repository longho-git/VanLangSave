import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Button, Row, Col } from 'reactstrap';
import { FormCustom } from './../../../layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import registerPostExchangeService from 'services/registerPostExchange.service';

function RegisterPostExchange({ closeModal, postId }) {
  const [defaultValues] = useState({
    remark: '',
    postId: postId,
  });
  // const [options, setOptions] = useState([]);
  const onSubmit = (data) => {
    registerPostExchangeService.createRegisterPostExchange(data).then((req) => {
      closeModal();
    });
  };
  return (
    <Card className="bg-secondary border-0 mb-0">
      <CardHeader className="d-flex align-items-center">
        <h5 className="display-4 text-center">Đăng ký trao đổi</h5>
      </CardHeader>
      <CardBody className="bg-white align-items-center">
        <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
          <InputCustom
            name="remark"
            textarea
            placeholder="Ghi chú"
            label="Ghi chú"
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <div className="d-flex align-items-end offset-md-8 col-md-4">
            <Button color="danger" onClick={() => closeModal()}>
              Huỷ
            </Button>
            <Button color="primary">Xác nhận</Button>
          </div>
        </FormCustom>
      </CardBody>
    </Card>
  );
}

RegisterPostExchange.propTypes = {};

export default RegisterPostExchange;
