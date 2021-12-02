import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class RegisterPostExchangeService {
  createRegisterPostExchange(data) {
    const { remark, postId, postExchangeId } = data;
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .post(
        API_URL + `RegisterPostExchange`,
        {
          remark,
          postId,
          postExchangeId,
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

  getPostExchangeByPostId(postId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `RegisterPostExchange/PostId/${postId}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  countExchangeDone(userRegisterId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(
        API_URL + `RegisterPostExchange/done/UserRegisterId/${userRegisterId}`,
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getPostExchangeByUserRegisterId(userRegisterId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(
        API_URL + `RegisterPostExchange/UserRegisterId/${userRegisterId}`,
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  deleteRegisterPostExchange(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .delete(API_URL + `RegisterPostExchange/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  acceptRegisterPostExchangeByOwner(id, postExchangeId) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `RegisterPostExchange/owner/accept/${id}/${postExchangeId}`,
        {},
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  acceptRegisterPostExchangeByUserRegister(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `RegisterPostExchange/userRegister/accept/${id}`,
        {},
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  rejectedRegisterPostExchangeByOwner(id, msg) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `RegisterPostExchange/owner/reject/${id}`,
        { message: msg },
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  rejectedRegisterPostExchangeByUserRegister(id, msg) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `RegisterPostExchange/userRegister/reject/${id}`,
        { message: msg },
        config,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  hiddenRegisterPostExchange(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(API_URL + `RegisterPostExchange/hidden/${id}`, {}, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }

  uploadRegisterPostExchange(data, listImage) {
    const { title, type, content, quantity, condition, categoryId } = data;
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .put(
        API_URL + `RegisterPostExchange/${data.id}`,
        {
          title,
          type,
          content,
          quantity,
          condition,
          categoryId,
          ImageRegisterPostExchangeModelRqList: listImage,
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
  deletePost(id) {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .delete(API_URL + `RegisterPostExchange/${id}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new RegisterPostExchangeService();
