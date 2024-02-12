import { generateLinkedList } from './index';

type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

describe('generateLinkedList', () => {
  const elements: number[] = [];
  const expectedLinkedList: LinkedListNode<number> = {
    value: null,
    next: null,
  };

  const checkIsElement = (obj: LinkedListNode<number>, number: number) => {
    if (!obj.value) {
      obj.value = number;
      obj.next = { value: null, next: null };
    } else {
      if (obj.next) checkIsElement(obj.next, number);
    }
  };

  for (let i = 0; i < 100; i++) {
    elements.push(i + 1);
    checkIsElement(expectedLinkedList, i + 1);
  }

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
