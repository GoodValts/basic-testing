import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

const initialBalance = 10000;
const operationAmount = 500;
const account = getBankAccount(initialBalance);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(account.getBalance() + 1)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      account.transfer(
        account.getBalance() + 1,
        getBankAccount(initialBalance),
      ),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(account.getBalance(), account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const currentAmount = account.getBalance();
    expect(account.deposit(operationAmount).getBalance()).toBe(
      currentAmount + operationAmount,
    );
  });

  test('should withdraw money', () => {
    const currentAmount = account.getBalance();
    expect(account.withdraw(operationAmount).getBalance()).toBe(
      currentAmount - operationAmount,
    );
  });

  test('should transfer money', () => {
    const currentAmount = account.getBalance();
    const newAccount = getBankAccount(initialBalance);
    expect(account.transfer(operationAmount, newAccount).getBalance()).toBe(
      currentAmount - operationAmount,
    );
    expect(newAccount.getBalance()).toBe(currentAmount + operationAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchingBalance = await account.fetchBalance();
    if (fetchingBalance)
      expect(await account.fetchBalance()).toBeInstanceOf(Number);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    account.fetchBalance = jest.fn().mockResolvedValue(operationAmount);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(operationAmount);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
