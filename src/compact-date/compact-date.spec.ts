import * as moment from "moment";
import { convertStringToUTC, formatToCompact } from "./time.utils";
import { CompactDate } from "./compact-date";

describe("constructor", () => {
  it("empty constructor should return current date", () => {
    const dateCompact = new CompactDate();
    const result = dateCompact.date;

    const dateMoment = moment.utc();
    const expected = formatToCompact(dateMoment);

    expect(result).toEqual(expected);
  });

  it("using another format than CompactFormat should return an error", () => {
    expect(() => new CompactDate("2024-01-10T23:05:33.000Z")).toThrow(
      "Date should be in CompactFormat"
    );
  });
});

describe("isValid", () => {
  it("should return true if date is well formatted", () => {
    const date = "20191222134335";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false if month is not well formatted", () => {
    const date = "20191300000000";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false if day is not well formatted", () => {
    const date = "20191235000000";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });
  it("should return false if hour is not well formatted", () => {
    const date = "20191200260000";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false if minute is not well formatted", () => {
    const date = "20191200006700";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false if minute is not well formatted", () => {
    const date = "20191200000067";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false on february 30th", () => {
    const date = "20190230000000";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });
});

describe("validateDate", () => {
  it("should return a CompactDate if date is well formatted", () => {
    const date = "20191222134335";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid()
    );
  });

  it("should return undefined if date is undefined", () => {
    const date = undefined;

    expect(() => CompactDate.validateDate(date!)).toThrow();
  });

  it("should return undefined if date is null", () => {
    const date = null;

    expect(() => CompactDate.validateDate(date!)).toThrow();
  });

  it("should return undefined if month is not well formatted", () => {
    const date = "20191300000000";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });

  it("should return undefined if day is not well formatted", () => {
    const date = "20191235000000";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });
  it("should return undefined if hour is not well formatted", () => {
    const date = "20191200260000";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });

  it("should return undefined if minute is not well formatted", () => {
    const date = "20191200006700";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });

  it("should return undefined if minute is not well formatted", () => {
    const date = "20191200000067";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });

  it("should return undefined on february 30th", () => {
    const date = "20190230000000";

    expect(() => CompactDate.validateDate(date)).toThrow();
  });
});

describe("isCompactDate", () => {
  it("should return true", () => {
    const date = new CompactDate("20250101000000");
    expect(CompactDate.isCompactDate(date)).toEqual(true);
  });

  it("should return false", () => {
    const dateObj = { date: "20250101000000" };
    const userObj = { user: "firstname" };
    expect(CompactDate.isCompactDate(null)).toEqual(false);
    expect(CompactDate.isCompactDate(undefined)).toEqual(false);
    expect(CompactDate.isCompactDate("20250101000000")).toEqual(false);
    expect(CompactDate.isCompactDate(userObj)).toEqual(false);
    expect(CompactDate.isCompactDate(dateObj)).toEqual(false);
  });
});

describe("isAfter", () => {
  it("should return true", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240405123600");
    const resultIsAfter = date1.isAfter(date2);
    const resultComparison = date1 > date2;

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240405123600");
    const expected = dateMoment1.isAfter(dateMoment2);

    expect(resultIsAfter).toEqual(expected);
    expect(resultComparison).toEqual(expected);
  });
  it("should return false", () => {
    const date1 = new CompactDate("20240405123600");
    const date2 = new CompactDate("20240405123625");
    const resultIsAfter = date1.isAfter(date2);
    const resultComparison = date1 > date2;

    const dateMoment1 = convertStringToUTC("20240405123600");
    const dateMoment2 = convertStringToUTC("20240405123625");
    const expected = dateMoment1.isAfter(dateMoment2);

    expect(resultIsAfter).toEqual(expected);
    expect(resultComparison).toEqual(expected);
  });
});

