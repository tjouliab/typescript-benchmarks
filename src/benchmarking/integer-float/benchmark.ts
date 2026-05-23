import * as Benchmark from "benchmark";

const num1 = {
  x: 42,
  y: 4.2,
};
const num2 = { ...num1 };

const stepFloat: number = 0.5;
const stepInt: number = 2;

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`int + stepFloat`, () => {
    num1.x += stepFloat;
  })
  .add(`float + stepFloat`, () => {
    num1.y += stepFloat;
  })
  .add(`int + stepInt`, () => {
    num2.x += stepInt;
  })
  .add(`float + stepInt`, () => {
    num2.y += stepInt;
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
