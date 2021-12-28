import React, { useRef, useState } from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import { UncontrolledTooltip } from 'reactstrap';

import defaultImage from 'assets/img/image_placeholder.jpg';
import uploadService from 'services/upload.service';

export default function BackgroudUpload({
  checkBox,
  imageInit,
  onChange,
  mainPost,
  updateMainPost,
}) {
  // const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    imageInit ? imageInit : defaultImage,
  );
  const [check, setCheck] = useState(mainPost);
  function handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/jpg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/bmp' &&
      file.type !== 'image/gif'
    ) {
      alert('Vui lòng chọn file đuôi PNG, GIF, JPEG, JPG, TIF, etc.!!');
      return false;
    }
    reader.onloadend = () => {
      // setFile(file);

      handleSubmit(file);
    };
    reader.readAsDataURL(file);
  }
  function handleSubmit(file) {
    uploadService.postImage(file).then((req) => {
      onChange(req.value);
      setImagePreviewUrl(req.value);
    });
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  }
  function handleClick() {
    fileInput.current.click();
  }

  return (
    <div className="fileinput text-center" style={{ cursor: 'pointer' }}>
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        ref={fileInput}
      />
      <div
        className="thumbnail"
        onClick={() => handleClick()}
        id="tooltip601065234"
      >
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <UncontrolledTooltip delay={0} target="tooltip601065234">
        Upload
      </UncontrolledTooltip>
      {mainPost && (
        <div className="custom-control custom-checkbox mb-3">
          <input
            className="custom-control-input"
            id={`customCheck${checkBox}`}
            type="checkbox"
            defaultChecked={check}
            onChange={() => {
              updateMainPost(!check);
              setCheck(check);
            }}
          ></input>
          <label
            className="custom-control-label"
            htmlFor={`customCheck${checkBox}`}
          >
            <span>Ảnh chính</span>
          </label>
        </div>
      )}
    </div>
  );
}

BackgroudUpload.defaultProps = {
  imageInit: false,
  removeBtnClasses: 'btn-round',
  removeBtnColor: 'danger',
  addBtnClasses: 'btn-round',
  addBtnColor: 'file',
  changeBtnClasses: 'btn-round',
  changeBtnColor: 'file',
};

BackgroudUpload.propTypes = {
  imageInit: PropTypes.bool,
  removeBtnClasses: PropTypes.string,
  removeBtnColor: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'file',
  ]),
  addBtnClasses: PropTypes.string,
  addBtnColor: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'file',
  ]),
  changeBtnClasses: PropTypes.string,
  changeBtnColor: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'link',
    'file',
  ]),
};