describe("min", () => {
  it("min should return the earlier of two dates", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = formatToCompact(moment.min(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });

  it("min should return the earlier date when the first date is later", () => {
    const date1 = new CompactDate("20240410123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240410123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = formatToCompact(moment.min(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });

  it("min should return either date when both dates are the same", () => {
    const date1 = new CompactDate("20240407123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240407123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = formatToCompact(moment.min(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });
});

describe("max", () => {
  it("max should return the later of two dates", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.max(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = formatToCompact(moment.max(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });

  it("max should return the later date when the first date is earlier", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240410123625");
    const result = CompactDate.max(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240410123625");
    const expected = formatToCompact(moment.max(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });

  it("max should return either date when both dates are the same", () => {
    const date1 = new CompactDate("20240407123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.max(date1, date2).date;

    const dateMoment1 = convertStringToUTC("20240407123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = formatToCompact(moment.max(dateMoment1, dateMoment2));

    expect(result).toEqual(expected);
  });
});

describe("startOf", () => {
  it("should return start of year", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("year").date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.startOf("year"));

    expect(result).toEqual(expected);
  });
  it("should return start of month", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("month").date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.startOf("month"));

    expect(result).toEqual(expected);
  });
  it("should return start of day", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("day").date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.startOf("day"));

    expect(result).toEqual(expected);
  });
});

describe("year", () => {
  it("should return date year", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.year();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.year();

    expect(result).toEqual(expected);
  });
  it("should set date year", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.year(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.year(1));

    expect(result).toEqual(expected);
  });
  it("should set date year for 0", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.year(0).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.year(0));

    expect(result).toEqual(expected);
  });
  it("should throw error when year is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.year(-1)).toThrow(Error);
    expect(() => dateCompact.year(10_000)).toThrow(Error);
  });
});
describe("month", () => {
  it("should return date month", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.month();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.month();

    expect(result).toEqual(expected);
  });
  it("should set date month", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.month(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.month(1));

    expect(result).toEqual(expected);
  });
  it("should throw error when month is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.month(0)).toThrow(Error);
    expect(() => dateCompact.month(13)).toThrow(Error);
  });
});
describe("day", () => {
  it("should return date day", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.day();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.date();

    expect(result).toEqual(expected);
  });
  it("should set date day", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.day(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.date(1));

    expect(result).toEqual(expected);
  });
  it("should throw error when day is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.day(0)).toThrow(Error);
    expect(() => dateCompact.day(32)).toThrow(Error);
  });
});
describe("hour", () => {
  it("should return date hour", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.hour();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.hour();

    expect(result).toEqual(expected);
  });
  it("should set date hour", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.hour(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.hour(1));

    expect(result).toEqual(expected);
  });
  it("should set date hour for zero", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.hour(0).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.hour(0));

    expect(result).toEqual(expected);
  });
  it("should throw error when hour is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.hour(-1)).toThrow(Error);
    expect(() => dateCompact.hour(24)).toThrow(Error);
  });
});
describe("minute", () => {
  it("should return date minute", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.minute();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.minute();

    expect(result).toEqual(expected);
  });
  it("should set date minute", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.minute(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.minute(1));

    expect(result).toEqual(expected);
  });
  it("should set date minute for zero", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.minute(0).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.minute(0));

    expect(result).toEqual(expected);
  });
  it("should throw error when minute is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.minute(-1)).toThrow(Error);
    expect(() => dateCompact.minute(60)).toThrow(Error);
  });
});
describe("second", () => {
  it("should return date second", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.second();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.second();

    expect(result).toEqual(expected);
  });
  it("should set date second", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.second(1).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.second(1));

    expect(result).toEqual(expected);
  });
  it("should set date second", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.second(0).date;

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = formatToCompact(dateMoment.second(0));

    expect(result).toEqual(expected);
  });
  it("should throw error when second is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.second(-1)).toThrow(Error);
    expect(() => dateCompact.second(60)).toThrow(Error);
  });
});

describe("toISOString", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toISOString();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toISOString();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
});
describe("toBigQueryFormatUTC", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toBigQueryFormatUTC();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.format("YYYY-MM-DD HH:mm:ss [UTC]");

    expect(result).toEqual(expected);
  });
});
describe("toHumanFriendlyFormat", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toHumanFriendlyFormat();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.format("YYYY-MM-DD - HH:mm:ss");

    expect(result).toEqual(expected);
  });
});
describe("toLuxon", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toLuxon().toISO();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
});
describe("toDate", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toDate().toISOString();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
});

