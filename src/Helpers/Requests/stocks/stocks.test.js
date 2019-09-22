import {
  getStockHistory,
  handleError
} from './stocks';

/* global it expect */
it('Testing User-requests method', () => {
  const errOne = { response: { data: { errors: { detail: 'yes' } } } };
  const errTwo = { message: 'wrong' };

  expect(handleError(errOne)).toEqual('yes');
  expect(handleError(errTwo)).toEqual('Could not reach the server');
});

it('Testing Login request', () => {
  getStockHistory().then((data) => {
    expect(data).toEqual('Could not reach the server');
  });
});