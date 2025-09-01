import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

import { IDatePart, DateFormat } from '../models/date.types';

dayjs.extend(objectSupport);

export const buildDateFromParts = (dateParts: IDatePart, format: DateFormat): string => {
  const today = dayjs();

  const year = dateParts.year ?? today.year();
  const month = dateParts.month ? dateParts.month - 1 : today.month();
  const day = dateParts.day ?? today.date();

  return dayjs({ year, month, day }).format(format);
};

export const getFormattedDateRange = (
  start: string,
  end: string,
  format = DateFormat.MonthDayShort
) => {
  const startFormatted = dayjs(start).format(format);
  const endFormatted = dayjs(end).format(format);

  return `${startFormatted} - ${endFormatted}`;
};
