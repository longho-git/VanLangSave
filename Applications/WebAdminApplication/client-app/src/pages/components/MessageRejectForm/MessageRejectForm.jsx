import React, { useState } from 'react';

// reactstrap components
import { Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';

function MessageRejectForm({ open = false, handleModal, hanldeAction }) {
  const [message, setMessage] = useState(null);
  const handleClose = () => {
    handleModal(!open);
  };
  const action = () => {
    hanldeAction(message);
    handleClose();
  };
  return (
    <>
      <Modal toggle={() => handleClose()} isOpen={open}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Lý do huỷ
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => handleClose()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <Input
            aria-label="Last name"
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" type="button" onClick={() => handleClose()}>
            Đóng
          </Button>
          <Button color="primary" type="button" onClick={() => action()}>
            Gửi
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MessageRejectForm;
