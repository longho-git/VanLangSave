import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardHeader, Row } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import BackgroudUpload from '../Upload/BackgroudUpload';
import categoryService from 'services/category.service';

function CategoryDialog({ item, closeDialog }) {
  const [defaultValues, setDefaultValues] = useState(item);
  const [image, setImage] = useState(item.imageURL);
  const onSubmit = (data) => {
    categoryService.updateCategory(data, image).then((data) => {
      if (data.status === 400) {
        return;
      } else {
        closeDialog();
      }
    });
  };
  return (
    <div>
      <Card className="bg-secondary border-0">
        <CardHeader className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <h4 className="display-4">Chỉnh sửa</h4>
          </div>
        </CardHeader>
        <CardBody className="bg-white">
          <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
            <InputCustom
              name="name"
              placeholder="Tên danh mục"
              label="Tên danh mục"
              rules={{
                required: 'Vui lòng không bỏ trống',
              }}
            />
            <BackgroudUpload
              onChange={(src) => setImage(src)}
              imageInit={image}
            />
            <Button block color="primary">
              Lưu
            </Button>
          </FormCustom>
        </CardBody>
      </Card>
    </div>
  );
}

CategoryDialog.propTypes = {};

export default CategoryDialog;
