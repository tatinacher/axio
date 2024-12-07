"use client";
import { Dayjs } from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { CalendarTaskDates, DateType } from "@/utils/types";
import {
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers/PickersDay/PickersDay";
import Badge from "@mui/material/Badge";
import { DATE_FORMAT } from "@/utils/constants";

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
      DATE_FORMAT
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
  );
};
