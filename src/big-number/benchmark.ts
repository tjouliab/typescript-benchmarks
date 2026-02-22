import * as Benchmark from "benchmark";
import { BigNumberBigint } from "./big-number-bigint";
import { BigNumberString } from "./big-number-string";

const num1 = 123_456_789_123_456_789_123_456_789n;
const num2 = 987_654_321_987_654_321_987_654_321n;

const bigNumberInt1 = new BigNumberBigint(num1);
const bigNumberInt2 = new BigNumberBigint(num2);
const bigNumberString1 = new BigNumberString(`${num1}`);
const bigNumberString2 = new BigNumberString(`${num2}`);

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`add bigint`, () => {
    bigNumberInt1.add(bigNumberInt2);
  })
  .add(`add string`, () => {
    bigNumberString1.add(bigNumberString2);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
