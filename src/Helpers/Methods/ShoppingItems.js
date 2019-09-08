/** global: localStorage */

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

export const removeItem = (value) => {
  const items = getItems();
  let counter = 0;

  const arr = items.items;

  // eslint-disable-next-line no-unused-vars
  for (const item of arr) {
    if (item.id === value.id) {
      arr.splice(counter, 1);
      break;
    }
    counter += 1;
  }

  setItems({ items: arr });
}