import * as Benchmark from "benchmark";
import { Timeline } from "./timeline.model";
import { ArrayUtils } from "../array.utils";
import { findIndexesSuccessive } from "./find-indexes-successive";
import { findIndexesBinary } from "./find-indexes-binary";

function getTimeline(length: number): Timeline[] {
  const timeline: Timeline[] = [];
  const step = 60; // Seconds
  let fromDate = new Date("2025-01-01T00:00:00Z");
  let toDate = new Date("2025-01-01T00:01:00Z");

  for (let index = 0; index < length; index++) {
    timeline.push({ from: fromDate.toISOString(), to: toDate.toISOString() });
    fromDate = new Date(fromDate.getTime() + step * 1000);
    toDate = new Date(toDate.getTime() + step * 1000);
  }

  return timeline;
}

function doubleForLoop(
  timeline1: Timeline[],
  timeline2: Timeline[]
): Map<string, number> {
  const indexes = new Map<string, number>();

  for (const item2 of timeline2) {
    for (const [index, item1] of timeline1.entries()) {
      if (item1.from !== item2.from) continue;

      indexes.set(item1.from, index);
      break;
    }
  }
  return indexes;
}

function compareTimeline(item1: Timeline, item2: Timeline): -1 | 1 {
  return item1.from <= item2.from ? -1 : 1;
}

const timelineRef = getTimeline(100);

const timelineComp1 = ArrayUtils.sliceRandomly(
  getTimeline(100),
  1,
  compareTimeline
);
const timelineComp5 = ArrayUtils.sliceRandomly(
  getTimeline(100),
  5,
  compareTimeline
);
const timelineComp10 = ArrayUtils.sliceRandomly(
  getTimeline(100),
  10,
  compareTimeline
);
const timelineComp25 = ArrayUtils.sliceRandomly(
  getTimeline(100),
  25,
  compareTimeline
);
const timelineComp50 = ArrayUtils.sliceRandomly(
  getTimeline(100),
  50,
  compareTimeline
);

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  // doubleForLoop
  .add(`doubleForLoop with ${timelineComp1.length}% elements`, () => {
    doubleForLoop(timelineRef, timelineComp1);
  })
  .add(`doubleForLoop with ${timelineComp5.length}% elements`, () => {
    doubleForLoop(timelineRef, timelineComp5);
  })
  .add(`doubleForLoop with ${timelineComp10.length}% elements`, () => {
    doubleForLoop(timelineRef, timelineComp10);
  })
  .add(`doubleForLoop with ${timelineComp25.length}% elements`, () => {
    doubleForLoop(timelineRef, timelineComp25);
  })
  .add(`doubleForLoop with ${timelineComp50.length}% elements`, () => {
    doubleForLoop(timelineRef, timelineComp50);
  })

  // findIndexesSuccessive
  .add(`findIndexesSuccessive with ${timelineComp1.length}% elements`, () => {
    findIndexesSuccessive(timelineRef, timelineComp1);
  })
  .add(`findIndexesSuccessive with ${timelineComp5.length}% elements`, () => {
    findIndexesSuccessive(timelineRef, timelineComp5);
  })
  .add(`findIndexesSuccessive with ${timelineComp10.length}% elements`, () => {
    findIndexesSuccessive(timelineRef, timelineComp10);
  })
  .add(`findIndexesSuccessive with ${timelineComp25.length}% elements`, () => {
    findIndexesSuccessive(timelineRef, timelineComp25);
  })
  .add(`findIndexesSuccessive with ${timelineComp50.length}% elements`, () => {
    findIndexesSuccessive(timelineRef, timelineComp50);
  })

  // findIndexesBinary
  .add(`findIndexesBinary with ${timelineComp1.length}% elements`, () => {
    findIndexesBinary(timelineRef, timelineComp1);
  })
  .add(`findIndexesBinary with ${timelineComp5.length}% elements`, () => {
    findIndexesBinary(timelineRef, timelineComp5);
  })
  .add(`findIndexesBinary with ${timelineComp10.length}% elements`, () => {
    findIndexesBinary(timelineRef, timelineComp10);
  })
  .add(`findIndexesBinary with ${timelineComp25.length}% elements`, () => {
    findIndexesBinary(timelineRef, timelineComp25);
  })
  .add(`findIndexesBinary with ${timelineComp50.length}% elements`, () => {
    findIndexesBinary(timelineRef, timelineComp50);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
