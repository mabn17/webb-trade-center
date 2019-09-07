import { validateEmail } from '../email';

/* global it expect */

it('Testing validateEmail method with correct email', () => {
  const email = 'test@domain.com';

  expect(validateEmail(email)).toEqual(true);
});

it('Testing validateEmail method with incorrect emails', () => {
  const mailOne = 'test';
  const mailTwo = 'test@test';
  const mailThree = 't@t.t';

  expect(validateEmail(mailOne)).toEqual(false);
  expect(validateEmail(mailTwo)).toEqual(false);
  expect(validateEmail(mailThree)).toEqual(false);
});
