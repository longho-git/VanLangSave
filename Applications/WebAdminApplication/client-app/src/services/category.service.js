import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class CategoryService {
  updateCategory(data, image) {
    const { name, col } = data;
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `Category/${data.id}`,
        {
          name,
          col,
          imageURL: image,
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
  getCategoryById(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Category/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getCategoryByUserId() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Category/userId`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getCategories() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `Category`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  deleteCategory(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .delete(API_URL + `Category/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  createCategory(data, image) {
    const { name,
      col} = data;
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .post(
        API_URL + `Category`,
        {
        name,
        imageURL: image,
        col
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

export default new CategoryService();
