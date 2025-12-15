import { DateRange } from "moment-range";
import { CompactDate } from "../compact-date";
import { CompactDateRange } from "../compact-date-range";
import {
  convertIsoToCompact,
  convertIsoToCompactDate,
} from "../compact-date.utils";
import * as Benchmark from "benchmark";
import * as moment from "moment";
import { DateTime, Duration } from "luxon";

const startLong = "2025-01-01T00:00:00.000Z";
const endLong = "2025-03-01T00:00:00.000Z";

const startMid = "2025-01-01T00:00:00.000Z";
const endMid = "2025-01-21T00:00:00.000Z";

const startShort = "2025-01-01T00:00:00.000Z";
const endShort = "2025-01-06T00:00:00.000Z";

const startCompactLong = convertIsoToCompactDate(startLong);
const endCompactLong = convertIsoToCompactDate(endLong);

const getTimelineCompressionRange = (
  start: string,
  end: string
): { range: Array<CompactDate>; step: number } => {
  const dateRange: CompactDateRange = new CompactDateRange(
    new CompactDate(convertIsoToCompact(start)),
    new CompactDate(convertIsoToCompact(end))
  );
  const days = dateRange.diff("days");
  // default over 2 days
  let step = 5;

  if (days >= 14) {
    const months = dateRange.diff("months");
    step = months > 0 ? 60 * (months + 1) : 60;
  } else if (days >= 7) {
    step = 30;
  } else if (days >= 4) {
    step = 15;
  }

  return { range: dateRange.by("minutes", { step }), step };
};

const stepSeconds = 120 * 60;
const stepMinutes = 120;
const stepDays = 1;
const stepMonths = 1;

const dateRangeLong: CompactDateRange = new CompactDateRange(
  new CompactDate(convertIsoToCompact(startLong)),
  new CompactDate(convertIsoToCompact(endLong))
);

const momentStart = moment.utc(startLong);
const momentEnd = moment.utc(endLong);
const momentDateRange = new DateRange(momentStart, momentEnd);

const startDateTime = DateTime.fromISO(startLong).toUTC();
const endDateTime = DateTime.fromISO(endLong).toUTC();

const duration = Duration.fromObject({ minutes: stepMinutes });

// Create a new benchmark suite
const suite = new Benchmark.Suite();

suite
  .add(`getTimelineCompressionRange Long`, () => {
    getTimelineCompressionRange(startLong, endLong);
  })
  .add(`getTimelineCompressionRange Mid`, () => {
    getTimelineCompressionRange(startMid, endMid);
  })
  .add(`getTimelineCompressionRange Short`, () => {
    getTimelineCompressionRange(startShort, endShort);
  })

  // .add(`CompactDateRange`, () => {
  //   new CompactDateRange(
  //     new CompactDate(convertIsoToCompact(startLong)),
  //     new CompactDate(convertIsoToCompact(endLong))
  //   );
  // })

  // .add(`dateRange.diff("seconds");`, () => {
  //   dateRangeLong.diff("seconds");
  // })

  // .add(`dateRange.diff("minutes");`, () => {
  //   dateRangeLong.diff("minutes");
  // })

  // .add(`dateRange.diff("days");`, () => {
  //   dateRangeLong.diff("days");
  // })

  // .add(`dateRange.diff("months");`, () => {
  //   dateRangeLong.diff("months");
  // })

  // .add(`dateRange.byEncoreMoinsNulos`, () => {
  //   dateRangeLong.byEncoreMoinsNulos("minutes", { step });
  // })

  // .add(`momentDateRange.by`, () => {
  //   Array.from(momentDateRange.by("minutes", { step }));
  // })

  // .add(`interval.splitBy`, () => {
  //   interval.splitBy(duration);
  // })

  // .add(`interval.divideEqually`, () => {
  //   interval.divideEqually(step);
  // })

  // .add(`interval.plus`, () => {
  //   interval.start!.plus(duration);
  // })

  // .add(`momentDateRange.by`, () => {
  //   Duration.fromObject({ minutes: step });
  // })

  // .add(`start <= end`, () => {
  //   startDateTime <= endDateTime;
  // })

  // .add(`toLuxon`, () => {
  //   startCompactLong.toLuxon();
  // })

  // .add(`convertLuxonToCompactDate`, () => {
  //   convertLuxonToCompactDate(startDateTime);
  // })

  // Add listeners
  .on("cycle", (event: Benchmark.Event) => {
    console.log(String(event.target));
  })

  // Run the benchmark suite
  .run({ async: true });
