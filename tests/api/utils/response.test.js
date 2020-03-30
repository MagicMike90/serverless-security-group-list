const { Response, SuccessResponse, ErrorResponse } = require('../../../src/api/utils/response');
const { emptySecurityList, securityList } = require('../../mocks/securityGroups');

describe('Response class', () => {
  it('should create a Response instance', () => {
    const response = new Response(null, null);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('meta');
    expect(response.body.meta).toHaveProperty('copyright');
    expect(response.body.meta).toHaveProperty('authors');
    expect(response.body.meta).toHaveProperty('totalCount');
  });
});

describe('Success Response class', () => {
  it('should create a Success Response instance', () => {
    const response = new SuccessResponse(null, null);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('data');
    expect(response.body).not.toHaveProperty('errors');
  });
  it('should create a Response with status 200 with empty list', () => {
    let response = new SuccessResponse(200, emptySecurityList);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe(JSON.stringify(emptySecurityList));
    expect(response.body.meta.totalCount).toBe(0);
  });
  it('should create a Response with status 200 with full list', () => {
    let response = new SuccessResponse(200, securityList);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBe(JSON.stringify(securityList));
    expect(response.body.meta.totalCount).toBe(securityList.SecurityGroups.length);
  });
  it('should create a Response with status 201', () => {
    const response = new SuccessResponse(201, null);
    expect(response.statusCode).toBe(201);
  });
});

describe('Error Response class', () => {
  it('should create a Error Response instance', () => {
    const response = new ErrorResponse(null, null);
    expect(response).toBeDefined();
    expect(response).toHaveProperty('headers');
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response.body).not.toHaveProperty('data');
    expect(response.body).toHaveProperty('errors');
  });
  it('should create a Response with status 403', () => {
    const testMsg = { message: 'test' };
    const response = new ErrorResponse(403, testMsg);
    expect(response.statusCode).toBe(403);
    expect(response.body.errors).toBe(JSON.stringify(testMsg));
  });
  it('should create a Response with status 500', () => {
    const testMsg = { message: 'test' };
    const response = new ErrorResponse(500, testMsg);
    expect(response.statusCode).toBe(500);
    expect(response.body.errors).toBe(JSON.stringify(testMsg));
  });
});
