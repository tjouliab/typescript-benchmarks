import * as Benchmark from "benchmark";

function countDigitsToString(num: number): number {
  return num.toString().length;
}

function countDigitsTemplateString(num: number): number {
  return `${num}`.length;
}

function countDigitsLog(num: number): number {
  return Math.ceil(Math.log10(num));
}

const short = 10 ** 0;
const mid = 10 ** 5;
const long = 10 ** 10;

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  // short
  .add(`countDigitsToString short`, () => {
    countDigitsToString(short);
  })
  .add(`countDigitsTemplateString short`, () => {
    countDigitsTemplateString(short);
  })
  .add(`countDigitsLog short`, () => {
    countDigitsLog(short);
  })
  // Mid
  .add(`countDigitsToString mid`, () => {
    countDigitsToString(mid);
  })
  .add(`countDigitsTemplateString mid`, () => {
    countDigitsTemplateString(mid);
  })
  .add(`countDigitsLog mid`, () => {
    countDigitsLog(mid);
  })
  // Long
  .add(`countDigitsToString long`, () => {
    countDigitsToString(long);
  })
  .add(`countDigitsTemplateString long`, () => {
    countDigitsTemplateString(long);
  })
  .add(`countDigitsLog long`, () => {
    countDigitsLog(long);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
