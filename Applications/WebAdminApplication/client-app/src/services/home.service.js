import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class HomeService {
  getNewFeed() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + 'Post/active', config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new HomeService();
