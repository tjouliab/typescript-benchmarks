import * as Benchmark from "benchmark";
import * as _ from "lodash";
import { MockObjectComplex } from "../mock.utils";
import { BenchmarkUtils } from "../benchmark.utils";
import { deepCopy as deepCopyRecursive } from "./deep-copy";

/**
 * This file contains a benchmark suite to compare the performance of two functions:
 * - deepCopyJSON: The classic prod function that I come accross too often
 * - deepCopyRecursive: An improve deep copy method.
 *
 * The benchmark suite tests these functions with varying sizes of mock object arrays (10, 100, 1000, 10000, 100000, 1000000).
 */

function deepCopyJSON(objects: MockObjectComplex[]): MockObjectComplex[] {
  return JSON.parse(JSON.stringify(objects));
}

function deepCopyAssign<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  const res: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[key] = deepCopyAssign(obj[key]);
    }
  }
  return Object.assign(res, obj) as T;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

// Add tests to the suite
BenchmarkUtils.addObjectComplex(
  suite,
  [
    _.cloneDeep,
    structuredClone,
    deepCopyAssign,
    deepCopyJSON,
    deepCopyRecursive,
  ],
  [10, 100, 1_000]
);

suite
  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
