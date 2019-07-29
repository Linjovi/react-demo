import axios from 'axios'
// const API_URL = "http://104.248.73.120:3000/api"
const API_URL = "http://localhost:3000/api"
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

instance.interceptors.request.use(
  config => {
    // do something before request is sent
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
