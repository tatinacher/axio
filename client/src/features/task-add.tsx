"use client";
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material";

export const TaskAddForm = () => {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">To buy apples</InputLabel>
      <Input id="new-task" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">Create a new task</FormHelperText>
    </FormControl>
  );
};
