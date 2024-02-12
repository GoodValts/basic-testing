import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const data = 'some data';
const path = 'path';
const url = 'https://jsonplaceholder.typicode.com';

jest.mock('axios', () => ({
  create: (config: { baseURL: string }) => ({
    get: (file: string) => {
      return `${config.baseURL}/${file}` === `${url}/${path}`
        ? { data: { url: url, data: data } }
        : { data: null };
    },
  }),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runAllTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(path);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: url,
    });
  });

  test('should perform request to correct provided url', async () => {
    expect(await throttledGetDataFromApi(path)?.then((res) => res.url)).toBe(
      url,
    );
  });

  test('should return response data', async () => {
    expect(await throttledGetDataFromApi(path)?.then((res) => res.data)).toBe(
      data,
    );
  });
});
