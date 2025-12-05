import * as moment from 'moment';
import { Moment, MomentInput } from 'moment';


/**
 * Date format used internally for operations
 */
export const CompactFormat = 'YYYYMMDDHHmmss';

/**
 * Method to get a string of timestamp (utc) in format 'YYYYMMDDHHmmss'.
 * @param {*} timestamp moment object
 */
export const convertUTCToString = (timestamp: Moment) => {
  if (!timestamp) return undefined;
  return timestamp.utc().format(CompactFormat);
};

/**
 * Method to get a moment (utc) object in a predefined format
 * @param {*} timestamp string timestamp formatted like this 'YYYYMMDDHHmmss'.
 *
 * return a formatted timestamp
 */
export function convertStringToUTC(timestamp: MomentInput): moment.Moment {
  return moment.utc(timestamp, CompactFormat);
}

/**
 * Convert a date into a "compact" string. See {@link CompactFormat}.
 * @param timestamp The date to convert
 */
export const formatToCompact = (timestamp: Moment) => {
  return timestamp.format(CompactFormat);
};
