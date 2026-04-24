import * as Benchmark from "benchmark";

const EMPTY_MS = "000";

function containsMsSplit(date: string): boolean {
  return date.split(".")[1] === EMPTY_MS;
}

function containsMsSubstring(date: string): boolean {
  return date.substring(15) === EMPTY_MS;
}

function containsMsNumber(date: string): boolean {
  return +date.substring(15) === 0;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`containsMsSplit`, () => {
    containsMsSplit("20230101101340.123");
  })
  .add(`containsMsSubstring`, () => {
    containsMsSubstring("20230101101340.123");
  })
  .add(`containsMsNumber`, () => {
    containsMsNumber("20230101101340.123");
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
