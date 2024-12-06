"use client";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

interface TaskAddFormProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

export const TaskAddForm = ({
  value,
  onChange,
  onKeyDown,
}: TaskAddFormProps) => {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">To buy apples</InputLabel>
      <Input
        id="new-task"
        aria-describedby="my-helper-text"
        value={value}
        onChange={onChange}
        onKeyUp={onKeyDown}
      />
      <FormHelperText id="my-helper-text">Create a new task</FormHelperText>
    </FormControl>
  );
};
