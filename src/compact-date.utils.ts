import { DateTime } from "luxon";
import { DateRange } from "moment-range";
import { CompactDate } from "./compact-date";
import { CompactDateRange } from "./compact-date-range";
import {
  CompactFormat,
  CompactFormatMs,
  convertStringToUTC,
  convertUTCToString,
  EMPTY_MS,
} from "./time.utils";

/**
 * This function convert ISO formatted string "YYYY-MM-DDTHH:mm:ssZ" or "YYYY-MM-DDTHH:mm:ss.000Z"
 * to compact formatted string {@link CompactFormat} or {@link CompactFormatMs}.
 * Please note that this function must take UTC string in input and will return UTC.
 * This behavior is intended, as it permits to have the less compute intensivity possible.
 */
export function convertIsoToCompact(iso: string): string {
  if (iso == null) {
    throw new Error(`ISO date is not defined: ${iso}`);
  }

  const year = iso.substring(0, 4);
  const month = iso.substring(5, 7);
  const day = iso.substring(8, 10);
  const hours = iso.substring(11, 13);
  const minutes = iso.substring(14, 16);
  const seconds = iso.substring(17, 19);
  const milliSeconds = iso.substring(20, 23) || EMPTY_MS;
  if (milliSeconds === EMPTY_MS || Number.isNaN(+milliSeconds)) {
    // YYYYMMDDHHmmss
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  // YYYYMMDDHHmmss.SSS
  return `${year}${month}${day}${hours}${minutes}${seconds}.${milliSeconds}`;
}

/**
 * This function convert ISO formatted string "YYYY-MM-DDTHH:mm:ssZ" or "YYYY-MM-DDTHH:mm:ss.000Z"
 * to CompactDate {@link CompactFormat} or {@link CompactFormatMs}.
 * Please note that this function must take UTC string in input and will return UTC.
 * This behavior is intended, as it permits to have the less compute intensivity possible.
 */
export function convertIsoToCompactDate(iso: string): CompactDate {
  if (iso == null) {
    throw new Error(`ISO date is not defined: ${iso}`);
  }
  return new CompactDate(convertIsoToCompact(iso));
}

export function convertCompactToIso(date: string): string {
  if (!CompactDate.validateFormat(date)) return date;

  const yearString = date.substring(0, 4);
  const monthString = date.substring(4, 6);
  const dayString = date.substring(6, 8);
  const hourString = date.substring(8, 10);
  const minuteString = date.substring(10, 12);
  const secondString = date.substring(12, 14);
  const milliSecondString = date.substring(15) || EMPTY_MS;
  // YYYY-MM-DDTHH:mm:ss.SSSZ
  return `${yearString}-${monthString}-${dayString}T${hourString}:${minuteString}:${secondString}.${milliSecondString}Z`;
}

/**
 * ISO display format is YYYY-MM-DD HH:mm:ss or YYYY-MM-DD HH:mm:ss.SSS
 */
export function convertCompactToIsoDisplay(date: string): string {
  if (![CompactFormat.length, CompactFormatMs.length].includes(date.length))
    return date;

  const yearString = date.substring(0, 4);
  const monthString = date.substring(4, 6);
  const dayString = date.substring(6, 8);
  const hourString = date.substring(8, 10);
  const minuteString = date.substring(10, 12);
  const secondString = date.substring(12, 14);
  const millisecondString = date.substring(15, 18) || EMPTY_MS;

  if (millisecondString === EMPTY_MS) {
    // YYYY-MM-DD HH:mm:ss
    return `${yearString}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`;
  }
  // YYYY-MM-DD HH:mm:ss.SSS
  return `${yearString}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}.${millisecondString}`;
}

export function convertLuxonToCompactDate(date: DateTime): CompactDate {
  return new CompactDate(convertIsoToCompact(date.toUTC().toISO() ?? ""));
}

export function convertMomentToCompactDate(date: moment.Moment): CompactDate {
  return new CompactDate(convertUTCToString(date));
}

// This way of coding is used because it is faster than the usual `date.toIsoString()`
export function convertDateToCompactDate(date: Date): CompactDate {
  try {
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliSeconds = date.getMilliseconds().toString().padStart(3, "0");

    const compactDate = `${year}${month}${day}${hours}${minutes}${seconds}.${milliSeconds}`;
    return new CompactDate(compactDate);
  } catch (e) {
    throw new Error(
      `Error converting date to compact date ${date?.toString()} ${e}`,
    );
  }
}

export function convertInstantToCompactDate(
  instant: Temporal.Instant,
): CompactDate {
  return convertIsoToCompactDate(instant.toString());
}

export function convertDateTimeToCompactDate(
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

export function compactDateRangeToDateRange(
  compactDateRangeArray: CompactDateRange[],
): DateRange[] {
  const dateRangeArray: DateRange[] = [];
  for (const compactDate of compactDateRangeArray) {
    dateRangeArray.push(
      new DateRange(
        convertStringToUTC(compactDate.start.date),
        convertStringToUTC(compactDate.end.date),
      ),
    );
  }
  return dateRangeArray;
}

export function dateRangetoCompactDateRange(
  dateRangeArray: DateRange[],
): CompactDateRange[] {
  const compactDateRange: CompactDateRange[] = [];
  for (const dateRange of dateRangeArray) {
    compactDateRange.push(
      new CompactDateRange(
        convertMomentToCompactDate(dateRange.start),
        convertMomentToCompactDate(dateRange.end),
      ),
    );
  }
  return compactDateRange;
}

export function isoStringToCompactDateRange(
  start: string,
  end: string,
): CompactDateRange {
  return new CompactDateRange(
    new CompactDate(convertIsoToCompact(start)),
    new CompactDate(convertIsoToCompact(end)),
  );
}
