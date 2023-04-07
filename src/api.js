import axios from 'axios';
const baseUrl2 = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: `${baseUrl2}`,
});

export default api;
