import { ValidateUserEmailMiddleware } from './validate-user-email.middleware';

describe('ValidateUserEmailMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateUserEmailMiddleware()).toBeDefined();
  });
});
