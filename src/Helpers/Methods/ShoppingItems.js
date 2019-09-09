/** global: localStorage */

// eslint-disable-next-line no-extend-native
Array.prototype.sum = function (prop, decimals = 2) {
  var total = 0
  for ( var i = 0, _len = this.length; i < _len; i++ ) {
      total += this[i][prop]
  }

  return Math.round(total * 100) / 100;
}

export const sumArr = (arr, prop) => (arr.sum(prop));

export const getItems = () => {
  let items = localStorage.getItem('shoppingItems');

  if (items) {
    return JSON.parse(items);
  }

  return { items: [] };
};
export const setItems = (value) => localStorage.setItem('shoppingItems', JSON.stringify(value));
export const removeItems = () => localStorage.removeItem('shoppingItems');

export const addItem = (value) => {
  let items = getItems();

  items.items.push(value);
  setItems(items);
}

export const removeItem = (value, shouldBreak = false) => {
  const items = getItems();
  let counter = 0;
  let removed = false;

  const arr = items.items;

  // eslint-disable-next-line no-unused-vars
  for (const item of arr) {
    if (item.id === value.id) {
      removed = arr.splice(counter, 1);
      break;
    }
    counter += 1;
  }

  if (shouldBreak) {
    return removed;
  }

  setItems({ items: arr });
  return false;
}