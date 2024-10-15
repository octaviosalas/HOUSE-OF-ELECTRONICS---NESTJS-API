import { ValidatePasswordsOnRegisterMiddleware } from './validate-passwords-on-register.middleware';

describe('ValidatePasswordsOnRegisterMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidatePasswordsOnRegisterMiddleware()).toBeDefined();
  });
});
