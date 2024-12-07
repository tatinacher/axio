import dayjs from "dayjs";

export type DateType = dayjs.Dayjs;
export type CalendarTaskDates = {
  [date: string]: number;
};
export type ListItemType = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
};
