import React, { useState } from 'react';
// nodejs library that concatenates classes
// reactstrap components
import { Button, Card, CardBody, Row, Col } from 'reactstrap';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import authService from 'services/auth.service';

// core components

function CreateAccountManager({ isClose }) {
  const [defaultValues, setDefaultValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(false);
  const onSubmit = (data) => {
    authService.createManagerUser(data).then((req) => {
      if (req.status === 200) {
        isClose();
      } else {
        setError(true);
      }
    });
  };

  return (
    <Card className=" border-0">
      <CardBody className="px-lg-5 py-lg-5">
        <div className="text-center text-muted mb-4">
          <h1>Tạo tài khoản </h1>
        </div>
        {error && (
          <p class="description text-danger">
            Có lỗi trong quá trình tạo tài khoản
          </p>
        )}
        <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
          <InputCustom
            name="lastName"
            placeholder="Nguyễn, Phạm,..."
            label="Họ"
            icon={<i className="ni ni-hat-3" />}
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <InputCustom
            name="firstName"
            placeholder="Đức,Khang,..."
            label="Tên"
            icon={<i className="ni ni-hat-3" />}
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <InputCustom
            name="birthDay"
            placeholder="31/03/1999"
            label="Ngày sinh"
            type="date"
            icon={<i className="ni ni-hat-3" />}
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <InputCustom
            name="phoneNumber"
            placeholder="0395713100"
            label="số điện thoại"
            type="tel"
            icon={<i className="ni ni-email-83" />}
            rules={{
              required: 'Vui lòng không bỏ trống',
              pattern: {
                value: /[0-9]{9,12}/,
                message: 'Vui lòng nhập đúng định dạng số',
              },
            }}
          />
          <InputCustom
            name="email"
            placeholder="ABC@gmail.com"
            label="Email"
            icon={<i className="ni ni-email-83" />}
            rules={{
              required: 'Vui lòng không bỏ trống',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Giá trị nhập không đúng(vd:ABC@gmail.com)',
              },
            }}
          />

          <div className="text-center">
            <Button className="mt-4" color="info">
              Tạo tài khoản
            </Button>
          </div>
        </FormCustom>
      </CardBody>
    </Card>
  );
}

export default CreateAccountManager;
