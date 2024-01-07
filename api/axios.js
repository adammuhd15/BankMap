import axios from 'axios';

const API_BASE_URL = "https://api.locationiq.com/v1";

const request = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function getData(response) {
  return response.data;
}

export default request;