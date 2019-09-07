export const objToLowerCase = (obj) => {
  const ifString = (n, k, obj) => (n[k] = obj[k].toLowerCase(), n);
  const notString = (n, k, obj) => (n[k] = obj[k], n);
  const strType = typeof 'string';

  const newObj = Object.keys(obj)
    .reduce((n, k) => (typeof obj[k] === strType ? ifString(n, k, obj) : notString(n, k, obj)), {});

  return newObj;
};
