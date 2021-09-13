import axios from 'axios';

export async function get(url) {
  const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + url);
  return response.data;
}

export async function post(url, data) {
  try {
    return axios
      .post(process.env.REACT_APP_API_ENDPOINT + url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(function (response) {
        console.log(response.data);
        // I need this data here ^^
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return undefined;
  }
}
