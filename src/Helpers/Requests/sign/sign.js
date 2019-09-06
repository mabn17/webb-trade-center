import axios from 'axios';
import { objToLowerCase } from '../../Helpers/Methods/FilterValues';

const DETAULT_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
const register = `${DETAULT_URL}/register`;
const login = `${DETAULT_URL}/login`;

export const handleError = (e) => {
  if (e.response) return e.response.data.errors.detail;

  return 'Could not reach the server';
};

export const registerUser = (data, url = register, type = 'post') =>
  axios[type](url, objToLowerCase(data))
    .then((res) => res.data)
    .catch((e) => handleError(e));

export const signInUser = (data, url = login, type = 'post') =>
  axios[type](url, objToLowerCase(data))
    .then((res) => res.data.data)
    .catch((e) => handleError(e));
