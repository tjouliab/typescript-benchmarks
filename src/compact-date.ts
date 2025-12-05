import { DateTime } from "luxon";
import { CompactFormat, convertStringToUTC } from "./time.utils";
import {
  convertCompactToIso,
  convertCompactToIsoDisplay,
  convertDateToCompactDate,
  convertLuxonToCompactDate,
} from "./compact-date.utils";

export type TimeUnitBase =
  | "years"
  | "months"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";

type TimeUnitStartOf = "year" | "month" | "day";

const ALL_UNITS_ORDERED: TimeUnitBase[] = [
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
];

/**
 * A lightweight date handling class optimized for performance by mimicking the Moment.js library.
 *
 * This class is designed to serve as a high-performance alternative to Moment.js,
 * offering essential date manipulation, comparison, and formatting functionalities.
 *
 * It utilizes a compact date format (`YYYYMMDDHHmmss`) to store date information, allowing for faster
 * operations and easier replacement of Moment.js instances in the codebase.
 * Also, we are using JavaScript's native Date and Luxon for complex operations, ensuring balance between performance and accuracy.
 */
export class CompactDate {
  private _date!: string;

  /**
   * Creates a CompactDate instance from a string in {@link CompactFormat}.
   */
  constructor(compactDateString?: string) {
    if (!compactDateString) {
      // If no date is specified, get the current date
      this.date = convertDateToCompactDate(new Date()).date;
    } else {
      this.date = compactDateString;
    }
  }

  // Declare getter/setter
  public get date(): string {
    return this._date;
  }
  public set date(date: string) {
    // Use length check as it is the fastest way to check for a valid CompactFormat
    if (date.length !== CompactFormat.length) {
      throw new Error(
        `Date should be in CompactFormat: YYYYMMDDHHmmss. Received input: ${date}`
      );
    }
    this._date = date;
  }

  public clone(): CompactDate {
    return new CompactDate(this.date);
  }

  public isValid(): boolean {
    return this.toLuxon().isValid;
  }

  /**
   * An alternative to the constructor that will check explicitly for date validity.
   * The default constructor should be used if there is no need for a
   * @param date string entry in {@link CompactFormat}
   */
  public static validateDate(date: string): CompactDate {
    if (date?.length !== CompactFormat.length) {
      throw Error;
    }
    const dateIso = convertCompactToIso(date);
    const dateLuxon = DateTime.fromISO(dateIso, { zone: "utc" });
    if (!dateLuxon.isValid) {
      throw Error;
    }
    return new CompactDate(date);
  }

  public static isCompactDate(obj: unknown): obj is CompactDate {
    return obj instanceof CompactDate;
  }

  /**
   * Using valueOf permits to use the comparison operators "<", ">", "<=", ">=".
   * Be careful, it does NOT permit to use the operators "===" and "==".
   * Please use the comparison functions instead.
   */
  public valueOf(): string {
    return this.date;
  }

  // Comparison functions
  public isSame(toCompare: CompactDate): boolean {
    return this.date === toCompare.date;
  }
  public isBefore(toCompare: CompactDate): boolean {
    return this.date < toCompare.date;
  }
  public isSameOrBefore(toCompare: CompactDate): boolean {
    return this.date <= toCompare.date;
  }
  public isAfter(toCompare: CompactDate): boolean {
    return this.date > toCompare.date;
  }
  public isSameOrAfter(toCompare: CompactDate): boolean {
    return this.date >= toCompare.date;
  }
  static min(date1: CompactDate, date2: CompactDate): CompactDate {
    return date1.isBefore(date2) ? date1 : date2;
  }
  static max(date1: CompactDate, date2: CompactDate): CompactDate {
    return date1.isAfter(date2) ? date1 : date2;
  }

  // Access/Modify informations
  // Using "== null" permits to check both for null and undefined
  public year(): number;
  public year(year: number): CompactDate;
  public year(year?: number): number | CompactDate {
    if (year == null) {
      return +this.date.substring(0, 4);
    } else if (year < 0 || 9999 < year) {
      throw new Error(
        `Date year not in range 0 - 9999. Received input: ${year}`
      );
    }
    const yearString = year.toString().padStart(4, "0");
    this.date = `${yearString}${this.date.substring(4)}`;
    return this;
  }

  public month(): number;
  public month(month: number): CompactDate;
  public month(month?: number): number | CompactDate {
    if (month == null) {
      return +this.date.substring(4, 6) - 1;
    } else if (month < 1 || 12 < month) {
      throw new Error(
        `Date month not in valid range 1 - 12. Received input: ${month}`
      );
    }
    const monthString = (month + 1).toString().padStart(2, "0");
    this.date = `${this.date.substring(
      0,
      4
    )}${monthString}${this.date.substring(6)}`;
    return this;
  }

  public day(): number;
  public day(day: number): CompactDate;
  public day(day?: number): number | CompactDate {
    if (day == null) {
      return +this.date.substring(6, 8);
    } else if (day < 1 || 31 < day) {
      throw new Error(
        `Date day not in valid range 1 - 31. Received input: ${day}`
      );
    }
    const dayString = day.toString().padStart(2, "0");
    this.date = `${this.date.substring(0, 6)}${dayString}${this.date.substring(
      8
    )}`;
    return this;
  }

