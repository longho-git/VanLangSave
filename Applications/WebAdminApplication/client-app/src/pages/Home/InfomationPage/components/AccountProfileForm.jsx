import React, { useState } from 'react';
// JavaScript library for creating Dropdown Selects
// reactstrap components
import { Button, Row, Col, Spinner } from 'reactstrap';
import { FormCustom } from 'layouts/component/SmartFormHook/FormCustom/FormCustom';
import InputCustom from 'layouts/component/SmartFormHook/InputCustom/InputCustom';
import { SelectCustom } from 'layouts/component/SmartFormHook/SelectCustom/SelectCustom';
import userService from 'services/user.service';
import { useSelector } from 'react-redux';
import ImageUpload from 'pages/components/Upload/ImageUpload';

// Core Components

function AccountProfileForm() {
  const [submit, setSubmit] = useState(false);
  const [edit, setEdit] = useState(false);
  const [avatarURL, setAvatarURL] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const userProfile = useSelector((state) => state.login.userProfile);
  function getUserProfile(acountId) {
    userService.getUserProfileById(acountId).then((data) => {
      if (data.status === 400) {
        return;
      }
      setAvatarURL(data.avatarURL);
      setDefaultValues(data);
    });
  }
  React.useEffect(() => {
    getUserProfile(userProfile.id);
  }, [userProfile.id]);
  const onSubmit = async (data) => {
    setSubmit(true);
    userService.updateUserProfile(userProfile.id, data).then((req) => {
      if (req.status === 400) {
        return;
      }
      setEdit(false);
      getUserProfile(userProfile.id);
      setSubmit(false);
    });
  };
  return (
    <>
      <div>
        <header>
          <h2 className="text-uppercase">
            Thông tin chung{' '}
            {!edit && (
              <Button
                className="btn-text"
                color="link"
                data-placement="top"
                id="tooltip558026681"
                type="button"
                onClick={() => setEdit(true)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            )}
          </h2>
        </header>
        <hr
          className="line-primary"
          style={{
            width: '100%',
            height: 0,
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        ></hr>
        <br></br>
        {edit && (
          <ImageUpload
            avatar={avatarURL}
            userProfileId={userProfile.id}
            callBack={() => setEdit(false)}
          />
        )}
        <FormCustom
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          className="row"
        >
          <InputCustom
            name="lastName"
            placeholder="Nguyễn, Phạm,..."
            maxLength="20"
            col={6}
            label="Họ"
            disabled={!edit}
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <InputCustom
            name="firstName"
            placeholder="Nam, Khang, Đức, Hồ,..."
            maxLength="50"
            col={4}
            disabled={!edit}
            label="Tên"
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <SelectCustom
            name="sex"
            disabled={!edit}
            label="Giới tính"
            col={2}
            options={[
              {
                name: 'Nam',
                id: 1,
              },
              {
                name: 'Nữ',
                id: 0,
              },
            ]}
          />

          <InputCustom
            name="address"
            placeholder="1/1/1 Cao chiêm"
            maxLength="100"
            disabled={!edit}
            label="Địa chỉ"
            rules={{
              required: 'Vui lòng không bỏ trống',
            }}
          />
          <InputCustom
            name="email"
            placeholder="email"
            col={6}
            disabled={!edit}
            label="ABC@gmail.com"
            rules={{
              required: 'Vui lòng không bỏ trống',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Giá trị nhập không đúng(vd:ABC@gmail.com)',
              },
            }}
          />
          <InputCustom
            name="phoneNumber"
            disabled={!edit}
            placeholder="0793174711"
            col={6}
            label="Số điện thoại"
            rules={{
              required: 'Vui lòng không bỏ trống',
              pattern: {
                value: /[0-9]{9,12}/,
                message: 'Vui lòng nhập đúng định dạng',
              },
            }}
          />
          <Col md="6">
            {submit ? (
              <Button
                className="mb-2"
                color="primary"
                size="lg"
                block
                type="button"
              >
                <Spinner color="" type={'border'} size="sm"></Spinner>{' '}
                Loading...
              </Button>
            ) : (
              <>
                <Button color="primary" disabled={!edit} type="submit">
                  Chỉnh sửa
                </Button>
                <Button
                  color="primary"
                  disabled={!edit}
                  onClick={() => setEdit(false)}
                  outline
                  type="reset"
                >
                  Huỷ
                </Button>
              </>
            )}
          </Col>
        </FormCustom>
      </div>
    </>
  );
}

export default AccountProfileForm;
