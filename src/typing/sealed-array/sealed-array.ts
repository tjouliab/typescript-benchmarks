type ArrayLengthMutationKeys = "splice" | "push" | "pop" | "shift" | "unshift";

type ArrayItems<T extends Array<unknown>> = T extends Array<infer TItems>
  ? TItems
  : never;

type FixedLengthArray<T extends unknown[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };

// Should pass
const pass: FixedLengthArray<[number, number, number]> = [1, 2, 3];
const pass2: Array<[number, number, number]> = [[1, 2, 3]];

// Should not pass
// @ts-expect-error
const noPass: FixedLengthArray<[number, number, number]> = [1, 2, 3, 4];
// @ts-expect-error
const noPass2: Array<[number, number, number]> = [[1, 2, 3, 4]];