  public hour(): number;
  public hour(hour: number): CompactDate;
  public hour(hour?: number): number | CompactDate {
    if (hour == null) {
      return +this.date.substring(8, 10);
    } else if (hour < 0 || 23 < hour) {
      throw new Error(
        `Date hour not in valid range 0 - 23. Received input: ${hour}`
      );
    }
    const hourString = hour.toString().padStart(2, "0");
    this.date = `${this.date.substring(0, 8)}${hourString}${this.date.substring(
      10
    )}`;
    return this;
  }

  public minute(): number;
  public minute(minute: number): CompactDate;
  public minute(minute?: number): number | CompactDate {
    if (minute == null) {
      return +this.date.substring(10, 12);
    } else if (minute < 0 || 59 < minute) {
      throw new Error(
        `Date minute not in valid range 0 - 59. Received input: ${minute}`
      );
    }
    const minuteString = minute.toString().padStart(2, "0");
    this.date = `${this.date.substring(
      0,
      10
    )}${minuteString}${this.date.substring(12)}`;
    return this;
  }

  public second(): number;
  public second(second: number): CompactDate;
  public second(second?: number): number | CompactDate {
    if (second == null) {
      return +this.date.substring(12);
    } else if (second < 0 || 59 < second) {
      throw new Error(
        `Date second not in valid range 0 - 59. Received input: ${second}`
      );
    }
    const secondString = second.toString().padStart(2, "0");
    this.date = `${this.date.substring(0, 12)}${secondString}`;
    return this;
  }

  // Date conversion
  public toISOString(): string {
    return convertCompactToIso(this.date);
  }
  /**
   * ISO display format is YYYY-MM-DD HH:mm:ss
   */
  public toISODisplay(): string {
    return convertCompactToIsoDisplay(this.date);
  }
  public toBigQueryFormatUTC(): string {
    const yearString = this.date.substring(0, 4);
    const monthString = this.date.substring(4, 6);
    const dayString = this.date.substring(6, 8);
    const hourString = this.date.substring(8, 10);
    const minuteString = this.date.substring(10, 12);
    const secondString = this.date.substring(12);
    // YYYY-MM-DD HH:mm:ss UTC
    return `${yearString}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString} UTC`;
  }
  public toHumanFriendlyFormat(): string {
    const yearString = this.date.substring(0, 4);
    const monthString = this.date.substring(4, 6);
    const dayString = this.date.substring(6, 8);
    const hourString = this.date.substring(8, 10);
    const minuteString = this.date.substring(10, 12);
    const secondString = this.date.substring(12);
    // YYYY-MM-DD - HH:mm:ss
    return `${yearString}-${monthString}-${dayString} - ${hourString}:${minuteString}:${secondString}`;
  }
  public toLuxon(): DateTime {
    return DateTime.fromISO(this.toISOString()).toUTC();
  }
  public toMoment(): moment.Moment {
    return convertStringToUTC(this.date);
  }
  public toDate(): Date {
    return new Date(this.toTimestamp());
  }
  public toTimestamp(): number {
    const yearString = +this.date.substring(0, 4);
    const monthString = +this.date.substring(4, 6) - 1;
    const dayString = +this.date.substring(6, 8);
    const hourString = +this.date.substring(8, 10);
    const minuteString = +this.date.substring(10, 12);
    const secondString = +this.date.substring(12);
    return Date.UTC(
      yearString,
      monthString,
      dayString,
      hourString,
      minuteString,
      secondString
    );
  }

  // Date manipulation
  public startOf(unit: TimeUnitStartOf): CompactDate {
    switch (unit) {
      case "year":
        return new CompactDate(this.date.substring(0, 4).concat("0101000000"));
      case "month":
        return new CompactDate(this.date.substring(0, 6).concat("01000000"));
      case "day":
        return new CompactDate(this.date.substring(0, 8).concat("000000"));
    }
  }

  public add(value: number, unit: TimeUnitBase): CompactDate {
    if (!value) {
      return this;
    }
    // On simple units, use native JS Date for faster computation
    if (unit === "seconds") {
      const newTimestamp = this.toTimestamp() + value * 1000;
      return convertDateToCompactDate(new Date(newTimestamp));
    }

    // On complex units, use Luxon to ensure accuracy
    const date = this.toLuxon().plus({ [unit]: value });
    return convertLuxonToCompactDate(date);
  }

  public subtract(value: number, unit: TimeUnitBase): CompactDate {
    return this.add(-value, unit);
  }

  // Date comparison
  public diff(toCompare: CompactDate, unit: TimeUnitBase = "seconds"): number {
    // On simple units, use native JS Date for faster computation
    if (unit === "seconds") {
      return (this.toTimestamp() - toCompare.toTimestamp()) / 1000;
    } else if (unit === "minutes") {
      return (this.toTimestamp() - toCompare.toTimestamp()) / 60_000;
    }

    // On complex units, use Luxon to ensure accuracy
    const firstDate = this.toLuxon();
    const secondDate = toCompare.toLuxon();

    const unitIndex = ALL_UNITS_ORDERED.findIndex((elem) => elem === unit);
    if (unitIndex < 0) {
      throw new Error(`Time unit ${unit} is not supported`);
    }

    // Filtered units allow Luxon to accurately return the duration in requested unit
    const filteredUnits = ALL_UNITS_ORDERED.slice(unitIndex);
    const duration = firstDate.diff(secondDate, filteredUnits);
    return duration.toObject()[unit]!;
  }
}
