export const validatePassLen = (pass, len = 4) => {
  const passSize = pass.length;

  if (passSize < len) return false;
  return true;
};

export const comparePass = (passOne, passTwo) => (passOne === passTwo);

export const compareAndValidate = (passOne, passTwo, len = 4) => {
  let message = '';
  let didPass = true;

  if (!comparePass(passOne, passTwo)) {
    message = 'Passwords does not match.';
    didPass = false;
  } else if (!validatePassLen(passOne, len)) {
    message = `Password has to be atleast ${len} characters long.`;
    didPass = false;
  }

  return [didPass, message];
}
