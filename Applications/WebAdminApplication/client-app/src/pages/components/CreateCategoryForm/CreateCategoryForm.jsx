import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardHeader, CardBody, Col, CardTitle, Label, Spinner } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import Dropzone from 'dropzone';
import categoryService from 'services/category.service';
import uploadService from 'services/upload.service';

function CreateCategoryForm({ isClose }) {
  const [defaultValues, setDefaultValues] = useState({
    name: '',
    col: '',
  });
  const [imageURL, setimageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (data) => {
    const dt = { ...data, imageURL };
    if (imageURL) {
      console.log(dt);
      await categoryService.createCategory(dt).then((req) => {
        console.log(dt);
        if (req.status === 200) {
          isClose();
        } else {
          setError(true);
        }
      });
    }
  };
  useEffect(() => {
    console.log('run usefffct')
    let currentSingleFile = undefined;
    // single dropzone file - accepts only images
    const dropzone = new Dropzone(document.getElementById('dropzone-single'), {
      url: '/',
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer:
        document.getElementsByClassName('dz-preview-single')[0],
      previewTemplate:
        document.getElementsByClassName('dz-preview-single')[0].innerHTML,
      maxFiles: 1,
      acceptedFiles: 'image/*',
      init: function () {
        this.on('addedfile', function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          setLoading(true);
          currentSingleFile = file;
          uploadService.postImage(currentSingleFile).then((req) => {
            setimageURL(req.value);
            if (req.statusCode === 200) setLoading(false);
          });

        });
      },
    });
    // document.getElementsByClassName('dz-preview-single')[0].innerHTML = '';
  }, []);
  return (
    <>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0 mb-0">
          {
            loading && <Spinner color="" type={'border'} size="sm"></Spinner>
          }
          <CardHeader className="bg-white pb-5">
            <CardTitle tag="h3">Thêm mới danh mục</CardTitle>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <FormCustom onSubmit={onSubmit} defaultValues={defaultValues}>
              <InputCustom
                name="name"
                label="Tên loại"
                maxLength="50"
                rules={{
                  required: 'Vui lòng không bỏ trống',
                }}
              />
              <Col md={12}>
                <Label>Hình ảnh</Label>
                <div
                  className="dropzone dropzone-single mb-3"
                  id="dropzone-single"
                >
                  <div className="fallback">
                    <div className="custom-file">
                      <input
                        className="custom-file-input"
                        id="projectCoverUploads"
                        type="file"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="projectCoverUploads"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div className="dz-preview dz-preview-single">
                    <div className="dz-preview-cover">
                      <img
                        alt="..."
                        className="dz-preview-img"
                        data-dz-thumbnail=""
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Button className="mt-3" color="primary">
                Thêm danh mục
              </Button>
            </FormCustom>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

CreateCategoryForm.propTypes = {};

export default CreateCategoryForm;
