import axios from 'axios';
const API_URL = process.env.REACT_APP_API_ENDPOINT;

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'auth/signin', { username, password })
      .then((response) => {
        // if (response.data.accessToken) {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }
  loginMSA(data) {
    const { firstName, lastName, email, uniqueId } = data;
    return axios.post(API_URL + 'user', {
      firstName,
      lastName,
      email,
      uniqueId,
    })
    .catch((error) => {
      return error.response;
    });
  }

  createManagerUser(data) {
    const { firstName, lastName, phoneNumber, birthDay, email } = data;
    return axios
      .post(API_URL + 'user/manager/create', {
        firstName,
        lastName,
        phoneNumber,
        birthDay,
        email,
      })
      .then((response) => {
        // if (response.data.accessToken) {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default new AuthService();
