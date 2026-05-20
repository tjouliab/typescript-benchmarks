import * as Benchmark from "benchmark";
import { Duration } from "luxon";
import { CompactDate, TimeUnitBase } from "../compact-date";
import { CompactDateRange } from "../compact-date-range";
import {
  convertDateTimeToCompactDate,
  convertDateToCompactDate,
  convertInstantToCompactDate,
  convertLuxonToCompactDate,
  convertMomentToCompactDate,
  isoStringToCompactDateRange,
} from "../compact-date.utils";

const startLong = "2025-01-01T00:00:00.000Z";
const endLong = "2025-03-01T00:00:00.000Z";
const rangeLong = isoStringToCompactDateRange(startLong, endLong);

const startMid = "2025-01-01T00:00:00.000Z";
const endMid = "2025-01-21T00:00:00.000Z";
const rangeMid = isoStringToCompactDateRange(startMid, endMid);

const startShort = "2025-01-01T00:00:00.000Z";
const endShort = "2025-01-06T00:00:00.000Z";
const rangeShort = isoStringToCompactDateRange(startShort, endShort);

function byMoment(
  range: CompactDateRange,
  unit: TimeUnitBase,
  options?: { step?: number },
): CompactDate[] {
  const step = options?.step ?? 1;

  const dateRange = range.toDateRange();

  const momentRanges = [...dateRange.by(unit, { step })];

  return momentRanges.map(convertMomentToCompactDate);
}

function byLuxon(
  range: CompactDateRange,
  unit: TimeUnitBase,
  options?: { step?: number },
): CompactDate[] {
  const step = options?.step ?? 1;
  if (unit === "seconds" || unit === "minutes") {
    const endTimestamp = range.end.toTimestamp();
    let currentTimestamp = range.start.toTimestamp();

    const durationMs = Duration.fromObject({ [unit]: step }).toMillis();

    const dates: CompactDate[] = [];
    while (currentTimestamp <= endTimestamp) {
      dates.push(convertDateToCompactDate(new Date(currentTimestamp))); // Add current date to the array
      currentTimestamp += durationMs; // Increment by the specified step and unit
    }
    return dates;
  }
  const endLuxon = range.end.toLuxon();
  let currentDate = range.start.toLuxon();

  const duration = Duration.fromObject({ [unit]: step });

  const dates: CompactDate[] = [];
  while (currentDate <= endLuxon) {
    dates.push(convertLuxonToCompactDate(currentDate)); // Add current date to the array
    currentDate = currentDate.plus(duration); // Increment by the specified step and unit
  }

  return dates;
}

function byTemporalInstant(
  range: CompactDateRange,
  unit: TimeUnitBase,
  options?: { step?: number },
): CompactDate[] {
  const step = options?.step ?? 1;
  if (unit === "seconds" || unit === "minutes") {
    const endTimestamp = range.end.toTimestamp();
    let currentTimestamp = range.start.toTimestamp();

    const durationMs = Temporal.Duration.from({ [unit]: step }).total({
      unit: "milliseconds",
    });

    const dates: CompactDate[] = [];
    while (currentTimestamp <= endTimestamp) {
      dates.push(convertDateToCompactDate(new Date(currentTimestamp))); // Add current date to the array
      currentTimestamp += durationMs; // Increment by the specified step and unit
    }
    return dates;
  }

  const endLuxon = range.end.toInstant();
  let currentDate = range.start.toInstant();

  const duration = Temporal.Duration.from({ [unit]: step });

  const dates: CompactDate[] = [];
  while (Temporal.Instant.compare(currentDate, endLuxon) <= 0) {
    dates.push(convertInstantToCompactDate(currentDate)); // Add current date to the array
    currentDate = currentDate.add(duration); // Increment by the specified step and unit
  }

  return dates;
}

