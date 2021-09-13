/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import { FormHook } from 'components/Form';
import React, { useEffect, useState } from 'react';
import InpuxText from 'components/Form/InputText';
import { Button } from 'reactstrap';
import userService from 'services/user.service';
import { useDispatch } from 'react-redux';
import { storeUserProfile } from 'views/pages/auth/Login/Login.actions';
import ReactBSAlert from 'react-bootstrap-sweetalert';

function UserSetting({ edit, userId, setEdit }) {
  const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState({});
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const confirmedAlert = () => {
    setAlert(
      <ReactBSAlert
        success
        style={{ display: 'block', marginTop: '-100px' }}
        title="Thành công!"
        onConfirm={() => setAlert(null)}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="primary"
        confirmBtnText="Ok"
        btnSize=""
      >
        Cập nhật thành công.
      </ReactBSAlert>,
    );
  };
  function getUser(acountId) {
    userService.getUser(acountId).then((data) => {
      if (data.status === 400) {
        setError(data.data.message);
        return;
      }
      setDefaultValue(data);
    });
  }
  const onSubmit = (data) => {
    userService.updateUser(userId, data).then((req) => {
      if (req.status === 400) {
        setError(req.data.message);
        return;
      }
      userService.getUserProfileById(req).then((data) => {
        dispatch(storeUserProfile(data));
        setEdit(false);
        confirmedAlert();
      });
    });
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);
  return (
    <>
      {alert}
      <FormHook onSubmit={onSubmit} defaultValues={defaultValue}>
        <InpuxText
          name="userName"
          disabled={edit ? false : true}
          label="Tài khoản"
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <InpuxText
          name="email"
          placeholder="Nguyễn, Lê,..."
          label="Email"
          disabled={edit ? false : true}
          rules={{
            required: 'Vui lòng không bỏ trống',
            pattern: {
              value:
                /^([a-zA-Z0-9]+[a-zA-Z0-9\.]*[a-zA-Z0-9]+)@(vanlanguni)\.(vn)$/,
              message:
                'Vui lòng dùng email của văn lang có định dạng @vanlanguni.vn',
            },
          }}
        />
        <InpuxText
          name="phoneNumber"
          disabled={edit ? false : true}
          label="Số điện thoại"
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <Button
          className="mr-4"
          color="info"
          size="sm"
          disabled={edit ? false : true}
        >
          Lưu
        </Button>
      </FormHook>
    </>
  );
}

export default UserSetting;
