import * as Benchmark from "benchmark";
import { SetObjects } from "./set-objects";
import { MockObjectSimple, MockUtils } from "../mock.utils";
import { BenchmarkUtils } from "../benchmark.utils";

/**
 * This file contains a benchmark suite to compare the performance of two functions:
 * - filterListWithUniqueId: The classic prod function that I come accross too often
 * - createSetObjects: Uses the SetObjects class to create a set of objects with unique ids.
 *
 * The benchmark suite tests these functions with varying sizes of mock object arrays (10, 100, 1000, 10000, 100000, 1000000).
 */

function filterListWithUniqueId(
  objects: MockObjectSimple[]
): MockObjectSimple[] {
  const result: MockObjectSimple[] = [];
  for (const object of objects) {
    if (!result.some((elem) => elem.id === object.id)) {
      result.push(object);
    }
  }
  return result;
}

function createSetObjects(objects: MockObjectSimple[]): MockObjectSimple[] {
  return [...new SetObjects(objects, (object) => object.id)];
}

// const mockObjectsSimple10: MockObjectSimple[] = MockUtils.generateSimple(10);
// const mockObjectsSimple100: MockObjectSimple[] = MockUtils.generateSimple(100);
// const mockObjectsSimple1000: MockObjectSimple[] = MockUtils.generateSimple(1000);
// const mockObjectsSimple10000: MockObjectSimple[] = MockUtils.generateSimple(10000);
// const mockObjectsSimple100000: MockObjectSimple[] = MockUtils.generateSimple(100000);
// const mockObjectsSimple1000000: MockObjectSimple[] = MockUtils.generateSimple(1000000);

// Create a new benchmark suite
const suite = new Benchmark.Suite();

// Add tests to the suite
BenchmarkUtils.addObjectSimple(
  suite,
  [filterListWithUniqueId, createSetObjects],
  [10, 100, 1_000, 10_000, 100_000, 1_000_000]
);

suite
  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
