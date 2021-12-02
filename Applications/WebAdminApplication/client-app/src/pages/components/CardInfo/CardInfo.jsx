/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Row,
  Table,
} from 'reactstrap';
import userService from 'services/user.service';

function CardInfo({ userProfileId }) {
  console.log(
    '🚀 ~ file: CardInfo.jsx ~ line 15 ~ CardInfo ~ userProfileId',
    userProfileId,
  );
  const [userProfile, setUserProfile] = useState();
  React.useEffect(() => {
    getUserProfile(userProfileId);
  }, []);
  function getUserProfile(userId) {
    userService.getUserProfile(userId).then((data) => {
      console.log(
        '🚀 ~ file: CardInfo.jsx ~ line 17 ~ userService.getUserProfileById ~ data',
        data.avatarURL,
      );
      if (data.status === 400) {
        return;
      }
      setUserProfile(data);
    });
  }

  return userProfile ? (
    <Card className="card-profile" style={{ marginBottom: 0 }}>
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
    </Card>
  ) : (
    'null'
  );
}

CardInfo.propTypes = {};

export default CardInfo;
