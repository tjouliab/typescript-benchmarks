import * as Benchmark from "benchmark";
import { MockObjectSimple, MockUtils } from "../../mock.utils";

const count = 1000;
const mocks = MockUtils.generateSimple(count);

const mockMap = new Map<number, MockObjectSimple>(mocks.map((g) => [g.id, g]));
const mapIterator = mockMap.values();

function convertPush(
  iterator: MapIterator<MockObjectSimple>,
): MockObjectSimple[] {
  const list: MockObjectSimple[] = [];
  for (const val of iterator) {
    list.push(val);
  }
  return list;
}

function convertArrayFrom(
  iterator: MapIterator<MockObjectSimple>,
): MockObjectSimple[] {
  return Array.from(iterator);
}

function convertSpread(
  iterator: MapIterator<MockObjectSimple>,
): MockObjectSimple[] {
  return [...iterator];
}

function convertToArray(
  iterator: MapIterator<MockObjectSimple>,
): MockObjectSimple[] {
  return iterator.toArray();
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`convertPush`, () => {
    convertPush(mapIterator);
  })
  .add(`convertArrayFrom`, () => {
    convertArrayFrom(mapIterator);
  })
  .add(`convertSpread`, () => {
    convertSpread(mapIterator);
  })
  .add(`convertToArray`, () => {
    convertToArray(mapIterator);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
