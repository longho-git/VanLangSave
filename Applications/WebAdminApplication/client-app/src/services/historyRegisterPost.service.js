import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

class HistoryRegisterPostService {
  getHistoryRegisterPost() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `HistoryRegisterPost`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getHistoryRegisterAllManagerPost() {
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(API_URL + `HistoryRegisterPost/manager`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getStatics(fromDate, toDate) {
    console.log(
      '🚀 ~ file: historyRegisterPost.service.js ~ line 37 ~ HistoryRegisterPostService ~ getStatics ~ toDate',
      toDate,
    );
    console.log(
      '🚀 ~ file: historyRegisterPost.service.js ~ line 37 ~ HistoryRegisterPostService ~ getStatics ~ fromDate',
      fromDate,
    );
    const token = localStorage.getItem('token');
    const accessToken = JSON.parse(token);
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    return axios
      .get(
        API_URL + `HistoryRegisterPost/statics/${fromDate}/${toDate}`,
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

export default new HistoryRegisterPostService();
