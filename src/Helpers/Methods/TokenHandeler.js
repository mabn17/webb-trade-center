import * as JWT from 'jwt-decode';

export const getToken = () => localStorage.getItem('userToken');
export const removeToken = () => localStorage.removeItem('userToken');
export const setToken = (value) => localStorage.setItem('userToken', value);
export const decodeToken = (token) => JWT(token) || null;

export const hasError = (value) => {
  if (typeof value === typeof ' ') return true;

  return false;
};

export const hasAuth = (token, props) => {
  if (token.exp < (new Date() / 1000)) {
    removeToken();
    props.history.push('/login');
  }
};
