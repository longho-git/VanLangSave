import React from 'react';

// reactstrap components
import { Modal, ModalBody } from 'reactstrap';

function ViewMessage({ open = false, handleModal, message }) {
  const handleClose = () => {
    handleModal(!open);
  };

  return (
    <>
      <Modal toggle={() => handleClose()} isOpen={open}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            Lý do bị từ chối
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
        <ModalBody>{message}</ModalBody>
      </Modal>
    </>
  );
}

export default ViewMessage;
