import { DateTime } from "luxon";
import { CompactDate } from "./compact-date";
import { CompactFormat, convertUTCToString } from "./time.utils";

/**
 * This function convert ISO formatted string "YYYY-MM-DDTHH:mm:ssZ" or "YYYY-MM-DDTHH:mm:ss.000Z"
 * to compact formatted string {@link CompactFormat}.
 * Please note that this function must take UTC string in input and will return UTC.
 * This behavior is intended, as it permits to have the less compute intensivity possible.
 */
export function convertIsoToCompact(iso: string): string {
  if (iso == null) {
    throw new Error(`ISO date is not defined: ${iso}`);
  }
  return `${iso.substring(0, 4)}${iso.substring(5, 7)}${iso.substring(
    8,
    10
  )}${iso.substring(11, 13)}${iso.substring(14, 16)}${iso.substring(17, 19)}`;
}

/**
 * This function convert ISO formatted string "YYYY-MM-DDTHH:mm:ssZ" or "YYYY-MM-DDTHH:mm:ss.000Z"
 * to CompactDate {@link CompactFormat}.
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
  if (date.length !== CompactFormat.length) {
    return date;
  }
  const yearString = date.substring(0, 4);
  const monthString = date.substring(4, 6);
  const dayString = date.substring(6, 8);
  const hourString = date.substring(8, 10);
  const minuteString = date.substring(10, 12);
  const secondString = date.substring(12);
  // YYYY-MM-DDTHH:mm:ss.000Z
  return `${yearString}-${monthString}-${dayString}T${hourString}:${minuteString}:${secondString}.000Z`;
}

/**
 * ISO display format is YYYY-MM-DD HH:mm:ss
 */
export function convertCompactToIsoDisplay(date: string): string {
  if (date.length !== CompactFormat.length) {
    return date;
  }
  const yearString = date.substring(0, 4);
  const monthString = date.substring(4, 6);
  const dayString = date.substring(6, 8);
  const hourString = date.substring(8, 10);
  const minuteString = date.substring(10, 12);
  const secondString = date.substring(12);
  // YYYY-MM-DD HH:mm:ss
  return `${yearString}-${monthString}-${dayString} ${hourString}:${minuteString}:${secondString}`;
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
    const newDate = date instanceof Date ? date : new Date(date);

    const year = newDate.getUTCFullYear();
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();
    const hours = newDate.getUTCHours();
    const minutes = newDate.getUTCMinutes();
    const seconds = newDate.getUTCSeconds();

    // Custom padding is faster that .padStart
    const compactDate =
      String(year) +
      (month < 10 ? "0" + month : String(month)) +
      (day < 10 ? "0" + day : String(day)) +
      (hours < 10 ? "0" + hours : String(hours)) +
      (minutes < 10 ? "0" + minutes : String(minutes)) +
      (seconds < 10 ? "0" + seconds : String(seconds));

    return new CompactDate(compactDate);
  } catch (e) {
    throw new Error(
      `Error converting date to compact date ${date?.toString()} ${e}`
    );
  }
}
