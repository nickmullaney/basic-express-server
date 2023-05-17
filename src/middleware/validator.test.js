`use strict`;

//Can use just . in order to test and require the index file and only the index file
const validator = require('./validator');
//same thing
//const validator = require('./index');

describe('Validator middleware', () => {
  // This mocks some data for you
  // let req = {query: {name: 'Nick'}};
  let req = {};
  let res = {};
  //This "mocks" the next function
  let next = jest.fn();

  // This tests validator/index.js line 9
  test('throws err as expected', () => {
    req = {query: {name: ''} }
    validator(req, res, next);

    expect(next).toBeCalledWith('Name parameter is missing');
  });

  test('runs successfully as expected', () => {
    // This tests validator/index.js line 7
    req = { query: { name: 'nick' } };
    validator(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });
});