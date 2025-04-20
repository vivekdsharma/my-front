import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // replace with your backend URL if hosted
  withCredentials: true // if you're using cookies for auth, else skip
});

export default api;
