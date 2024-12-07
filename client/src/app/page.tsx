"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./page.module.css";
import { Calendar, TaskAddForm, TaskList } from "../features";
import {
  addTasks,
  getTasks,
  getCalendarTasks,
  updateTask,
  deleteTask,
} from "./api/task";
import { DateType, ListItemType } from "@/utils/types";
import { dateFormat } from "@/utils/constants";
import { Box } from "@mui/material";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [calendarTasks, setCalendarTasks] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [taskNewValue, setTaskNewValue] = useState("");

  const [isCalendarLoading, setCalendarLoading] = useState<boolean>(false);
  const [isTasksLoading, setTasksLoading] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      setTasksLoading(true);
      const loadData = async () => {
        const fetchedData = await getTasks(date.format(dateFormat));
        setTaskList(fetchedData);
        setTasksLoading(false);
      };
      loadData();
    }
  }, [date]);

  useEffect(() => {
    setCalendarLoading(true);
    const loadData = async () => {
      const fetchedData = await getCalendarTasks();
      setCalendarTasks(fetchedData);
      setCalendarLoading(false);
    };
    loadData();
  }, [taskList]);

  const onKeyDown = async (value: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.key === "Enter") {
      await addTasks(date.format(dateFormat), taskNewValue);
      const fetchedData = await getTasks(date.format(dateFormat));
      setTaskList(fetchedData);
      setTaskNewValue("");
    }
  };

  const onTaskClick = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const id = parseInt(target.getAttribute("data-toggle-id") as string);

    if (id) {
      await updateTask(id);
      const fetchedData = await getTasks(date.format(dateFormat));
      setTaskList(fetchedData);
    }
  };

  const onTaskDelete = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const id = parseInt(target.getAttribute("data-delete-id") as string);

    if (id) {
      await deleteTask(id);
      const fetchedData = await getTasks(date.format(dateFormat));
      setTaskList(fetchedData);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box
          sx={{
            height: "400px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isCalendarLoading ? (
            <CircularProgress />
          ) : (
            <Calendar
              date={date}
              onChange={(newValue: DateType) => setDate(newValue)}
              taskDates={calendarTasks}
            />
          )}
        </Box>
        <TaskAddForm
          value={taskNewValue}
          onChange={(value) => setTaskNewValue(value.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        {isTasksLoading ? (
          <CircularProgress />
        ) : (
          <TaskList
            list={taskList}
            onTaskClick={onTaskClick}
            onTaskDelete={onTaskDelete}
          />
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
