import axios from 'axios';

const standardRequest = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Will need to be changed for prod
  withCredentials: true, // for cookies being sent with requests
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content'),
  },
});

export default standardRequest;
