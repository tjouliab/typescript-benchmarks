import * as Benchmark from "benchmark";

const length = 1_000_000;

const reference = Array(length)
  .fill(null)
  .map((_, i) => i);

function create(): { ref: number[]; list: number[] } {
  return { ref: [...reference], list: [...reference] };
}

function casualPush() {
  const { ref, list } = create();

  ref.push(...list);
}

function casualConcat() {
  const { ref, list } = create();

  ref.concat(list);
}

function prototypeConcat() {
  const { ref, list } = create();

  Array.prototype.concat(ref, list);
}

function largePush() {
  const { ref, list } = create();

  for (const item of list) {
    ref.push(item);
  }
}

function smartPush() {
  const { ref, list } = create();

  const refLength = ref.length;

  ref.length += list.length;

  for (let i = 0; i < list.length; i++) {
    ref[refLength + i] = list[i];
  }
}

function splicePush() {
  const { ref, list } = create();

  ref.splice(ref.length, 0, ...list);
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`create`, () => {
    create();
  })
  .add(`casualPush`, () => {
    casualPush();
  })
  .add(`casualConcat`, () => {
    casualConcat();
  })
  .add(`prototypeConcat`, () => {
    prototypeConcat();
  })
  .add(`largePush`, () => {
    largePush();
  })
  .add(`smartPush`, () => {
    smartPush();
  })
  .add(`splicePush`, () => {
    splicePush();
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
