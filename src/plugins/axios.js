import axios from 'axios';

let baseURL = process.env.REACT_APP_API_URL;
// let baseURL = '//35.247.160.85:4435/api';

const tuaInstance = axios.create({
  baseURL,
});

export default tuaInstance;
