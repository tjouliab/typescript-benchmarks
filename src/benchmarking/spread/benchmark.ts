import * as Benchmark from "benchmark";

type BaseShape = {
  a: number;
  b: number;
  c: number;
};

type BigBaseShape = {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  g: number;
  h: number;
  i: number;
  j: number;
  k: number;
  l: number;
  m: number;
  n: number;
  o: number;
  p: number;
  q: number;
  r: number;
  s: number;
  t: number;
  u: number;
  v: number;
  w: number;
  x: number;
};

type Shape = BaseShape & {
  y: number;
  z: number;
};

type BigShape = BigBaseShape & {
  y: number;
  z: number;
};

const object: BaseShape = {
  a: 3,
  b: 4,
  c: 5,
};

const bigObject: BigBaseShape = {
  a: 24,
  b: 23,
  c: 22,
  d: 21,
  e: 20,
  f: 19,
  g: 18,
  h: 17,
  i: 16,
  j: 15,
  k: 14,
  l: 13,
  m: 12,
  n: 11,
  o: 10,
  p: 9,
  q: 8,
  r: 7,
  s: 6,
  t: 5,
  u: 4,
  v: 3,
  w: 2,
  x: 1,
};

const objectPartial: Partial<BaseShape> = {
  a: 3,
  b: 4,
};

function spreadObj(obj: BaseShape): Shape {
  return {
    ...obj,
    y: 1,
    z: 2,
  };
}

function setObj(obj: BaseShape): Shape {
  return {
    a: obj.a,
    b: obj.b,
    c: obj.c,
    y: 1,
    z: 2,
  };
}

function spreadObjBig(obj: BigBaseShape): BigShape {
  return {
    ...obj,
    y: 1,
    z: 2,
  };
}

function setObjBig(obj: BigBaseShape): BigShape {
  return {
    a: obj.a,
    b: obj.b,
    c: obj.c,
    d: obj.d,
    e: obj.e,
    f: obj.f,
    g: obj.g,
    h: obj.h,
    i: obj.i,
    j: obj.j,
    k: obj.k,
    l: obj.l,
    m: obj.m,
    n: obj.n,
    o: obj.o,
    p: obj.p,
    q: obj.q,
    r: obj.r,
    s: obj.s,
    t: obj.t,
    u: obj.u,
    v: obj.v,
    w: obj.w,
    x: obj.x,
    y: 1,
    z: 2,
  };
}

function spreadObjPartial(obj: Partial<BaseShape>): Partial<Shape> {
  return {
    ...obj,
    y: 1,
    z: 2,
  };
}

function setObjPartial(obj: Partial<BaseShape>): Partial<Shape> {
  return {
    a: obj?.a,
    b: obj?.b,
    c: obj?.c,
    y: 1,
    z: 2,
  };
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`spreadObj`, () => {
    spreadObj(object);
  })
  .add(`setObj`, () => {
    setObj(object);
  })

  .add(`\nspreadBigObj`, () => {
    spreadObjBig(bigObject);
  })
  .add(`setObjBig`, () => {
    setObjBig(bigObject);
  })

  .add(`\nspreadObjPartial`, () => {
    spreadObjPartial(objectPartial);
  })
  .add(`setObjPartial`, () => {
    setObjPartial(objectPartial);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
