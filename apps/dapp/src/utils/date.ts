import {
  addMinutes,
  addDays,
  addHours,
  formatRFC7231,
  format,
  formatDistance,
  intervalToDuration,
  interval,
  isAfter,
  differenceInDays,
} from "date-fns";

// Date formatting operations
export const formatDate = {
  /** Format RFC7231: Mon, 20 Apr 2020 16:20:00 GMT */
  full: formatRFC7231,
  /** Formats date and time in the local timezone: 2024.02.14 - 02:00 GMT+0 */
  fullLocal: (date: Date) => format(date, "yyyy.MM.dd - HH:mm z"),
  simple: (date: Date) => format(date, "MM.dd - HH:mm z"),
  day: (date: Date) => format(date, "yyyy.MM.dd"),
};

// Date math operations
export const dateMath = {
  addDays,
  addHours,
  addMinutes,
};

/** Converts a Date to a Unix timestamp (seconds) */
export const getTimestamp = (date: Date) => Math.floor(date.getTime() / 1000);

export const getDuration = (days: number) => days * 24 * 60 * 60;

/**Gets and formats the countdown to a given date*/
export const getCountdown = (end: Date, start = new Date()) => {
  if (end < start) return "00:00:00:00";
  const { days, hours, minutes, seconds } = intervalToDuration({ start, end });
  return [days, hours, minutes, seconds]
    .map((x) => x ?? 0)
    .map((s) => String(s).padStart(2, "0")) //Ensures there's always 2 zeros
    .join(":");
};

/**Gets the ellapsed time between two dates in percent*/
export const getDurationAsPercentage = (
  start: string | number,
  end: string | number,
  current: string | number,
) => {
  return (
    ((Number(current) - Number(start)) / (Number(end) - Number(start))) * 100
  );
};

export const getDaysBetweenDates = (laterDate: Date, earlierDate: Date) => {
  return differenceInDays(laterDate, earlierDate);
};

type ValidDateTypes = Date | number | string;
// Date utilities
export const dateHelpers = {
  getTimestamp,
  getDuration,
  formatDistance,
  isAfter,
  intervalToDuration: (start: ValidDateTypes, end: ValidDateTypes) =>
    intervalToDuration(interval(start, end)),
};
