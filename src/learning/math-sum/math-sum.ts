export {};

declare global {
  interface Math {
    sum(values: number[]): number;
    sum(...values: number[]): number;
  }
}

Math.sum = (...args: number[] | [number[]]): number => {
  const values = Array.isArray(args[0]) ? args[0] : (args as number[]);

  return values.reduce((acc, val) => acc + val, 0);
};

console.log(Math.sum([1, 2, 3, 4, 5]));
console.log(Math.sum(1, 2, 3, 4, 5));
