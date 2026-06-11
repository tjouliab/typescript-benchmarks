import * as Benchmark from "benchmark";

const count = 10_000;

const normal = new Array<number>(count).fill(0).map((_, i) => i % count);
const bytes = new Uint8Array(count).map((_, i) => i);

function directAccessArray(arr: number[]): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
function directAccessBuffer(arr: Uint8Array): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function numericTransformationArray(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = (arr[i] * 2 + 10) % arr.length;
  }
  return arr;
}
function numericTransformationBuffer(arr: Uint8Array): Uint8Array {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2 + 10;
  }
  return arr;
}

function xorArray(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    arr[i] ^= 0xff;
  }
  return arr;
}

function xorBuffer(arr: Uint8Array): Uint8Array {
  for (let i = 0; i < arr.length; i++) {
    arr[i] ^= 0xff;
  }
  return arr;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`directAccessArray`, () => {
    directAccessArray(normal);
  })
  .add(`directAccessBuffer`, () => {
    directAccessBuffer(bytes);
  })
  .add(`numericTransformationArray`, () => {
    numericTransformationArray(normal);
  })
  .add(`numericTransformationBuffer`, () => {
    numericTransformationBuffer(bytes);
  })
  .add(`xorArray`, () => {
    xorArray(normal);
  })
  .add(`xorBuffer`, () => {
    xorBuffer(bytes);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
