import * as Benchmark from "benchmark";
import { BenchmarkUtils } from "../benchmark.utils";

function reverseUnshift<T>(objects: T[]): T[] {
  const result: T[] = [];
  for (const obj of objects) {
    result.unshift(obj);
  }
  return result;
}

function reverseArray<T>(objects: T[]): T[] {
  const result: T[] = [];
  for (const obj of objects) {
    result.push(obj);
  }
  return result.reverse();
}

function reverseDoublePush<T>(objects: T[]): T[] {
  const tmp: T[] = [];
  const result: T[] = [];
  for (const obj of objects) {
    tmp.push(obj);
  }
  for (let i = tmp.length - 1; i >= 0; i--) {
    result.push(tmp[i]);
  }
  return result;
}

function reverseInversedPush<T>(objects: T[]): T[] {
  const result: T[] = [];
  for (let i = objects.length - 1; i >= 0; i--) {
    result.push(objects[i]);
  }
  return result;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

// Add tests to the suite
BenchmarkUtils.addObjectSimple(
  suite,
  [reverseUnshift, reverseArray, reverseDoublePush, reverseInversedPush],
  [10, 100, 1_000, 10_000, 100_000]
);

suite
  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
