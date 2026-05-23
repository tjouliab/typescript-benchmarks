import * as Benchmark from "benchmark";

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  // isNan
  .add(`isNan NaN`, () => {
    isNaN(NaN);
  })
  .add(`isNan not NaN`, () => {
    isNaN(5);
  })

  // numberIsNan
  .add(`Number.isNaN NaN`, () => {
    Number.isNaN(NaN);
  })
  .add(`Number.isNaN not NaN`, () => {
    Number.isNaN(5);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
