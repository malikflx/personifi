import axios from 'axios';

const standardRequest = axios.create({
  baseURL: 'http://localhost:3000', // Will need to be changed for prod
  withCredentials: true, // for cookies being sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default standardRequest;