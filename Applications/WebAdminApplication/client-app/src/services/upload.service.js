import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class UploadService {
  postImage(file) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    formData.append('formFile', file);
    return axios
      .post(API_URL + `FileManager/uploadFileDefault`, formData, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  updateAvatar(file, id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const formData = new FormData();
    formData.append('formFile', file);
    return axios
      .post(API_URL + `FileManager/user/uploadAvatar/${id}`, formData, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new UploadService();
