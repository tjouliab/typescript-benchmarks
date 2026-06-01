import * as Benchmark from "benchmark";

type Shape = {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  e?: number;
};

function full() {
  const o1 = { a: 1, b: 0, c: 0, d: 0, e: 0 };
  const o2 = { a: 1, b: 0, c: 0, d: 0, e: 0 };
  const o3 = { a: 1, b: 0, c: 0, d: 0, e: 0 };
  const o4 = { a: 1, b: 0, c: 0, d: 0, e: 0 };
  const o5 = { a: 1, b: 0, c: 0, d: 0, e: 0 }; // all shapes are equal
  return { o1, o2, o3, o4, o5 };
}

function monomorphic() {
  const o1 = { b: 0, c: 0, d: 0, e: 0 };
  const o2 = { b: 0, c: 0, d: 0, e: 0 };
  const o3 = { b: 0, c: 0, d: 0, e: 0 };
  const o4 = { b: 0, c: 0, d: 0, e: 0 };
  const o5 = { b: 0, c: 0, d: 0, e: 0 }; // all shapes are equal
  return { o1, o2, o3, o4, o5 };
}

function polymorphic() {
  const o1 = { b: 0, c: 0, d: 0, e: 0 };
  const o2 = { b: 0, c: 0, d: 0, e: 0 };
  const o3 = { b: 0, c: 0, d: 0, e: 0 };
  const o4 = { b: 0, c: 0, d: 0, e: 0 };
  const o5 = { a: 0, c: 0, d: 0, e: 0 }; // this shape is different
  return { o1, o2, o3, o4, o5 };
}

function megamorphic() {
  const o1 = { b: 0, c: 0, d: 0, e: 0 };
  const o2 = { a: 0, c: 0, d: 0, e: 0 };
  const o3 = { a: 0, b: 0, d: 0, e: 0 };
  const o4 = { a: 0, b: 0, c: 0, e: 0 };
  const o5 = { a: 0, b: 0, c: 0, d: 0 }; // all shapes are different
  return { o1, o2, o3, o4, o5 };
}

// test case
function add(a1: Shape, b1: Shape) {
  return (
    (a1?.a ?? 1) +
    (a1?.b ?? 1) +
    (a1?.c ?? 1) +
    (a1?.d ?? 1) +
    (a1?.e ?? 1) +
    (b1?.a ?? 1) +
    (b1?.b ?? 1) +
    (b1?.c ?? 1) +
    (b1?.d ?? 1) +
    (b1?.e ?? 1)
  );
}

const steps = 100_000;

function addFull() {
  const { o1, o2, o3, o4, o5 } = full();
  let result = 0;
  for (let i = 0; i < steps; i++) {
    result += add(o1, o2);
    result += add(o3, o4);
    result += add(o4, o5);
  }
}

function addMonomorphic() {
  const { o1, o2, o3, o4, o5 } = monomorphic();
  let result = 0;
  for (let i = 0; i < steps; i++) {
    result += add(o1, o2);
    result += add(o3, o4);
    result += add(o4, o5);
  }
}

function addPolymorphic() {
  const { o1, o2, o3, o4, o5 } = polymorphic();
  let result = 0;
  for (let i = 0; i < steps; i++) {
    result += add(o1, o2);
    result += add(o3, o4);
    result += add(o4, o5);
  }
}

function addMegamorphic() {
  const { o1, o2, o3, o4, o5 } = megamorphic();
  let result = 0;
  for (let i = 0; i < steps; i++) {
    result += add(o1, o2);
    result += add(o3, o4);
    result += add(o4, o5);
  }
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`addFull`, () => {
    addFull();
  })
  .add(`addMonomorphic`, () => {
    addMonomorphic();
  })
  .add(`addPolymorphic`, () => {
    addPolymorphic();
  })
  .add(`addMegamorphic`, () => {
    addMegamorphic();
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
