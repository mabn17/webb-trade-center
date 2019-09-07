import { validatePassLen, comparePass, compareAndValidate } from '../password';

/* global it expect */

it('Testing validatePassLen method with correct values', () => {
  const pass = 'pass';
  const len = 4;

  expect(validatePassLen(pass, len)).toEqual(true);
});

it('Testing validatePassLen method with incorrect values', () => {
  const email = 'pa';

  expect(validatePassLen(email)).toEqual(false);
});

it('Testing comparePass method with correct values', () => {
  const passOne = 'pa';
  const passTwo = 'pa';

  expect(comparePass(passOne, passTwo)).toEqual(true);
});

it('Testing comparePass method with incorrect values', () => {
  const passOne = 'pa';
  const passTwo = 'pas';

  expect(comparePass(passOne, passTwo)).toEqual(false);
});

it('Testing compareAndValidate method with all correct outcomes', () => {
  const passOne = 'pass';
  const passTwo = 'pass';

  expect(compareAndValidate(passOne, passTwo)).toEqual([true, ""]);
});

it('Testing compareAndValidate method with all incorrect outcomes', () => {
  const passOne = 'pass';
  const passTwo = 'pas';
  const passThree = 'pas';

  expect(compareAndValidate(passOne, passTwo)).toEqual([false, "Passwords does not match."]);
  expect(compareAndValidate(passTwo, passOne)).toEqual([false, "Passwords does not match."]);
  expect(compareAndValidate(passTwo, passThree)).toEqual([false, "Password has to be atleast 4 characters long."]);
});