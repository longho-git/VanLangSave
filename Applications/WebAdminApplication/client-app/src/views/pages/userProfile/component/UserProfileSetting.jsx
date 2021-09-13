/* eslint-disable no-unused-vars */
import { FormHook } from 'components/Form';
import React, { useEffect, useState } from 'react';
import InpuxText from 'components/Form/InputText';
import { Button } from 'reactstrap';
import userService from 'services/user.service';
import { useDispatch } from 'react-redux';
import { storeUserProfile } from 'views/pages/auth/Login/Login.actions';
import ReactBSAlert from 'react-bootstrap-sweetalert';

function UserProfileSetting({ edit, userId, userProfileId, setEdit }) {
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
  function getUserProfile(acountId) {
    userService.getUserProfile(acountId).then((data) => {
      if (data.status === 400) {
        setError(data.data.message);
        return;
      }
      setDefaultValue(data);
    });
  }
  const onSubmit = (data) => {
    userService.updateUserProfile(userProfileId, data).then((req) => {
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
    getUserProfile(userId);
  }, [userId]);
  return (
    <>
      {alert}
      <FormHook onSubmit={onSubmit} defaultValues={defaultValue}>
        <InpuxText
          name="firstName"
          placeholder="Hùng,Tùng,..."
          label="Tên"
          icon={<i className="ni ni-hat-3" />}
          disabled={edit ? false : true}
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <InpuxText
          name="lastName"
          placeholder="Nguyễn, Lê,..."
          label="Họ"
          disabled={edit ? false : true}
          icon={<i className="ni ni-hat-3" />}
          rules={{
            required: 'Vui lòng không bỏ trống',
          }}
        />
        <InpuxText
          name="studentId"
          disabled={edit ? false : true}
          label="Mã số sinh viên"
          icon={<i className="ni ni-hat-3" />}
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

export default UserProfileSetting;
