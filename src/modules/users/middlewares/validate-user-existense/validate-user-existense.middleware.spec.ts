import { ValidateUserExistenseMiddleware } from './validate-user-existense.middleware';

describe('ValidateUserExistenseMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateUserExistenseMiddleware()).toBeDefined();
  });
});
