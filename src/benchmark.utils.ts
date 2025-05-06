import * as Benchmark from "benchmark";
import { MockUtils, MockObjectSimple, MockObjectComplex } from "./mock.utils";

export abstract class BenchmarkUtils {
  static addObjectSimple(
    suite: Benchmark.Suite,
    fns: ((objects: MockObjectSimple[]) => MockObjectSimple[])[],
    list: number[]
  ): void {
    const mockMap = new Map();
    for (const fn of fns) {
      for (const [i, value] of list.entries()) {
        if (!mockMap.has(i)) {
          mockMap.set(i, MockUtils.generateSimple(value));
        }

        const fnName = i === 0 ? `\n-- ${fn.name} --\n` : "";
        suite.add(`${fnName}with ${value} elements`, () => {
          fn(mockMap.get(i));
        });
      }
    }
  }

  static addObjectComplex(
    suite: Benchmark.Suite,
    fns: ((objects: MockObjectComplex[]) => MockObjectComplex[])[],
    list: number[]
  ): void {
    const mockMap = new Map();
    for (const fn of fns) {
      for (const [i, value] of list.entries()) {
        if (!mockMap.has(i)) {
          mockMap.set(i, MockUtils.generateComplex(value));
        }

        const fnName = i === 0 ? `\n-- ${fn.name} --\n` : "";
        suite.add(`${fnName}with ${value} elements`, () => {
          fn(mockMap.get(i));
        });
      }
    }
  }
}
