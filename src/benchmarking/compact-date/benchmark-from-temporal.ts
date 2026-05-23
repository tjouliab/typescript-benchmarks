import * as Benchmark from "benchmark";
import { DateTime } from "luxon";
import * as moment from "moment";
import { CompactDate } from "../../compact-date";
import {
  convertDateToCompactDate,
  convertIsoToCompactDate,
  convertLuxonToCompactDate,
  convertMomentToCompactDate,
} from "../../compact-date.utils";

const instant = Temporal.Now.instant();
const plainDateTime = Temporal.Now.plainDateTimeISO();
const date = new Date();
const luxon = DateTime.now();
const momentDate = moment.utc();

function convertInstantToCompactDate(instant: Temporal.Instant): CompactDate {
  const dateString = instant.toString();
  return convertIsoToCompactDate(dateString);
}

function convertDateTimeToCompactDateExplicit(
  dateTime: Temporal.PlainDateTime,
): CompactDate {
  const year = dateTime.year.toString();
  const month = dateTime.month.toString().padStart(2, "0");
  const day = dateTime.day.toString().padStart(2, "0");
  const hours = dateTime.hour.toString().padStart(2, "0");
  const minutes = dateTime.minute.toString().padStart(2, "0");
  const seconds = dateTime.second.toString().padStart(2, "0");
  const milliSeconds = dateTime.millisecond.toString().padStart(3, "0");

  const compactDate = `${year}${month}${day}${hours}${minutes}${seconds}.${milliSeconds}`;

  return new CompactDate(compactDate);
}

function convertDateTimeToCompactDateISO(
  dateTime: Temporal.PlainDateTime,
): CompactDate {
  const dateString = dateTime.toString();
  return convertIsoToCompactDate(dateString);
}

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`convertLuxonToCompactDate`, () => {
    convertLuxonToCompactDate(luxon);
  })
  .add(`convertMomentToCompactDate`, () => {
    convertMomentToCompactDate(momentDate);
  })
  .add(`convertDateToCompactDate`, () => {
    convertDateToCompactDate(date);
  })
  .add(`convertInstantToCompactDate`, () => {
    convertInstantToCompactDate(instant);
  })
  .add(`convertDateTimeToCompactDateExplicit`, () => {
    convertDateTimeToCompactDateExplicit(plainDateTime);
  })
  .add(`convertDateTimeToCompactDateISO`, () => {
    convertDateTimeToCompactDateISO(plainDateTime);
  })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
