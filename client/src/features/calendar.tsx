"use client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DateType } from "@/utils/types";

interface CalendarProps {
  date: DateType;
  onChange: (date: DateType) => void;
}

export const Calendar = ({ date, onChange }: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={date} onChange={onChange} />
    </LocalizationProvider>
  );
};
