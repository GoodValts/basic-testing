import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 'value';
    expect(await resolveValue(value)).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    const message = 'message';
    expect(() => throwError(message)).toThrowError(message);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(async () => await rejectCustomError()).rejects.toThrowError(
      MyAwesomeError,
    );
  });
});
