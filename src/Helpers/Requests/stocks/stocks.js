import axios from 'axios';

const DETAULT_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const allStocks = `${DETAULT_URL}/stocks`;

export const handleError = (e) => {
  if (e.response) return e.response.data.errors.detail;

  return 'Could not reach the server';
};

export const getAllStocks = (data, url = allStocks, type = 'get') =>
  axios[type](url, data)
    .then((res) => res.data)
    .catch((e) => handleError(e));

