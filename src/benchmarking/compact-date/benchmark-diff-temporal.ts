import * as Benchmark from "benchmark";
import { CompactDate, TimeUnitBase } from "../../compact-date";

const endDate = CompactDate.now(true);
const startDate = endDate.clone().subtract(3, "days");

const ALL_UNITS_ORDERED: TimeUnitBase[] = [
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

function diffTimestamp(start: CompactDate, end: CompactDate): number {
  return (end.toTimestamp() - start.toTimestamp()) / 1000;
}

function diffLuxon1(
  start: CompactDate,
  end: CompactDate,
  unit: TimeUnitBase,
): number {
  const firstDate = end.toLuxon();
  const secondDate = start.toLuxon();

  const unitIndex = ALL_UNITS_ORDERED.findIndex((elem) => elem === unit);
  if (unitIndex < 0) {
    throw new Error(`Time unit ${unit} is not supported`);
  }

  // Filtered units allow Luxon to accurately return the duration in requested unit
  const filteredUnits = ALL_UNITS_ORDERED.slice(unitIndex);
  const duration = firstDate.diff(secondDate, filteredUnits);
  return duration.toObject()[unit] ?? 0;
}

function diffLuxon2(
  start: CompactDate,
  end: CompactDate,
  unit: TimeUnitBase,
): number {
  const firstDate = end.toLuxon();
  const secondDate = start.toLuxon();

  const unitIndex = ALL_UNITS_ORDERED.indexOf(unit);
  if (unitIndex < 0) {
    throw new Error(`Time unit ${unit} is not supported`);
  }

  // Filtered units allow Luxon to accurately return the duration in requested unit
  const filteredUnits = ALL_UNITS_ORDERED.slice(unitIndex);
  const duration = firstDate.diff(secondDate, filteredUnits);
  return duration.toObject()[unit] ?? 0;
}

function diffInstant(
  start: CompactDate,
  end: CompactDate,
  unit: TimeUnitBase,
): number {
  const firstDate = end.toInstant();
  const secondDate = start.toInstant();

  const duration = firstDate.since(secondDate);

  return duration.total({ unit });
}

function diffDateTime(
  start: CompactDate,
  end: CompactDate,
  unit: TimeUnitBase,
): number {
  const firstDate = end.toPlainDateTime();
  const secondDate = start.toPlainDateTime();

  const duration = firstDate.since(secondDate);

  return duration.total({ unit });
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`diffTimestamp seconds`, () => {
    diffTimestamp(startDate, endDate);
  })

  .add(`diffLuxon1 seconds`, () => {
    diffLuxon1(startDate, endDate, "seconds");
  })
  .add(`diffLuxon1 minutes`, () => {
    diffLuxon1(startDate, endDate, "minutes");
  })
  .add(`diffLuxon1 hours`, () => {
    diffLuxon1(startDate, endDate, "hours");
  })

  .add(`diffLuxon2 seconds`, () => {
    diffLuxon2(startDate, endDate, "seconds");
  })
  .add(`diffLuxon2 minutes`, () => {
    diffLuxon2(startDate, endDate, "minutes");
  })
  .add(`diffLuxon2 hours`, () => {
    diffLuxon2(startDate, endDate, "hours");
  })

  .add(`diffInstant seconds`, () => {
    diffInstant(startDate, endDate, "seconds");
  })
  .add(`diffInstant minutes`, () => {
    diffInstant(startDate, endDate, "minutes");
  })
  .add(`diffInstant hours`, () => {
    diffInstant(startDate, endDate, "hours");
  })

  .add(`diffDateTime seconds`, () => {
    diffDateTime(startDate, endDate, "seconds");
  })
  .add(`diffDateTime minutes`, () => {
    diffDateTime(startDate, endDate, "minutes");
  })
  .add(`diffDateTime hours`, () => {
    diffDateTime(startDate, endDate, "hours");
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
