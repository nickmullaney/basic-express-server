'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('Server', () => {

  test('should return 404 on a bad route', async () => {
    const res = await mockRequest.get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  test('should return 404 on a bad method', async () => {
    const res = await mockRequest.post('/person');
    expect(res.statusCode).toBe(404);
  });

  test('should return 500 if no name in the query string', async () => {
    const res = await mockRequest.get('/person');
    expect(res.statusCode).toBe(500);
  });

  test('should return 200 if the name is in the query string', async () => {
    const res = await mockRequest.get('/person?name=John');
    expect(res.statusCode).toBe(200);
  });

  test('should return the correct output object if the name is in the query string', async () => {
    const name = 'Nick';
    const res = await mockRequest.get(`/person?name=${name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ name });
  });

  // can be either it() or test()
  it('handles the root path', async () => {
    const response = await mockRequest.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy;
    expect(response.text).toEqual('proof of life');
  });

  test('handles success route', async () => {
    const response = await mockRequest.get('/success');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Success!!');

  });

  // test('handles bad requests', async () => {
  //   const response = await mockRequest.get('/bad');
  //   console.log('body response: ',response.body);
  //   expect(response.status).toEqual(500);
  //   expect(response.body.route).toEqual('/bad');
  //   expect(response.body.message).to
  // });

  test('handles not found', async () => {
    const response = await mockRequest.get('/foo');
    expect(response.status).toEqual(404);

  });

  // TDD goal: to validate that the word banana is being sent as a parameter
  test('validate name parameter', async() =>{
    let response = await mockRequest.get('/person');
    expect(response.status).toEqual(500);

    response = await mockRequest.get('/person?name=nick');
    expect(response.status).toEqual(200);
  });

})
