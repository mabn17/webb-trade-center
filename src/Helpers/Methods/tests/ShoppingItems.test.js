import {
  getItems,
  setItems,
  removeItems,
  addItem,
  removeItem,
  sumArr
} from '../ShoppingItems';

/* global it expect localStorage */
/** global: localStorage */

const defaultValue = { items: [] };
const extraItem = { items: ['hello'] };
const addedOnExtraItem = { items: ['hello', 'world'] };
const objValues = { items: [{ id: 1 }, { id: 1 }, { id: 2 }] };
const corrOne = { items: [{ id: 1 }, { id: 2 }] };
const corrTwo = { items: [{ id: 1 }] };

it('Testing getItems method', () => {
  localStorage.removeItem('shoppingItems');
  expect(getItems()).toEqual(defaultValue);

  localStorage.setItem('shoppingItems', JSON.stringify(extraItem));
  expect(getItems()).toEqual(extraItem);
  localStorage.removeItem('shoppingItems');
});

it('Testing setItems method', () => {
  setItems(extraItem);
  expect(getItems()).toEqual(extraItem);

  localStorage.removeItem('shoppingItems');
});

it('Testing removeItems method', () => {
  setItems(extraItem);
  removeItems();

  expect(getItems()).toEqual(defaultValue);
  localStorage.removeItem('shoppingItems');
});

it('Testing addItem method', () => {
  setItems(extraItem);
  addItem('world');

  expect(getItems()).toEqual(addedOnExtraItem);
  localStorage.removeItem('shoppingItems');
});

it('Testing removeItem method', () => {
  setItems(objValues);

  removeItem({ id: 1 });
  expect(getItems()).toEqual(corrOne);

  removeItem({ id: 2 });
  expect(getItems()).toEqual(corrTwo);

  localStorage.removeItem('shoppingItems');
  setItems(objValues);
  expect(removeItem({ id: 1 }, true)).toEqual([{"id": 1}]);
  localStorage.removeItem('shoppingItems');
});

it('Testing sumArr method', () => {
  const numberArr = [{ price: 1 }, { price: null }, { price: 2 }, { price: 3 }];
  const answer = 1 + 2 + 3;

  expect(sumArr(numberArr, 'price')).toEqual(answer);
});
