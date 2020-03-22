import axios from 'axios';

let baseURL = '//127.0.0.1:4435/api';
// let baseURL = '//35.247.160.85:4435/api';
if (process.env.NODE_ENV === 'production') {
  baseURL = '/api';
}

const tuaInstance = axios.create({
  baseURL,
});

export default tuaInstance;
