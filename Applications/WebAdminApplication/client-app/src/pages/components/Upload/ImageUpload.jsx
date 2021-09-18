import React, { useRef, useState } from 'react';
// used for making the prop types of this component
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import defaultImage from 'assets/img/image_placeholder.jpg';
import defaultAvatar from 'assets/img/placeholder.jpg';

export default function ImageUpload({
  avatar,
  changeBtnColor,
  changeBtnClasses,
  addBtnColor,
  addBtnClasses,
  removeBtnColor,
  removeBtnClasses,
}) {
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    avatar ? avatar : defaultImage,
  );

  function handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  }
  function handleClick() {
    fileInput.current.click();
  }
  function handleRemove() {
    setFile(null);
    setImagePreviewUrl(avatar ? avatar : defaultImage);
    fileInput.current.value = null;
  }

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={'thumbnail' + (avatar ? ' img-circle' : '')}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button
            color={addBtnColor}
            className={addBtnClasses}
            onClick={() => handleClick()}
          >
            {avatar ? 'Add Photo' : 'Select image'}
          </Button>
        ) : (
          <span>
            <Button
              color={changeBtnColor}
              className={changeBtnClasses}
              onClick={() => handleClick()}
            >
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button
              color={removeBtnColor}
              className={removeBtnClasses}
              onClick={() => handleRemove()}
            >
              <i className="fa fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.defaultProps = {
  avatar: false,
  removeBtnClasses: 'btn-round',
  removeBtnColor: 'danger',
  addBtnClasses: 'btn-round',
  addBtnColor: 'file',
  changeBtnClasses: 'btn-round',
  changeBtnColor: 'file',
};

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
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
