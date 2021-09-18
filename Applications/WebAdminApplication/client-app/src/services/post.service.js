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

  getPostById(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Post/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getPostByCategoryId(categoryId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Post/category/${categoryId}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getPostByUserId() {
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

  getPostsWaitingAdmin() {
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
    const { title, type, content, quantity, condition, categoryId } = data;
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
          quantity,
          condition,
          categoryId,
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
