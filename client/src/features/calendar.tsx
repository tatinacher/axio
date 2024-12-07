"use client";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CalendarTaskDates, DateType } from "@/utils/types";
import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";
import Badge from "@mui/material/Badge";
import { dateFormat } from "@/utils/constants";

interface CalendarProps {
  date: DateType;
  onChange: (date: DateType) => void;
  taskDates: CalendarTaskDates;
}

const TaskDay = (
  props: PickersDayProps<Dayjs> & { taskDates?: CalendarTaskDates }
) => {
  const { taskDates = [], day, ...other } = props;
  let count = 0;
  if (typeof taskDates === "object" && !Array.isArray(taskDates)) {
    const dayOfCalendar = props.day.format(
      dateFormat
    ) as keyof CalendarTaskDates;
    count = taskDates[dayOfCalendar] || 0;
  }

  const isSelected = count > 0;
  return (
    <Badge
      color="secondary"
      sx={{ top: "10px" }}
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? count : undefined}
    >
      <PickersDay {...other} day={day} />
    </Badge>
  );
};

export const Calendar = ({ date, onChange, taskDates }: CalendarProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={date}
        onChange={onChange}
        slots={{
          day: TaskDay,
        }}
        slotProps={{
          day: {
            taskDates,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
};
