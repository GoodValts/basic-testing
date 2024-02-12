import path from 'path';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  let timeout: number;
  let callback: typeof jest.fn;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    timeout = 3000;
    callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
  });

  test('should set timeout with provided callback and timeout', () => {
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let interval: number;
  let callback: typeof jest.fn;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    interval = 3000;
    callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, interval);
  });

  test('should set interval with provided callback and timeout', () => {
    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const iter = 5;
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * iter);
    expect(callback).toHaveBeenCalledTimes(iter);
  });
});

const logContent = 'log data';

jest.mock('path', () => ({
  join: (_: string, path: string) => `c:\\${path}`,
}));
jest.mock('fs', () => ({
  existsSync: (path: string) => path === 'c:\\log.txt',
}));
jest.mock('fs/promises', () => ({ readFile: async () => logContent }));

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinMock = jest.spyOn(path, 'join');
    await readFileAsynchronously('log.txt');
    expect(joinMock).toHaveBeenCalledWith(__dirname, 'log.txt');
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('anotherFile.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    expect(await readFileAsynchronously('log.txt')).toBe(logContent);
  });
});
