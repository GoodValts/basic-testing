import { simpleCalculator, Action } from './index';

const a = 10;
const b = 20;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Add })).toBe(a + b);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Subtract })).toBe(a - b);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Multiply })).toBe(a * b);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Divide })).toBe(a / b);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toBe(a ** b);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a, b, action: 'invalid'})).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: a.toString(), b, action: Action.Add})).toBeNull();
    expect(simpleCalculator({ a, b: {a: a, b: b}, action: Action.Add})).toBeNull();
    expect(simpleCalculator({ a: null, b: undefined, action: Action.Add})).toBeNull();
  });
});
