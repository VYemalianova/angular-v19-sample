export interface IDatePart {
  month?: number;
  day?: number;
  year?: number;
}

export enum DateFormat {
  FullDate = 'YYYY-MM-DD',
  FullDateTime = 'YYYY-MM-DD HH:mm:ss',
  FullDayDate = 'dddd, MMMM D, YYYY',
  MonthDayYearLong = 'MMMM D, YYYY',
  MonthDayShort = 'MMM D',
  MonthDayLong = 'MMMM D',
  MonthYearLong = 'MMMM YYYY',
  MonthShort = 'MMM',
  MonthLong = 'MMMM',
  Year = 'YYYY',
  DayOfMonth = 'D',
  DayOfWeekFull = 'dddd',
  DayOfWeekShort = 'ddd',
  Hour24Min = 'HH:mm',
  Hour12MinAMPM = 'hh:mm A',

  FullDateTimeWithMs = 'YYYY-MM-DD HH:mm:ss.SSS',
  Time24Hour = 'HH:mm:ss',
  Time12Hour = 'hh:mm:ss A',
}
