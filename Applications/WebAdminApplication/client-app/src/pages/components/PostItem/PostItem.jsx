/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Media,
  Row,
  Col,
  UncontrolledTooltip,
  CardFooter,
} from 'reactstrap';
import postService from 'services/post.service';
import { formatTime } from 'utils/fortmatTime';
import { ReactBSAlert } from 'react-bootstrap-sweetalert';

// Core Components
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      {text.length > 150 && (
        <a onClick={toggleReadMore} className="text-primary">
          {isReadMore ? <>...Xem thêm</> : '  Thu gọn'}
        </a>
      )}
    </p>
  );
};

function PostItem({ item }) {
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
        Bài viết của bạn đã xoá.
      </ReactBSAlert>,
    );
  };
  const confirmAlert = (id) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Bạn có chắc?"
        onCancel={() => setAlert(null)}
        onConfirm={() => deletePost(id)}
        showCancel
        confirmBtnBsStyle="danger"
        cancelBtnText="Huỷ"
        cancelBtnBsStyle="secondary"
        confirmBtnText="Vâng, chắn chắn!"
        btnSize=""
      >
        Bạn sẽ không thể phục hồi khi thực hiện!
      </ReactBSAlert>,
    );
  };
  const deletePost = (id) => {
    postService.deletePost(id).then((req) => {
      if (req) {
        confirmedAlert();
      }
    });
  };
  return (
    <>
      {alert}
      <Card>
        <CardHeader className="d-flex align-items-center">
          <h5 className="h3 mb-0">
            {item.title}
            <div className="stats stats-left opacity-5">
              <i className="ni ni-watch-time"></i>
              {formatTime(item.createdDate)}
            </div>
          </h5>
          <div className="d-flex align-items-center text-right ml-auto">
            <h5 className="h5 mb-0 "> {item.statusName}</h5>|
            <h5 className="h4 mb-0 text-uppercase text-warning">
              {' '}
              {item.typeName}
            </h5>
          </div>
        </CardHeader>
        <CardHeader className="d-flex align-items-center">
          <div className="d-flex align-items-center ">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img
                alt="..."
                style={{ width: 80, height: 80 }}
                src={item.imageMain}
              ></img>
            </a>
            <div className="mx-3">
              <a
                className="text-dark font-weight-600 text-sm"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                {item.categoryName}
              </a>
              <small className="d-block text-muted">{item.conditionName}</small>
              <small className="d-block text-muted">x{item.quantity}</small>
            </div>
          </div>
          <div className="text-right ml-auto">
            <Button
              className="btn-icon"
              color="primary"
              size="sm"
              type="button"
            >
              <span className="btn-inner--icon icon-big">
                <i className="ni ni-fat-add"></i>
              </span>
              <span className="btn-inner--text">Follow</span>
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <p className="mb-4">
            <ReadMore>{item.content}</ReadMore>
          </p>
          <div className="mb-1"></div>
        </CardBody>
        <CardFooter>
          <div className="stats stats-right ">
            {(item.statuts !== 2 || item.statuts !== 5) && (
              <Button
                color="danger"
                type="button"
                onClick={(e) => confirmAlert(item.id)}
              >
                Xoá bài đăng
              </Button>
            )}
            <Button color={'primary'} type="button">
              primary
            </Button>
            <Button color={'primary'} type="button">
              primary
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default PostItem;
