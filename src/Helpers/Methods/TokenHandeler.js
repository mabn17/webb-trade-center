import jwt_decode from 'jwt-decode';

/** global: localStorage */

export const getToken = () => localStorage.getItem('userToken');
export const removeToken = () => localStorage.removeItem('userToken');
export const setToken = (value) => localStorage.setItem('userToken', value);
export const decodeToken = (token) => jwt_decode(token) || null;

export const hasError = (value) => {
  if (typeof value === typeof ' ') return true;

  return false;
};

export const hasAuth = (token, props) => {
  if (!token) token = { exp: 1 };
  if (token.exp < (new Date() / 1000)) {
    removeToken();
    props.updateAll();
    props.history.push('/login');
  }
};