describe("add", () => {
  it("should handle multiple years added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(5, "years");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(5, "years");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple months added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(25, "months");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(25, "months");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple days added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(125, "days");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(125, "days");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple hours added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(1250, "hours");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(1250, "hours");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple minutes added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(12500, "minutes");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(12500, "minutes");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple seconds added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(12500, "seconds");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(12500, "seconds");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should handle multiple seconds subtracted", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(-12500, "seconds");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(-12500, "seconds");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });

  it("should work on leap year 2016", () => {
    const compactDate = new CompactDate("20161231235900");
    const compactDateAdded = compactDate.add(120, "seconds");
    const result = compactDateAdded.date;

    const momentDate = convertStringToUTC("20161231235900");
    momentDate.add(120, "seconds");
    const expected = formatToCompact(momentDate);
    expect(result).toEqual(expected);
  });
});

describe("diff", () => {
  it("simple units: should work in simple case", () => {
    const firstDate = new CompactDate("20270605023000");
    const secondDate = new CompactDate("20250101123400");
    const resultHours = firstDate.diff(secondDate, "hours");
    const resultMinutes = firstDate.diff(secondDate, "minutes");
    const resultSeconds = firstDate.diff(secondDate, "seconds");

    const firstDateMoment = convertStringToUTC("20270605023000");
    const secondDateMoment = convertStringToUTC("20250101123400");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minute");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
  });
  it("simple units: should work in simple case inverted", () => {
    const firstDate = new CompactDate("20250101123400");
    const secondDate = new CompactDate("20270605023000");
    const resultHours = firstDate.diff(secondDate, "hours");
    const resultMinutes = firstDate.diff(secondDate, "minutes");
    const resultSeconds = firstDate.diff(secondDate, "seconds");

    const firstDateMoment = convertStringToUTC("20250101123400");
    const secondDateMoment = convertStringToUTC("20270605023000");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minutes");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
  });
  it("simple units: should work on leap year 2016", () => {
    const firstDate = new CompactDate("20161201123400");
    const secondDate = new CompactDate("20170105023000");
    const resultHours = firstDate.diff(secondDate, "hours");
    const resultMinutes = firstDate.diff(secondDate, "minutes");
    const resultSeconds = firstDate.diff(secondDate, "seconds");

    const firstDateMoment = convertStringToUTC("20161201123400");
    const secondDateMoment = convertStringToUTC("20170105023000");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minutes");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
  });
  it("days unit: should handle month change", () => {
    const firstDate = new CompactDate("20240225000000");
    const secondDate = new CompactDate("20240110000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20240225000000");
    const secondDateMoment = convertStringToUTC("20240110000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });
  it("days unit: should handle month change inverted", () => {
    const firstDate = new CompactDate("20240110000000");
    const secondDate = new CompactDate("20240225000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20240110000000");
    const secondDateMoment = convertStringToUTC("20240225000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });

  it("month units: should return zero when no month change", () => {
    const firstDate = new CompactDate("20240210000000");
    const secondDate = new CompactDate("20240225000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240210000000");
    const secondDateMoment = convertStringToUTC("20240225000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should return zero when no month change inverted", () => {
    const firstDate = new CompactDate("20240225000000");
    const secondDate = new CompactDate("20240210000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240225000000");
    const secondDateMoment = convertStringToUTC("20240210000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should handle year change", () => {
    const firstDate = new CompactDate("20250225000000");
    const secondDate = new CompactDate("20240110000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20250225000000");
    const secondDateMoment = convertStringToUTC("20240110000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });
  it("month units: should handle multiple year change", () => {
    const firstDate = new CompactDate("20260225000000");
    const secondDate = new CompactDate("20240110000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20260225000000");
    const secondDateMoment = convertStringToUTC("20240110000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });
  it("month units: should handle year change inverted", () => {
    const firstDate = new CompactDate("20240110000000");
    const secondDate = new CompactDate("20250225000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20240110000000");
    const secondDateMoment = convertStringToUTC("20250225000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });
  it("month units: should handle multiple year change inverted", () => {
    const firstDate = new CompactDate("20240110000000");
    const secondDate = new CompactDate("20260225000000");
    const result = firstDate.diff(secondDate, "days");

    const firstDateMoment = convertStringToUTC("20240110000000");
    const secondDateMoment = convertStringToUTC("20260225000000");
    const expected = firstDateMoment.diff(secondDateMoment, "days");

    expect(result).toEqual(expected);
  });
  it("month units: should handle multiple month changes", () => {
    const firstDate = new CompactDate("20240210000000");
    const secondDate = new CompactDate("20240725000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240210000000");
    const secondDateMoment = convertStringToUTC("20240725000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should work on exact same day", () => {
    const firstDate = new CompactDate("20240215000000");
    const secondDate = new CompactDate("20240415000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215000000");
    const secondDateMoment = convertStringToUTC("20240415000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should work on exact same dates", () => {
    const firstDate = new CompactDate("20240215000000");
    const secondDate = new CompactDate("20240215000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215000000");
    const secondDateMoment = convertStringToUTC("20240215000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should work on exact start of month", () => {
    const firstDate = new CompactDate("20240201000000");
    const secondDate = new CompactDate("20240301000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240201000000");
    const secondDateMoment = convertStringToUTC("20240301000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the days", () => {
    const firstDate = new CompactDate("20240215000000");
    const secondDate = new CompactDate("20240414000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215000000");
    const secondDateMoment = convertStringToUTC("20240414000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the hours", () => {
    const firstDate = new CompactDate("20240215050000");
    const secondDate = new CompactDate("20240415040000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215050000");
    const secondDateMoment = convertStringToUTC("20240415040000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the minutes", () => {
    const firstDate = new CompactDate("20240215050700");
    const secondDate = new CompactDate("20240415050600");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215050700");
    const secondDateMoment = convertStringToUTC("20240415050600");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the seconds", () => {
    const firstDate = new CompactDate("20240215050713");
    const secondDate = new CompactDate("20240415050712");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240215050713");
    const secondDateMoment = convertStringToUTC("20240415050712");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the days inverted", () => {
    const firstDate = new CompactDate("20240414000000");
    const secondDate = new CompactDate("20240215000000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240414000000");
    const secondDateMoment = convertStringToUTC("20240215000000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the hours", () => {
    const firstDate = new CompactDate("20240415040000");
    const secondDate = new CompactDate("20240215050000");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240415040000");
    const secondDateMoment = convertStringToUTC("20240215050000");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the minutes", () => {
    const firstDate = new CompactDate("20240415050600");
    const secondDate = new CompactDate("20240215050700");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240415050600");
    const secondDateMoment = convertStringToUTC("20240215050700");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });
  it("month units: should take into account the seconds", () => {
    const firstDate = new CompactDate("20240415050712");
    const secondDate = new CompactDate("20240215050713");
    const result = firstDate.diff(secondDate, "months");

    const firstDateMoment = convertStringToUTC("20240415050712");
    const secondDateMoment = convertStringToUTC("20240215050713");
    const expected = firstDateMoment.diff(secondDateMoment, "months");

    expect(result).toEqual(expected);
  });

  it("years units: should work in simple case", () => {
    const firstDate = new CompactDate("20270405000000");
    const secondDate = new CompactDate("20240401000000");
    const result = firstDate.diff(secondDate, "years");

    const firstDateMoment = convertStringToUTC("20270405000000");
    const secondDateMoment = convertStringToUTC("20240401000000");
    const expected = firstDateMoment.diff(secondDateMoment, "years");

    expect(result).toEqual(expected);
  });
  it("years units: should work in simple case inverted", () => {
    const firstDate = new CompactDate("20240401000000");
    const secondDate = new CompactDate("20270405000000");
    const result = firstDate.diff(secondDate, "years");

    const firstDateMoment = convertStringToUTC("20240401000000");
    const secondDateMoment = convertStringToUTC("20270405000000");
    const expected = firstDateMoment.diff(secondDateMoment, "years");

    expect(result).toEqual(expected);
  });
});
