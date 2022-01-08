/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
<<<<<<< Updated upstream
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Table,
} from 'reactstrap';
=======
import { Badge, Card, CardBody, CardHeader, Table } from 'reactstrap';
>>>>>>> Stashed changes
import userService from 'services/user.service';
function CardInfo({ userProfileId }) {
  const [userProfile, setUserProfile] = useState();
  const [error, setError] = useState(false);
  React.useEffect(() => {
    getUserProfile(userProfileId);
  }, []);
  function getUserProfile(userId) {
    userService.getUserProfile(userId).then((data) => {
      if (data.status === 400) {
        return;
      }
<<<<<<< Updated upstream
      if (data === 'Not active'){
=======
      if (data === 'Not active') {
>>>>>>> Stashed changes
        setError(true);
      }
      setUserProfile(data);
    });
  }

  return userProfile ? (
    <Card className="card-profile" style={{ marginBottom: 0 }}>
<<<<<<< Updated upstream
     {!error ? <>
        <CardHeader
        className="bg-info"
        style={{
          backgroundImage:
            'url(' + require('assets/img/ill/inn.svg').default + ')',
        }}
      >
        <div className="card-avatar">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="img img-raised rounded-circle"
              src={userProfile.avatarURL}
            ></img>
          </a>
        </div>
      </CardHeader>
      <CardBody>
        <h4 className="display-4">
          {userProfile.lastName} {userProfile.firstName}
        </h4>
        {/* <p className="lead mt-0 mb-1">Scrum Master</p> */}
        <Table className="tablesorter" responsive>
          <tbody>
            <tr>
              <td className="text-left pl-0">
                <Badge className="badge-circle mr-2" color="info">
                  <i className="fas fa-at"></i>
                </Badge>
                Email
              </td>
              <td className="text-right">{userProfile.email}</td>
            </tr>
            <tr>
              <td className="text-left pl-0">
                <Badge className="badge-circle mr-2" color="info">
                  <i className="fas fa-mobile-alt"></i>
                </Badge>
                Số điện thoại
              </td>
              <td className="text-right">{userProfile.phoneNumber}</td>
            </tr>
          </tbody>
        </Table>
      </CardBody>
      </> : 
      <h3 className='text-center m-4'> Tài khoản bạn đang giao dịch đã bị khóa! </h3>
     }
=======
      {!error ? (
        <>
          {' '}
          <CardHeader
            className="bg-info"
            style={{
              backgroundImage:
                'url(' + require('assets/img/ill/inn.svg').default + ')',
            }}
          >
            <div className="card-avatar">
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="img img-raised rounded-circle"
                  src={userProfile.avatarURL}
                ></img>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <h4 className="display-4">
              {userProfile.lastName} {userProfile.firstName}
            </h4>
            {/* <p className="lead mt-0 mb-1">Scrum Master</p> */}
            <Table className="tablesorter" responsive>
              <tbody>
                <tr>
                  <td className="text-left pl-0">
                    <Badge className="badge-circle mr-2" color="info">
                      <i className="fas fa-at"></i>
                    </Badge>
                    Email
                  </td>
                  <td className="text-right">{userProfile.email}</td>
                </tr>
                <tr>
                  <td className="text-left pl-0">
                    <Badge className="badge-circle mr-2" color="info">
                      <i className="fas fa-mobile-alt"></i>
                    </Badge>
                    Số điện thoại
                  </td>
                  <td className="text-right">{userProfile.phoneNumber}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </>
      ) : (
        <span>Tài khoản đã bị khoá</span>
      )}
>>>>>>> Stashed changes
    </Card>
  ) : (
    'null'
  );
}

CardInfo.propTypes = {};

export default CardInfo;
