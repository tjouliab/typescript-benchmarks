import * as Benchmark from "benchmark";
import { CompactDate, TimeUnitBase } from "../../compact-date";
import {
  convertDateTimeToCompactDate,
  convertInstantToCompactDate,
  convertLuxonToCompactDate,
} from "../../compact-date.utils";

const compactDate = CompactDate.now(true);

const seconds = 3253;
const minutes = 235;
const hours = 13;

function addSecondsLuxon(
  compactDate: CompactDate,
  value: number,
  unit: TimeUnitBase,
): CompactDate {
  const date = compactDate.toLuxon().plus({ [unit]: value });
  return convertLuxonToCompactDate(date);
}

function addSecondsInstant(
  compactDate: CompactDate,
  value: number,
  unit: TimeUnitBase,
): CompactDate {
  const instant = compactDate.toInstant().add({ [unit]: value });
  return convertInstantToCompactDate(instant);
}

function addSecondsDateTime(
  compactDate: CompactDate,
  value: number,
  unit: TimeUnitBase,
): CompactDate {
  const dateTime = compactDate.toPlainDateTime().add({ [unit]: value });
  return convertDateTimeToCompactDate(dateTime);
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`addSecondsLuxon seconds`, () => {
    addSecondsLuxon(compactDate.clone(), seconds, "seconds");
  })
  .add(`addSecondsLuxon minutes`, () => {
    addSecondsLuxon(compactDate.clone(), minutes, "minutes");
  })
  .add(`addSecondsLuxon hours`, () => {
    addSecondsLuxon(compactDate.clone(), hours, "hours");
  })

  .add(`addSecondsInstant seconds`, () => {
    addSecondsInstant(compactDate.clone(), seconds, "seconds");
  })
  .add(`addSecondsInstant minutes`, () => {
    addSecondsInstant(compactDate.clone(), minutes, "minutes");
  })
  .add(`addSecondsInstant hours`, () => {
    addSecondsInstant(compactDate.clone(), hours, "hours");
  })

  .add(`addSecondsDateTime seconds`, () => {
    addSecondsDateTime(compactDate.clone(), seconds, "seconds");
  })
  .add(`addSecondsDateTime minutes`, () => {
    addSecondsDateTime(compactDate.clone(), minutes, "minutes");
  })
  .add(`addSecondsDateTime hours`, () => {
    addSecondsDateTime(compactDate.clone(), hours, "hours");
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
