import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class HomeService {
  getPostActive() {
    return axios
      .get(API_URL + 'Post/active')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new HomeService();
