import { objToLowerCase } from '../FilterValues';

/* global it expect */
it('Testing Filter Object-to-lowecase method with string values', () => {
  const dataOne = { email: 'Haiasd2138Srts', passWord: 'QEsT' };
  const currectOne = { email: 'haiasd2138srts', passWord: 'qest' };
  const filteredOne = objToLowerCase(dataOne);

  expect(filteredOne).toEqual(currectOne);
});

it('Testing Filter Object-to-lowecase method with non string values', () => {
  const dataOne = { email: 1, passWord: null };
  const currectOne = { email: 1, passWord: null };
  const filteredOne = objToLowerCase(dataOne);

  expect(filteredOne).toEqual(currectOne);
});
