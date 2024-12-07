"use client";
import { addTasks, getTasks } from "@/app/api/task";
import { DATE_FORMAT } from "@/utils/constants";
import { isValidDate } from "@/utils/validation";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TaskAddFormProps {
  date: Dayjs;
  setTaskList: Dispatch<SetStateAction<never[]>>;
  showAlert: (error: Error | unknown) => void;
}

export const TaskAddForm = ({
  date,
  setTaskList,
  showAlert,
}: TaskAddFormProps) => {
  const [inputDate, setInputDate] = useState<Dayjs | null>(null);
  const [taskNewValue, setTaskNewValue] = useState<string>("");
  const [dateHelper, setDateHelper] = useState<string>("");
  const [taskError, setTaskHelper] = useState<string>("");

  const helperText = `Enter a date in the format: YYYY-MM-DD (e.g., ${date.format(DATE_FORMAT)})`;

  useEffect(() => {
    setInputDate(date);
  }, [date]);

  useEffect(() => {
    if (inputDate && isValidDate(inputDate.format(DATE_FORMAT))) {
      setDateHelper("");
    } else {
      setDateHelper(helperText);
    }
  }, [inputDate, helperText]);

  const onSubmit = async () => {
    if (inputDate && !isValidDate(inputDate.format(DATE_FORMAT))) {
      setDateHelper(helperText);
    }

    if (!taskNewValue.length) {
      setTaskHelper(`Enter a new task`);
    }

    if (
      inputDate &&
      isValidDate(inputDate.format(DATE_FORMAT)) &&
      taskNewValue.length
    ) {
      try {
        await addTasks(inputDate.format(DATE_FORMAT), taskNewValue);
        const fetchedData = await getTasks(inputDate.format(DATE_FORMAT));
        setTaskList(fetchedData);
        setTaskNewValue("");
      } catch (error) {
        showAlert(error);
      }
    }
  };

  return (
    <FormControl>
      <Box
        sx={{ marginBottom: "40px", display: "flex", flexDirection: "column" }}
      >
        <InputLabel htmlFor="my-input">To buy apples</InputLabel>
        <Input
          id="new-task"
          aria-describedby="my-helper-text"
          value={taskNewValue}
          onChange={(value) => setTaskNewValue(value.currentTarget.value)}
          color={taskError ? "error" : "primary"}
        />
        <FormHelperText id="my-helper-text">
          {taskError ? taskError : "Create a new task"}
        </FormHelperText>
      </Box>
      <DateField
        label="Date"
        value={inputDate}
        format={DATE_FORMAT}
        onChange={(newValue) => setInputDate(newValue)}
        color={dateHelper ? "error" : "primary"}
        helperText={dateHelper}
        sx={{ marginBottom: "40px" }}
      />
      <Button
        onClick={onSubmit}
        variant="contained"
        disabled={!taskNewValue.length}
      >
        Submit
      </Button>
    </FormControl>
  );
};
