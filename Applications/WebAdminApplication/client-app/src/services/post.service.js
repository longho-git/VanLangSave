import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class PostService {
  getPostList() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Post/userId`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getPostListAdmin() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Post`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  deletePost(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .delete(API_URL + `Post/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  activePost(id, active) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(API_URL + `Post/active/${id}/${active}`, {}, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  createPost(data, listImage) {
    const { title, type, content } = data;
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .post(
        API_URL + `Post`,
        {
          title,
          type,
          content,
          ImagePostModelRqList: listImage,
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

export default new PostService();
