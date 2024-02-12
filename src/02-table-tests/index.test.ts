import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 20, action: Action.Add, expected: 10 + 20 },
  { a: 10, b: 20, action: Action.Subtract, expected: 10 - 20 },
  { a: 10, b: 20, action: Action.Multiply, expected: 10 * 20 },
  { a: 10, b: 20, action: Action.Divide, expected: 10 / 20 },
  { a: 10, b: 20, action: Action.Exponentiate, expected: 10 ** 20 },
  { a: 10, b: 20, action: ':', expected: null },
  { a: 'a', b: 20, action: Action.Add, expected: null },
  { a: 10, b: { a: 10, b: 20 }, action: Action.Add, expected: null },
  { a: null, b: undefined, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach((el) => {
    test(`${el.a ? el.a : el.a} ${el.action} ${el.b} should be ${
      el.expected ? el.expected : 'not calculable'
    }`, () => {
      expect(simpleCalculator({ a: el.a, b: el.b, action: el.action })).toBe(
        el.expected,
      );
    });
  });
});
