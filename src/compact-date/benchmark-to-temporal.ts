import * as Benchmark from "benchmark";
import { CompactDate } from "../compact-date";

const compactDate = CompactDate.now(true);

// Create a new benchmark suite
const suite = new Benchmark.Suite();

function convertCompactToInstantIso(date: CompactDate): Temporal.Instant {
  return Temporal.Instant.from(date.toISOString());
}

function convertCompactToInstantMillis(date: CompactDate): Temporal.Instant {
  return Temporal.Instant.fromEpochMilliseconds(date.toTimestamp());
}

function convertCompactToDateTimeIsoDisplay(
  date: CompactDate,
): Temporal.PlainDateTime {
  return Temporal.PlainDateTime.from(date.toISODisplay());
}

function convertCompactToDateTimeFrom(
  date: CompactDate,
): Temporal.PlainDateTime {
  const dateString = date.date;

  const year = +dateString.substring(0, 4);
  const month = +dateString.substring(4, 6) - 1;
  const day = +dateString.substring(6, 8);
  const hour = +dateString.substring(8, 10);
  const minute = +dateString.substring(10, 12);
  const second = +dateString.substring(12, 14);
  const millisecond = +dateString.substring(15);

  return Temporal.PlainDateTime.from({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  });
}

function convertCompactToDateTimeFromExplicit(
  date: CompactDate,
): Temporal.PlainDateTime {
  const year = date.year();
  const month = date.month();
  const day = date.day();
  const hour = date.hour();
  const minute = date.minute();
  const second = date.second();
  const millisecond = date.millisecond();

  return Temporal.PlainDateTime.from({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  });
}

function convertCompactToDateTimeConstructor(
  date: CompactDate,
): Temporal.PlainDateTime {
  const dateString = date.date;

  const year = +dateString.substring(0, 4);
  const month = +dateString.substring(4, 6) - 1;
  const day = +dateString.substring(6, 8);
  const hour = +dateString.substring(8, 10);
  const minute = +dateString.substring(10, 12);
  const second = +dateString.substring(12, 14);
  const millisecond = +dateString.substring(15);

  return new Temporal.PlainDateTime(
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  );
}

function convertCompactToDateTimeConstructorExplicit(
  date: CompactDate,
): Temporal.PlainDateTime {
  const year = date.year();
  const month = date.month();
  const day = date.day();
  const hour = date.hour();
  const minute = date.minute();
  const second = date.second();
  const millisecond = date.millisecond();

  return new Temporal.PlainDateTime(
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  );
}

suite
  .add(`convertCompactToInstantIso`, () => {
    convertCompactToInstantIso(compactDate);
  })
  .add(`convertCompactToInstantMillis`, () => {
    convertCompactToInstantMillis(compactDate);
  })
  .add(`convertCompactToDateTimeIso`, () => {
    convertCompactToDateTimeIsoDisplay(compactDate);
  })
  .add(`convertCompactToDateTimeFrom`, () => {
    convertCompactToDateTimeFrom(compactDate);
  })
  .add(`convertCompactToDateTimeFromExplicit`, () => {
    convertCompactToDateTimeFromExplicit(compactDate);
  })
  .add(`convertCompactToDateTimeConstructor`, () => {
    convertCompactToDateTimeConstructor(compactDate);
  })
  .add(`convertCompactToDateTimeConstructorExplicit`, () => {
    convertCompactToDateTimeConstructorExplicit(compactDate);
  })

  .add(`toLuxon`, () => {
    compactDate.toLuxon();
  })
  .add(`toMoment`, () => {
    compactDate.toMoment();
  })
  .add(`toDate`, () => {
    compactDate.toDate();
  })
  .add(`toTimestamp`, () => {
    compactDate.toTimestamp();
  })
  .add(`toISOString`, () => {
    compactDate.toISOString();
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
