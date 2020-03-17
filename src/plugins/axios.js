import axios from 'axios';

const tuaInstance = axios.create({
  baseURL: 'http://127.0.0.1:4435/api',
});

export default tuaInstance;
