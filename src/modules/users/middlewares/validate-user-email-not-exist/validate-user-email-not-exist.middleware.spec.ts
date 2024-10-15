import { ValidateUserEmailNotExistMiddleware } from './validate-user-email-not-exist.middleware';

describe('ValidateUserEmailNotExistMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateUserEmailNotExistMiddleware()).toBeDefined();
  });
});
