import dayjs from "dayjs";

export type DateType = dayjs.Dayjs;
export type CalendarTaskDates = {
  [date: string]: number;
};
