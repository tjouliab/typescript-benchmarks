import * as Benchmark from "benchmark";
import { MockObjectSimple, MockUtils } from "../../mock.utils";

const count = 1000;
const refs = MockUtils.generateSimple(count);
const overrides = MockUtils.generateSimple(2 * count);

const refMap = new Map<number, MockObjectSimple>(refs.map((g) => [g.id, g]));
const overrideMap = new Map<number, MockObjectSimple>(
  overrides.map((g) => [g.id, g]),
);

function mergeMapSpread(
  ref: Map<number, MockObjectSimple>,
  override: Map<number, MockObjectSimple>,
): MockObjectSimple[] {
  const map = new Map([...ref, ...override]);
  return map.values().toArray();
}

function mergeMapCopy(
  ref: Map<number, MockObjectSimple>,
  override: Map<number, MockObjectSimple>,
): MockObjectSimple[] {
  const map = new Map(override);

  for (const [id, group] of ref) {
    if (!map.has(id)) {
      map.set(id, group);
    }
  }

  return Array.from(map.values());
}

function mergeMapReduce(
  ref: Map<number, MockObjectSimple>,
  override: Map<number, MockObjectSimple>,
): MockObjectSimple[] {
  return ref
    .values()
    .reduce(
      (acc, val) => (acc.has(val.id) ? acc : acc.set(val.id, val)),
      override,
    )
    .values()
    .toArray();
}

function mergeMapForEach(
  ref: Map<number, MockObjectSimple>,
  override: Map<number, MockObjectSimple>,
): MockObjectSimple[] {
  const [smallestMap, biggestMap] =
    ref.size > override.size ? [override, ref] : [ref, override];

  for (const val of smallestMap.values()) {
    if (!biggestMap.has(val.id)) biggestMap.set(val.id, val);
  }

  const list: MockObjectSimple[] = [];
  for (const val of biggestMap.values()) {
    list.push(val);
  }
  return list;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`mergeMapSpread`, () => {
    mergeMapSpread(refMap, overrideMap);
  })
  .add(`mergeMapCopy`, () => {
    mergeMapCopy(refMap, overrideMap);
  })
  .add(`mergeMapReduce`, () => {
    mergeMapReduce(refMap, overrideMap);
  })
  .add(`mergeMapForEach`, () => {
    mergeMapForEach(refMap, overrideMap);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