function byTemporalDateTime(
  range: CompactDateRange,
  unit: TimeUnitBase,
  options?: { step?: number },
): CompactDate[] {
  const step = options?.step ?? 1;
  if (unit === "seconds" || unit === "minutes") {
    const endTimestamp = range.end.toTimestamp();
    let currentTimestamp = range.start.toTimestamp();

    const durationMs = Temporal.Duration.from({ [unit]: step }).total({
      unit: "milliseconds",
    });

    const dates: CompactDate[] = [];
    while (currentTimestamp <= endTimestamp) {
      dates.push(convertDateToCompactDate(new Date(currentTimestamp))); // Add current date to the array
      currentTimestamp += durationMs; // Increment by the specified step and unit
    }
    return dates;
  }
  const endLuxon = range.end.toPlainDateTime();
  let currentDate = range.start.toPlainDateTime();

  const duration = Temporal.Duration.from({ [unit]: step });

  const dates: CompactDate[] = [];
  while (Temporal.PlainDateTime.compare(currentDate, endLuxon) <= 0) {
    dates.push(convertDateTimeToCompactDate(currentDate)); // Add current date to the array
    currentDate = currentDate.add(duration); // Increment by the specified step and unit
  }

  return dates;
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`byMoment Long minutes`, () => {
    byMoment(rangeLong, "minutes");
  })
  .add(`byMoment Mid minutes`, () => {
    byMoment(rangeMid, "minutes");
  })
  .add(`byMoment Short minutes`, () => {
    byMoment(rangeShort, "minutes");
  })

  .add(`byLuxon Long minutes`, () => {
    byLuxon(rangeLong, "minutes");
  })
  .add(`byLuxon Mid minutes`, () => {
    byLuxon(rangeMid, "minutes");
  })
  .add(`byLuxon Short minutes`, () => {
    byLuxon(rangeShort, "minutes");
  })

  .add(`byTemporalInstant Long minutes`, () => {
    byTemporalInstant(rangeLong, "minutes");
  })
  .add(`byTemporalInstant Mid minutes`, () => {
    byTemporalInstant(rangeMid, "minutes");
  })
  .add(`byTemporalInstant Short minutes`, () => {
    byTemporalInstant(rangeShort, "minutes");
  })

  .add(`byTemporalDateTime Long minutes`, () => {
    byTemporalDateTime(rangeLong, "minutes");
  })
  .add(`byTemporalDateTime Mid minutes`, () => {
    byTemporalDateTime(rangeMid, "minutes");
  })
  .add(`byTemporalDateTime Short minutes`, () => {
    byTemporalDateTime(rangeShort, "minutes");
  })

  .add(`\nbyMoment Long hours`, () => {
    byMoment(rangeLong, "hours");
  })
  .add(`byMoment Mid hours`, () => {
    byMoment(rangeMid, "hours");
  })
  .add(`byMoment Short hours`, () => {
    byMoment(rangeShort, "hours");
  })

  .add(`byLuxon Long hours`, () => {
    byLuxon(rangeLong, "hours");
  })
  .add(`byLuxon Mid hours`, () => {
    byLuxon(rangeMid, "hours");
  })
  .add(`byLuxon Short hours`, () => {
    byLuxon(rangeShort, "hours");
  })

  .add(`byTemporalInstant Long hours`, () => {
    byTemporalInstant(rangeLong, "hours");
  })
  .add(`byTemporalInstant Mid hours`, () => {
    byTemporalInstant(rangeMid, "hours");
  })
  .add(`byTemporalInstant Short hours`, () => {
    byTemporalInstant(rangeShort, "hours");
  })

  .add(`byTemporalDateTime Long hours`, () => {
    byTemporalDateTime(rangeLong, "hours");
  })
  .add(`byTemporalDateTime Mid hours`, () => {
    byTemporalDateTime(rangeMid, "hours");
  })
  .add(`byTemporalDateTime Short hours`, () => {
    byTemporalDateTime(rangeShort, "hours");
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
