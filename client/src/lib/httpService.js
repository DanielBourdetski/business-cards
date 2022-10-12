import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

function setAuthToken(JWT) {
  axios.defaults.headers.common['x-auth-token'] = JWT;
}

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setAuthToken,
};

export default httpService;
