import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class UserService {
  getUserProfile(userId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `UserProfile/userId/${userId}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getUserProfileById(Id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `UserProfile/${Id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getUser(Id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `user/${Id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  updateUser(userId, data) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const { userName, email, phoneNumber } = data;
    return axios
      .put(
        API_URL + `User/${userId}`,
        {
          userName,
          email,
          phoneNumber,
        },
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  updateUserProfile(userId, data) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const { firstName, lastName, studentId } = data;
    return axios
      .put(
        API_URL + `UserProfile/${userId}`,
        {
          firstName,
          lastName,
          studentId,
        },
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  changeImageUser(userId, data) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `UserProfile/imageurl/${userId}`,
        {
          data,
        },
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new UserService();
