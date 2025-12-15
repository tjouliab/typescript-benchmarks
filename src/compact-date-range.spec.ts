import { convertMomentToCompactDate } from "./compact-date.utils";
import { CompactDateRange } from "./compact-date-range";
import { DateRange } from "moment-range";
import * as moment from "moment";
import { CompactDate } from "./compact-date";

// Temporary fix for the test but will be changed later
// describe('constructor', () => {
//   it('should return an error if start is after end', () => {
//     const compactStart = new CompactDate('20240410123625');
//     const compactEnd = new CompactDate('20240405123625');
//     expect(() => new CompactDateRange(compactStart, compactEnd)).toThrow(Error);
//   });

//   it('should return an error if start is equal to end', () => {
//     const compactStart = new CompactDate('20240410123625');
//     const compactEnd = new CompactDate('20240410123625');
//     expect(() => new CompactDateRange(compactStart, compactEnd)).toThrow(Error);
//   });
// });

describe("contains", () => {
  const compactStart = new CompactDate("20240405123625");
  const compactEnd = new CompactDate("20240410123625");
  const compactDateRange = new CompactDateRange(compactStart, compactEnd);

  const momentStart = moment.utc("2024-04-05T12:36:25.000Z");
  const momentEnd = moment.utc("2024-04-10T12:36:25.000Z");
  const momentDateRange = new DateRange(momentStart, momentEnd);

  it("contains should return true if the date is within the range, inclusive of both start and end by default", () => {
    const compactCompare = new CompactDate("20240407123625");
    const momentCompare = moment.utc("2024-04-07T12:36:25.000Z");
    expect(compactDateRange.contains(compactCompare)).toEqual(
      momentDateRange.contains(momentCompare)
    );
  });

  it("contains should return false if the date is before the range", () => {
    const compactCompare = new CompactDate("20240403123625");
    const momentCompare = moment.utc("2024-04-03T12:36:25.000Z");
    expect(compactDateRange.contains(compactCompare)).toEqual(
      momentDateRange.contains(momentCompare)
    );
  });

  it("contains should return false if the date is after the range", () => {
    const compactCompare = new CompactDate("20240411123625");
    const momentCompare = moment.utc("2024-04-11T12:36:25.000Z");
    expect(compactDateRange.contains(compactCompare)).toEqual(
      momentDateRange.contains(momentCompare)
    );
  });

  it("contains should return true if the date is exactly the start of the range and excludeStart is false", () => {
    const compactCompare = new CompactDate("20240405123625");
    const momentCompare = moment.utc("2024-04-05T12:36:25.000Z");
    expect(compactDateRange.contains(compactCompare)).toEqual(
      momentDateRange.contains(momentCompare)
    );
  });

  it("contains should return false if the date is exactly the start of the range and excludeStart is true", () => {
    const compactCompare = new CompactDate("20240405123625");
    const momentCompare = moment.utc("2024-04-05T12:36:25.000Z");
    expect(
      compactDateRange.contains(compactCompare, { excludeStart: true })
    ).toEqual(momentDateRange.contains(momentCompare, { excludeStart: true }));
  });

  it("contains should return true if the date is exactly the end of the range and excludeEnd is false", () => {
    const compactCompare = new CompactDate("20240410123625");
    const momentCompare = moment.utc("2024-04-10T12:36:25.000Z");
    expect(compactDateRange.contains(compactCompare)).toEqual(
      momentDateRange.contains(momentCompare)
    );
  });

  it("contains should return false if the date is exactly the end of the range and excludeEnd is true", () => {
    const compactCompare = new CompactDate("20240410123625");
    const momentCompare = moment.utc("2024-04-10T12:36:25.000Z");
    expect(
      compactDateRange.contains(compactCompare, { excludeEnd: true })
    ).toEqual(momentDateRange.contains(momentCompare, { excludeEnd: true }));
  });

  it("contains should return true if the date is after the start and before the end, with excludeStart and excludeEnd true", () => {
    const compactCompare = new CompactDate("20240407123625");
    const momentCompare = moment.utc("2024-04-07T12:36:25.000Z");
    expect(
      compactDateRange.contains(compactCompare, {
        excludeStart: true,
        excludeEnd: true,
      })
    ).toEqual(
      momentDateRange.contains(momentCompare, {
        excludeStart: true,
        excludeEnd: true,
      })
    );
  });
});

