import * as moment from "moment";
import { convertStringToUTC } from "./time.utils";
import { CompactDate } from "./compact-date";

describe("constructor", () => {
  it("should handle CompactFormat", () => {
    const date = "20241114230533";
    const dateCompact = new CompactDate(date);
    const result = dateCompact.toISOString();

    const dateMoment = convertStringToUTC(date);
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });

  it("should handle CompactFormatMs", () => {
    const date = "20241114230533.123";
    const dateCompact = new CompactDate(date);
    const result = dateCompact.toISOString();

    const dateMoment = convertStringToUTC(date);
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });

  it("using another format should return an error", () => {
    expect(() => new CompactDate("2024-01-10T23:05:33.000Z")).toThrow(
      "Date should be in CompactFormat",
    );
  });
});

describe("get", () => {
  it("should handle an input without ms", () => {
    const date = "20241114230533";
    const dateCompact = new CompactDate(date);
    expect(dateCompact.date).toEqual(date);
  });

  it("should handle an input with ms", () => {
    const date = "20241114230533.123";
    const dateCompact = new CompactDate(date);
    expect(dateCompact.date).toEqual(date);
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

  it("should return false if second is not well formatted", () => {
    const date = "20191200000067";
    const dateCompact = new CompactDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(dateCompact.isValid()).toEqual(dateMoment.isValid());
  });

  it("should return false if millisecond is not well formatted", () => {
    const date = "20191200000000.abc";
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

describe("validateFormat", () => {
  it("should validate YYYYMMDDHHmmss", () => {
    expect(CompactDate.validateFormat("20230101000000")).toEqual(true);
  });

  it("should validate YYYYMMDDHHmmss.SSS", () => {
    expect(CompactDate.validateFormat("20230101000000.123")).toEqual(true);
  });
});

describe("now", () => {
  beforeEach(() => {
    // Make sure "now" methods are synchronised to the millisecond
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-04-20T10:15:30.123Z"));
  });

  afterEach(() => {
    // Reset
    jest.useRealTimers();
  });

  it("should return current date", () => {
    const result = CompactDate.now().toISOString();

    const dateNow = new Date();
    dateNow.setMilliseconds(0);

    expect(result).toEqual(dateNow.toISOString());
  });

  it("should return current date with ms", () => {
    const result = CompactDate.now(true).toISOString();

    const dateNow = new Date();

    expect(result).toEqual(dateNow.toISOString());
  });
});

describe("validateDate", () => {
  it("should return a CompactDate if date is well formatted", () => {
    const date = "20191222134335";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if date is undefined", () => {
    const date = undefined;
    const dateCompact = CompactDate.validateDate(date as unknown as string);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if date is null", () => {
    const date = null;
    const dateCompact = CompactDate.validateDate(date as unknown as string);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if month is not well formatted", () => {
    const date = "20191300000000";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if day is not well formatted", () => {
    const date = "20191235000000";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });
  it("should return undefined if hour is not well formatted", () => {
    const date = "20191200260000";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if minute is not well formatted", () => {
    const date = "20191200006700";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if second is not well formatted", () => {
    const date = "20191200000067";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined if millisecond is not well formatted", () => {
    const date = "20191200000000.abc";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });

  it("should return undefined on february 30th", () => {
    const date = "20190230000000";
    const dateCompact = CompactDate.validateDate(date);

    const dateMoment = convertStringToUTC(date);

    expect(CompactDate.isCompactDate(dateCompact)).toEqual(
      dateMoment.isValid(),
    );
  });
});

describe("isCompactDate", () => {
  it("should return true", () => {
    const date = new CompactDate("20250101000000");
    const dateMs = new CompactDate("20250101000000.123");
    expect(CompactDate.isCompactDate(date)).toEqual(true);
    expect(CompactDate.isCompactDate(dateMs)).toEqual(true);
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

describe("isSame", () => {
  it("should return true", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240405123625.000");

    expect(date1.isSame(date2)).toEqual(true);
  });

  it("should return false", () => {
    const date1 = new CompactDate("20240405123625.123");
    const date2 = new CompactDate("20240405123625.321");

    expect(date1.isSame(date2)).toEqual(false);
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

  it("should return true, with ms", () => {
    const date1 = new CompactDate("20240405123600.321");
    const date2 = new CompactDate("20240405123600.123");
    const resultIsAfter = date1.isAfter(date2);
    const resultComparison = date1 > date2;

    const dateMoment1 = convertStringToUTC("20240405123600.321");
    const dateMoment2 = convertStringToUTC("20240405123600.123");
    const expected = dateMoment1.isAfter(dateMoment2);

    expect(resultIsAfter).toEqual(expected);
    expect(resultComparison).toEqual(expected);
  });
  it("should return false, with ms", () => {
    const date1 = new CompactDate("20240405123600.123");
    const date2 = new CompactDate("20240405123600.321");
    const resultIsAfter = date1.isAfter(date2);
    const resultComparison = date1 > date2;

    const dateMoment1 = convertStringToUTC("20240405123600.123");
    const dateMoment2 = convertStringToUTC("20240405123600.321");
    const expected = dateMoment1.isAfter(dateMoment2);

    expect(resultIsAfter).toEqual(expected);
    expect(resultComparison).toEqual(expected);
  });
});

describe("min", () => {
  it("min should return the earlier of two dates", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = moment.min(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("min should return the earlier date when the first date is later", () => {
    const date1 = new CompactDate("20240410123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240410123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = moment.min(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("min should return either date when both dates are the same", () => {
    const date1 = new CompactDate("20240407123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.min(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240407123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = moment.min(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("min should handle milliseconds", () => {
    const date1 = new CompactDate("20240407123625.123");
    const date2 = new CompactDate("20240407123625.321");
    const result = CompactDate.min(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240407123625.123");
    const dateMoment2 = convertStringToUTC("20240407123625.321");
    const expected = moment.min(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });
});

describe("max", () => {
  it("max should return the later of two dates", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.max(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = moment.max(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("max should return the later date when the first date is earlier", () => {
    const date1 = new CompactDate("20240405123625");
    const date2 = new CompactDate("20240410123625");
    const result = CompactDate.max(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240405123625");
    const dateMoment2 = convertStringToUTC("20240410123625");
    const expected = moment.max(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("max should return either date when both dates are the same", () => {
    const date1 = new CompactDate("20240407123625");
    const date2 = new CompactDate("20240407123625");
    const result = CompactDate.max(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240407123625");
    const dateMoment2 = convertStringToUTC("20240407123625");
    const expected = moment.max(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });

  it("max should handle milliseconds", () => {
    const date1 = new CompactDate("20240407123625.123");
    const date2 = new CompactDate("20240407123625.321");
    const result = CompactDate.max(date1, date2).toISOString();

    const dateMoment1 = convertStringToUTC("20240407123625.123");
    const dateMoment2 = convertStringToUTC("20240407123625.321");
    const expected = moment.max(dateMoment1, dateMoment2).toISOString();

    expect(result).toEqual(expected);
  });
});

describe("startOf", () => {
  it("should return start of year", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("year").toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.startOf("year").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of month", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("month").toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.startOf("month").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of day", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("day").toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.startOf("day").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of minute", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.startOf("minute").toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.startOf("minute").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of year, with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.startOf("year").toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.startOf("year").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of month, with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.startOf("month").toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.startOf("month").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of day, with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.startOf("day").toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.startOf("day").toISOString();

    expect(result).toEqual(expected);
  });
  it("should return start of minute, with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.startOf("minute").toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.startOf("minute").toISOString();

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
  it("should return date year with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.year();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.year();

    expect(result).toEqual(expected);
  });
  it("should set date year", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.year(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.year(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date year with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.year(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.year(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date year for 0", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.year(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.year(0).toISOString();

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
  it("should return date month with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.month();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.month();

    expect(result).toEqual(expected);
  });
  it("should set date month", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.month(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.month(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date month with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.month(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.month(1).toISOString();

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
  it("should return date day with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.day();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.date();

    expect(result).toEqual(expected);
  });
  it("should set date day", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.day(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.date(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date day with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.day(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.date(1).toISOString();

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
  it("should return date hour with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.hour();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.hour();

    expect(result).toEqual(expected);
  });
  it("should set date hour", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.hour(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.hour(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date hour with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.hour(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.hour(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date hour for zero", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.hour(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.hour(0).toISOString();

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
  it("should return date minute with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.minute();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.minute();

    expect(result).toEqual(expected);
  });
  it("should set date minute", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.minute(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.minute(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date minute with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.minute(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.minute(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date minute for zero", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.minute(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.minute(0).toISOString();

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
  it("should return date second with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.second();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.second();

    expect(result).toEqual(expected);
  });
  it("should set date second", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.second(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.second(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date second with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.second(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.second(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date second", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.second(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.second(0).toISOString();

    expect(result).toEqual(expected);
  });
  it("should throw error when second is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.second(-1)).toThrow(Error);
    expect(() => dateCompact.second(60)).toThrow(Error);
  });
});
describe("millisecond", () => {
  it("should return date millisecond", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.millisecond();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.millisecond();

    expect(result).toEqual(expected);
  });
  it("should return date millisecond with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.millisecond();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.millisecond();

    expect(result).toEqual(expected);
  });
  it("should set date millisecond", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.millisecond(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.millisecond(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date millisecond with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.millisecond(1).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.millisecond(1).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date millisecond", () => {
    const dateCompact = new CompactDate("20241114230533");
    const result = dateCompact.millisecond(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533");
    const expected = dateMoment.millisecond(0).toISOString();

    expect(result).toEqual(expected);
  });
  it("should set date millisecond with ms", () => {
    const dateCompact = new CompactDate("20241114230533.123");
    const result = dateCompact.millisecond(0).toISOString();

    const dateMoment = convertStringToUTC("20241114230533.123");
    const expected = dateMoment.millisecond(0).toISOString();

    expect(result).toEqual(expected);
  });

  it("should handle a set millisecond to zero", () => {
    const date = "20241114230533.123";
    const dateCompact = new CompactDate(date);

    dateCompact.millisecond(0);

    const expected = "20241114230533";

    expect(dateCompact.date).toEqual(expected);
  });

  it("should handle a set millisecond to a non zero value", () => {
    const date = "20241114230533";
    const dateCompact = new CompactDate(date);
    dateCompact.millisecond(321);

    const expected = "20241114230533.321";

    expect(dateCompact.date).toEqual(expected);
  });

  it("should throw error when millisecond is not in valid range", () => {
    const dateCompact = new CompactDate("20241114230533");

    expect(() => dateCompact.millisecond(-1)).toThrow(Error);
    expect(() => dateCompact.millisecond(1000)).toThrow(Error);
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
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toISOString();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
});

describe("toISODisplay", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toISODisplay();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.format("YYYY-MM-DD HH:mm:ss");

    expect(result).toEqual(expected);
  });
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toISODisplay();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.format("YYYY-MM-DD HH:mm:ss.SSS");

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
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toBigQueryFormatUTC();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.format("YYYY-MM-DD HH:mm:ss.SSS [UTC]");

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
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toHumanFriendlyFormat();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.format("YYYY-MM-DD - HH:mm:ss.SSS");

    expect(result).toEqual(expected);
  });
});

describe("toInstant", () => {
  it("should return the date well formatted", () => {
    const date = new CompactDate("20240110230533");
    const result = date.toInstant().toString();

    const dateMoment = convertStringToUTC("20240110230533");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toInstant().toString();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.toISOString();

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
  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toLuxon().toISO();

    const dateMoment = convertStringToUTC("20240110230533.123");
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

  it("should return the date well formatted with ms", () => {
    const date = new CompactDate("20240110230533.123");
    const result = date.toDate().toISOString();

    const dateMoment = convertStringToUTC("20240110230533.123");
    const expected = dateMoment.toISOString();

    expect(result).toEqual(expected);
  });
});

describe("add", () => {
  it("should handle multiple years added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(5, "years");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(5, "years");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple months added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(25, "months");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(25, "months");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple days added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(125, "days");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(125, "days");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple hours added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(1250, "hours");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(1250, "hours");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple minutes added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(12500, "minutes");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(12500, "minutes");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple seconds added", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(12500, "seconds");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(12500, "seconds");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should handle multiple seconds subtracted", () => {
    const compactDate = new CompactDate("20240225000000");
    const compactDateAdded = compactDate.add(-12500, "seconds");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20240225000000");
    momentDate.add(-12500, "seconds");
    const expected = momentDate.toISOString();
    expect(result).toEqual(expected);
  });

  it("should work on leap year 2016", () => {
    const compactDate = new CompactDate("20161231235900");
    const compactDateAdded = compactDate.add(120, "seconds");
    const result = compactDateAdded.toISOString();

    const momentDate = convertStringToUTC("20161231235900");
    momentDate.add(120, "seconds");
    const expected = momentDate.toISOString();
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
    const resultMilliSeconds = firstDate.diff(secondDate, "milliseconds");

    const firstDateMoment = convertStringToUTC("20270605023000");
    const secondDateMoment = convertStringToUTC("20250101123400");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minute");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");
    const expectedMilliSeconds = firstDateMoment.diff(
      secondDateMoment,
      "milliseconds",
    );

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
    expect(resultMilliSeconds).toEqual(expectedMilliSeconds);
  });
  it("simple units: should work in simple case inverted", () => {
    const firstDate = new CompactDate("20250101123400");
    const secondDate = new CompactDate("20270605023000");
    const resultHours = firstDate.diff(secondDate, "hours");
    const resultMinutes = firstDate.diff(secondDate, "minutes");
    const resultSeconds = firstDate.diff(secondDate, "seconds");
    const resultMilliSeconds = firstDate.diff(secondDate, "milliseconds");

    const firstDateMoment = convertStringToUTC("20250101123400");
    const secondDateMoment = convertStringToUTC("20270605023000");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minutes");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");
    const expectedMilliSeconds = firstDateMoment.diff(
      secondDateMoment,
      "milliseconds",
    );

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
    expect(resultMilliSeconds).toEqual(expectedMilliSeconds);
  });
  it("simple units: should work on leap year 2016", () => {
    const firstDate = new CompactDate("20161201123400");
    const secondDate = new CompactDate("20170105023000");
    const resultHours = firstDate.diff(secondDate, "hours");
    const resultMinutes = firstDate.diff(secondDate, "minutes");
    const resultSeconds = firstDate.diff(secondDate, "seconds");
    const resultMilliSeconds = firstDate.diff(secondDate, "milliseconds");

    const firstDateMoment = convertStringToUTC("20161201123400");
    const secondDateMoment = convertStringToUTC("20170105023000");
    const expectedHours = firstDateMoment.diff(secondDateMoment, "hours");
    const expectedMinutes = firstDateMoment.diff(secondDateMoment, "minutes");
    const expectedSeconds = firstDateMoment.diff(secondDateMoment, "seconds");
    const expectedMilliSeconds = firstDateMoment.diff(
      secondDateMoment,
      "milliseconds",
    );

    expect(resultHours).toEqual(expectedHours);
    expect(resultMinutes).toEqual(expectedMinutes);
    expect(resultSeconds).toEqual(expectedSeconds);
    expect(resultMilliSeconds).toEqual(expectedMilliSeconds);
  });

  it("milliseconds units: should handle less than one second difference", () => {
    const firstDate = new CompactDate("20240101000000.321");
    const secondDate = new CompactDate("20240101000000");
    const result = firstDate.diff(secondDate, "milliseconds");

    const firstDateMoment = convertStringToUTC("20240101000000.321");
    const secondDateMoment = convertStringToUTC("20240101000000");
    const expected = firstDateMoment.diff(secondDateMoment, "milliseconds");

    expect(result).toEqual(expected);
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
