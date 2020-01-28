import email from './email';

const errorMessage = 'E-mail inválido';

describe('email validator', () => {
  let rule;

  beforeAll(() => {
    rule = email();
  });

  it('validates undefined', () => {
    expect(rule('email', { email: undefined })).toBe('');
  });

  it('validates null', () => {
    expect(rule('email', { email: null })).toBe('');
  });

  it('validates empty string', () => {
    expect(rule('email', { email: '' })).toBe('');
  });

  it('does not validate numbers', () => {
    expect(rule('email', { email: '12345' })).toBe(errorMessage);
  });

  it('does not validate strings', () => {
    expect(rule('email', { email: 'asdf12345' })).toBe(errorMessage);
  });

  it('does not validate space', () => {
    expect(rule('email', { email: ' ' })).toBe(errorMessage);
  });

  it('does not validate incomplete addresses', () => {
    expect(rule('email', { email: 'someone@' })).toBe(errorMessage);
    expect(rule('email', { email: 'someone@gmail' })).toBe(errorMessage);
    expect(rule('email', { email: 'someone@gmail.' })).toBe(errorMessage);
    expect(rule('email', { email: 'someone@gmail.c' })).toBe(errorMessage);
    expect(rule('email', { email: 'gmail.com' })).toBe(errorMessage);
    expect(rule('email', { email: '@gmail.com' })).toBe(errorMessage);
  });

  it('does not validate addresses that contain unsupported characters', () => {
    expect(rule('email', { email: 'someone@g~mail.com' })).toBe(errorMessage);
    expect(rule('email', { email: 'someone@g=ail.com' })).toBe(errorMessage);
    expect(rule('email', { email: '"someone@gmail.com' })).toBe(errorMessage);
  });

  it('does not validate addresses that contain spaces', () => {
    expect(rule('email', { email: 'someone@gmail.com ' })).toBe(errorMessage);
    expect(rule('email', { email: 'someone@gmail.com    ' })).toBe(errorMessage);
    expect(rule('email', { email: ' someone@gmail.com' })).toBe(errorMessage);
  });

  it('validates real email addresses', () => {
    expect(rule('email', { email: 'someone@gmail.com' })).toBe('');
    expect(rule('email', { email: 'someone@gmail.com.br' })).toBe('');
    expect(rule('email', { email: 'someone@g-mail.com' })).toBe('');
    expect(rule('email', { email: 'some!one@gmail.com' })).toBe('');
    expect(rule('email', { email: 'soMe12_one@gmail.com' })).toBe('');
    expect(rule('email', { email: 'someone@gmail.co' })).toBe('');
    expect(rule('email', { email: 'someone@g.cn' })).toBe('');
    expect(rule('email', { email: 'someone@g.accountants' })).toBe('');
    expect(rule('email', { email: '"some@one"@gmail.com' })).toBe('');
    expect(rule('email', { email: '"some one"@gmail.com' })).toBe('');
  });

  describe('When message params is passed to rule builder', () => {
    beforeAll(() => {
      rule = email({ message: 'Você digitou um e-mail inválido' });
    });

    it('returns custom message when it is not valid', () => {
      expect(rule('email', { email: 'asd@g.c' })).toBe('Você digitou um e-mail inválido');
    });
  });
});
