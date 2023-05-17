`use strict`;

const logger = require('./logger')

describe('Logger Middleware', () => {
  let consoleSpy;
  let req = { method: 'GET', path: '/test' };
  let res = {};

  //This "mocks" the next function
  let next = jest.fn();

  beforeAll(() => {
    //attach a spy to the console
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    console.log('Console Spy: ', consoleSpy);
  });

  afterAll(() =>{
    //remove the spy
    consoleSpy.mockRestore();
  });

  test('Logs as expected', () =>{
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith(`${req.method}: ${req.path}`);
  })


})
