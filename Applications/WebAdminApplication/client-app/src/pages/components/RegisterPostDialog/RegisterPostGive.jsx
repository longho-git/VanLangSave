import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import registerPostGiveService from 'services/registerPostGive.service';
function RegisterPostGive({ closeModal, postId }) {
  const [defaultValues, setDefaultValues] = useState({
    remark: '',
    postId: postId,
  });
  const onSubmit = (data) => {
    registerPostGiveService.createRegisterPostGive(data).then((req) => {
      closeModal();
    });
  };

  return (
    <>
      <Card className="bg-secondary border-0 ">
        <CardHeader className="d-flex align-items-center">
          <h5 className="display-4 text-center">Đăng ký nhận</h5>
        </CardHeader>
        <CardBody className="bg-white align-items-center">
          <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
            <InputCustom
              name="remark"
              textarea
              placeholder="Ghi chú đăng ký"
              label="Ghi chú đăng ký"
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
    </>
  );
}

RegisterPostGive.propTypes = {};

export default RegisterPostGive;
