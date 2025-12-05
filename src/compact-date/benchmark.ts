import * as Benchmark from "benchmark";
import { convertDateToCompactDate } from "../compact-date.utils";

const date: Date = new Date();

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`date.toISOString()`, () => {
    date.toISOString();
  })
  .add(`String(date)`, () => {
    String(date);
  })
  .add(`date.toString()`, () => {
    date.toString();
  })
  .add(`date.toJSON()`, () => {
    date.toJSON();
  })
  .add(`convertDateToCompactDate`, () => {
    convertDateToCompactDate(date);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
