const { createObj, arrayToObject } = require('../src/csvToObject.js');
const assert = require('assert');

describe('createObj', () => {
  it('Should return an object with all string values', () => {
    const headers = ['name', 'symbol', 'sector'];
    const record = ['TCS', 'TCS', 'IT'];
    const expected = { name: 'TCS', symbol: 'TCS', sector: 'IT' };
    assert.deepStrictEqual(createObj(headers, record), expected);
  });
  it('Should return an object with all numeric values', () => {
    const headers = ['english', 'hindi', 'maths'];
    const record = [56, 87, 98];
    const expected = { english: 56, hindi: 87, maths: 98 };
    assert.deepStrictEqual(createObj(headers, record), expected);
  });
  it('Should return an object with numeric and string values', () => {
    const headers = ['name', 'price', 'symbol'];
    const record = ['TCS', 3600, 'TCS'];
    const expected = { name: 'TCS', price: 3600, symbol: 'TCS' };
    assert.deepStrictEqual(createObj(headers, record), expected);
  });
});

describe('arrayToObject', () => {
  it('Should create an array of object with delimiter as ","', () => {
    const headers = ['name,price,symbol', 'TCS,3600,TCS'];
    const delimiter = ',';
    const expected = [
      { name: 'name', price: 'price', symbol: 'symbol' },
      { name: 'TCS', price: 3600, symbol: 'TCS' }
    ];
    assert.deepStrictEqual(arrayToObject(headers, delimiter), expected);
  });
  it('Should create an array of object with delimiter as "|"', () => {
    const headers = ['name|price|symbol', 'TCS|3600|TCS'];
    const delimiter = '|';
    const expected = [
      { name: 'name', price: 'price', symbol: 'symbol' },
      { name: 'TCS', price: 3600, symbol: 'TCS' }
    ];
    assert.deepStrictEqual(arrayToObject(headers, delimiter), expected);
  });
});