describe("overlaps", () => {
  const compactStart1 = new CompactDate("20240405123625");
  const compactEnd1 = new CompactDate("20240410123625");
  const compactDateRange1 = new CompactDateRange(compactStart1, compactEnd1);

  const momentStart1 = moment.utc("2024-04-05T12:36:25.000Z");
  const momentEnd1 = moment.utc("2024-04-10T12:36:25.000Z");
  const momentDateRange1 = new DateRange(momentStart1, momentEnd1);

  it("overlaps should return true if ranges are exactly the same", () => {
    const compactDateRange2 = new CompactDateRange(compactStart1, compactEnd1);
    const momentDateRange2 = new DateRange(momentStart1, momentEnd1);
    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return true if range partially overlaps at the start", () => {
    const compactStart2 = new CompactDate("20240404123625");
    const compactEnd2 = new CompactDate("20240407123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-04T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-07T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return true if range partially overlaps at the end", () => {
    const compactStart2 = new CompactDate("20240408123625");
    const compactEnd2 = new CompactDate("20240411123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-08T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return true if range is fully within the other range", () => {
    const compactStart2 = new CompactDate("20240406123625");
    const compactEnd2 = new CompactDate("20240409123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-06T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-09T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return true if range is fully containing the other range", () => {
    const compactStart2 = new CompactDate("20240401123625");
    const compactEnd2 = new CompactDate("20240411123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-01T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return false if range is before the other range", () => {
    const compactStart2 = new CompactDate("20240401123625");
    const compactEnd2 = new CompactDate("20240404123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-01T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-04T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return false if range is after the other range", () => {
    const compactStart2 = new CompactDate("20240411123625");
    const compactEnd2 = new CompactDate("20240412123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-12T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("default value for option adjacent is true", () => {
    const compactStart2 = new CompactDate("20240410123625");
    const compactEnd2 = new CompactDate("20240411123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-10T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(compactDateRange1.overlaps(compactDateRange2)).toEqual(
      momentDateRange1.overlaps(momentDateRange2)
    );
  });

  it("overlaps should return true if ranges are adjacent and option adjacent is true", () => {
    const compactStart2 = new CompactDate("20240410123625");
    const compactEnd2 = new CompactDate("20240411123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-10T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(
      compactDateRange1.overlaps(compactDateRange2, { adjacent: true })
    ).toEqual(momentDateRange1.overlaps(momentDateRange2, { adjacent: true }));
  });

  it("overlaps should return false if ranges are adjacent and option adjacent is false", () => {
    const compactStart2 = new CompactDate("20240410123625");
    const compactEnd2 = new CompactDate("20240411123625");
    const compactDateRange2 = new CompactDateRange(compactStart2, compactEnd2);

    const momentStart2 = moment.utc("2024-04-10T12:36:25.000Z");
    const momentEnd2 = moment.utc("2024-04-11T12:36:25.000Z");
    const momentDateRange2 = new DateRange(momentStart2, momentEnd2);

    expect(
      compactDateRange1.overlaps(compactDateRange2, { adjacent: false })
    ).toEqual(momentDateRange1.overlaps(momentDateRange2, { adjacent: false }));
  });
});

describe("by", () => {
  const compactStart = new CompactDate("20240405123625");
  const compactEnd = new CompactDate("20240408123625");
  const compactDateRange = new CompactDateRange(compactStart, compactEnd);

  const momentStart = moment.utc("2024-04-05T12:36:25.000Z");
  const momentEnd = moment.utc("2024-04-08T12:36:25.000Z");
  const momentDateRange = new DateRange(momentStart, momentEnd);

  it("should return all dates incremented by 1 year within the range", () => {
    const compactStartYear = new CompactDate("20200405120000");
    const compactEndYear = new CompactDate("20250705150000");
    const compactDateRangeYear = new CompactDateRange(
      compactStartYear,
      compactEndYear
    );

    const momentStart = moment.utc("2020-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2025-07-05T15:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("years")).map((date) =>
      convertMomentToCompactDate(date)
    );
    expect(compactDateRangeYear.by("years")).toEqual(expected);
  });

  it("should return all dates incremented by 2 year within the range", () => {
    const compactStartYear = new CompactDate("20200405120000");
    const compactEndYear = new CompactDate("20250705150000");
    const compactDateRangeYear = new CompactDateRange(
      compactStartYear,
      compactEndYear
    );

    const momentStart = moment.utc("2020-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2025-07-05T15:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("years", { step: 2 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRangeYear.by("years", { step: 2 })).toEqual(expected);
  });

  it("should return all dates incremented by 1 month within the range", () => {
    const compactStartMonth = new CompactDate("20240405120000");
    const compactEndMonth = new CompactDate("20240705150000");
    const compactDateRangeMonth = new CompactDateRange(
      compactStartMonth,
      compactEndMonth
    );

    const momentStart = moment.utc("2024-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2024-07-05T15:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("months")).map((date) =>
      convertMomentToCompactDate(date)
    );
    expect(compactDateRangeMonth.by("months")).toEqual(expected);
  });

  it("should return all dates incremented by 2 month within the range", () => {
    const compactStartMonth = new CompactDate("20240405120000");
    const compactEndMonth = new CompactDate("20240705150000");
    const compactDateRangeMonth = new CompactDateRange(
      compactStartMonth,
      compactEndMonth
    );

    const momentStart = moment.utc("2024-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2024-07-05T15:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("months", { step: 2 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRangeMonth.by("months", { step: 2 })).toEqual(expected);
  });

  it("should return all dates incremented by 1 day within the range", () => {
    const expected = Array.from(momentDateRange.by("days")).map((date) =>
      convertMomentToCompactDate(date)
    );
    expect(compactDateRange.by("days")).toEqual(expected);
  });

  it("should return dates incremented by 2 days within the range", () => {
    const expected = Array.from(momentDateRange.by("days", { step: 2 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRange.by("days", { step: 2 })).toEqual(expected);
  });

  it("should return all dates incremented by 1 hour within the range", () => {
    const compactStartHour = new CompactDate("20240405120000");
    const compactEndHour = new CompactDate("20240405150000");
    const compactDateRangeHour = new CompactDateRange(
      compactStartHour,
      compactEndHour
    );

    const momentStart = moment.utc("2024-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2024-04-05T15:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("hours")).map((date) =>
      convertMomentToCompactDate(date)
    );
    expect(compactDateRangeHour.by("hours")).toEqual(expected);
  });

  it("should return dates incremented by 3 hours within the range", () => {
    const compactStartHour = new CompactDate("20240405120000");
    const compactEndHour = new CompactDate("20240405180000");
    const compactDateRangeHour = new CompactDateRange(
      compactStartHour,
      compactEndHour
    );

    const momentStart = moment.utc("2024-04-05T12:00:00.000Z");
    const momentEnd = moment.utc("2024-04-05T18:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("hours", { step: 3 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRangeHour.by("hours", { step: 3 })).toEqual(expected);
  });

  it("should return dates incremented by 3 minutes within the range", () => {
    const compactStartHour = new CompactDate("20240101000000");
    const compactEndHour = new CompactDate("20240102000000");
    const compactDateRangeHour = new CompactDateRange(
      compactStartHour,
      compactEndHour
    );

    const momentStart = moment.utc("2024-01-01T00:00:00.000Z");
    const momentEnd = moment.utc("2024-01-02T00:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("minutes", { step: 3 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRangeHour.by("minutes", { step: 3 })).toEqual(expected);
  });

  it("should return dates incremented by 3 seconds within the range", () => {
    const compactStartHour = new CompactDate("20240101000000");
    const compactEndHour = new CompactDate("20240102000000");
    const compactDateRangeHour = new CompactDateRange(
      compactStartHour,
      compactEndHour
    );

    const momentStart = moment.utc("2024-01-01T00:00:00.000Z");
    const momentEnd = moment.utc("2024-01-02T00:00:00.000Z");
    const momentDateRange = new DateRange(momentStart, momentEnd);

    const expected = Array.from(momentDateRange.by("seconds", { step: 3 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRangeHour.by("seconds", { step: 3 })).toEqual(expected);
  });

  it("should handle large step size, returning only the start date", () => {
    const expected = Array.from(momentDateRange.by("days", { step: 10 })).map(
      (date) => convertMomentToCompactDate(date)
    );
    expect(compactDateRange.by("days", { step: 10 })).toEqual(expected);
  });
});
