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
  register(data) {
    const { firstName, lastName, phoneNumber, birthDay, email, password } =
      data;
    return axios.post(API_URL + 'user', {
      firstName,
      lastName,
      phoneNumber,
      birthDay,
      email,
      password,
    });
  }
}

export default new AuthService();
