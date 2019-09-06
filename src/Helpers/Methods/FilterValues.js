export const objToLowerCase = (obj) => {
  const newObj = Object.keys(obj)
    .reduce((n, k) => (n[k] = obj[k].toLowerCase(), n), {});

  return newObj;
};
