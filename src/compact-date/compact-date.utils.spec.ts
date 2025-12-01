import * as moment from 'moment';
import {
  convertDateToCompactDate,
  convertIsoToCompact,
  convertLuxonToCompactDate,
  convertMomentToCompactDate,
} from './compact-date.utils';
import { formatToCompact } from './time.utils';
import { CompactDate } from './compact-date';
import { DateTime } from 'luxon';

const timezoneCanada = 'Canada/Atlantic';

describe('convertIsoToCompact', () => {
  it('should return the date well formatted for ISO format', () => {
    const result = convertIsoToCompact('2024-01-10T23:05:33.000Z');

    const dateMoment = moment.utc('2024-01-10T23:05:33.000Z');
    const expected = formatToCompact(dateMoment);

    expect(result).toEqual(expected);
  });

  it('should return the date well formatted for the SQL format', () => {
    const result = convertIsoToCompact('2024-07-31 23:06:51');

    const expected = '20240731230651';

    expect(result).toEqual(expected);
  });

  it('should return the date well formatted for the Bigtable format', () => {
    const result = convertIsoToCompact('2024-01-10 23:05:33 [UTC]');

    const expected = '20240110230533';

    expect(result).toEqual(expected);
  });
});

describe('convertLuxonToCompactDate', () => {
  it('should convert the luxon date to CompactDate', () => {
    const isoDate = '2024-01-10T23:05:33.000Z';
    const luxonDate = DateTime.fromISO(isoDate, { zone: 'utc' });

    const result = convertLuxonToCompactDate(luxonDate);

    const expected = new CompactDate(convertIsoToCompact(isoDate));
    expect(result).toEqual(expected);
  });

  it('should convert the luxon date to CompactDate with timezone', () => {
    const isoDate = '2024-01-10T23:05:33.000Z';
    const luxonDate = DateTime.fromISO(isoDate, { zone: timezoneCanada });

    const result = convertLuxonToCompactDate(luxonDate);

    const expected = new CompactDate(convertIsoToCompact(isoDate));
    expect(result).toEqual(expected);
  });
});

describe('convertMomentToCompactDate', () => {
  it('should convert the moment date to CompactDate', () => {
    const isoDate = '2024-01-10T23:05:33.000Z';
    const momentDate = moment.utc(isoDate);

    const result = convertMomentToCompactDate(momentDate);

    const expected = new CompactDate(convertIsoToCompact(isoDate));
    expect(result).toEqual(expected);
  });
});

describe('convertDateToCompactDate', () => {
  it('should convert the JS date to CompactDate', () => {
    const isoDate = '2024-01-10T23:05:33.000Z';
    const jsDate = new Date(isoDate);

    const result = convertDateToCompactDate(jsDate);

    const expected = new CompactDate(convertIsoToCompact(isoDate));
    expect(result).toEqual(expected);
  });

  it('should convert the JS date to CompactDate with timezone', () => {
    const isoDate = '2024-01-10T23:05:33.000Z';
    const isoDateWithTz =
      DateTime.fromISO(isoDate, {
        zone: timezoneCanada,
      }).toISO() ?? '';

    const jsDate = new Date(isoDateWithTz);

    const result = convertDateToCompactDate(jsDate);

    const expected = new CompactDate(convertIsoToCompact(isoDate));
    expect(result).toEqual(expected);
  });
});
