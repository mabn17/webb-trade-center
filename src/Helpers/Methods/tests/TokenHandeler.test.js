import {
  getToken, removeToken, setToken, hasError, hasAuth, decodeToken
} from '../TokenHandeler';

/* global it expect localStorage */

it('Testing Accsess method', () => {
  localStorage.removeItem('userToken');
  expect(getToken()).toBeFalsy();

  const value = 'test';

  setToken(value);
  expect(getToken()).toEqual(value);

  removeToken();
  expect(getToken()).toBeFalsy();
});

it('Testing Accsess error method', () => {
  expect(hasError(undefined)).toEqual(false);
  expect(hasError(null)).toEqual(false);
  expect(hasError(1)).toEqual(false);
  expect(hasError({})).toEqual(false);

  expect(hasError('1')).toEqual(true);
  expect(hasError(' ')).toEqual(true);
  expect(hasError('test')).toEqual(true);
});

it('Testing Decode method', () => {
  const tokenOne = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  const answerOne = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
  };

  expect(decodeToken(tokenOne)).toEqual(answerOne);
});

it('Testing hasAuth method', () => {
  const props = {
    updateAll: function() { return undefined },
    history: {
      push: function(location) { return location },
    }
  };

  const tokenOne = { exp: (new Date() / 10000) };
  const tokenTwo = { exp: new Date() };

  expect(hasAuth(tokenOne, props)).toEqual(undefined);
  expect(hasAuth(tokenTwo, props)).toEqual(undefined);
  expect(hasAuth(null, props)).toEqual(undefined);
});
