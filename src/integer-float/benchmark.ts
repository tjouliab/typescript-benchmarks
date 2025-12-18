import * as Benchmark from "benchmark";

const num = {
  x: 42,
  y: 4.2,
};

const step: number = 0.5;

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`int + step`, () => {
    num.x += step;
  })
  .add(`float + step`, () => {
    num.y += step;
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
