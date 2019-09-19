import axios from 'axios';

const DETAULT_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const allStocks = `${DETAULT_URL}/stocks`;
const personalStocks = `${DETAULT_URL}/stocks/user`;
const updatedInfo = `${DETAULT_URL}/user/self`;

export const handleError = (e) => {
  if (e.response) return e.response.data.errors.detail;

  return 'Could not reach the server';
};

export const getAllStocks = (data, url = allStocks, type = 'get') =>
  axios[type](url, data)
    .then((res) => res.data)
    .catch((e) => handleError(e));

export const getPersonalStocks = (token, url = personalStocks, type = 'get') =>
  axios[type](url, { headers: { 'x-access-token': token } })
  .then((res) => res.data.data)
  .catch((e) => handleError(e));

export const getUpdatedInfo = (token, url = updatedInfo, type = 'get') =>
  axios[type](url, { headers: { 'x-access-token': token } })
  .then((res) => res.data.data)
  .catch((e) => handleError(e));
