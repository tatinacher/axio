"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./page.module.css";
import { Calendar, TaskAddForm, TaskList } from "../features";
import { addTasks, getTasks, getCalendarTasks } from "./api/task";
import { DateType } from "@/utils/types";
import { dateFormat } from "@/utils/constants";

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
  }, []);

  const onKeyDown = async (value: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.key === "Enter") {
      await addTasks(date.format(dateFormat), taskNewValue);
      const fetchedData = await getTasks(date.format(dateFormat));
      setTaskList(fetchedData);
      setTaskNewValue("");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {isCalendarLoading ? (
          <CircularProgress />
        ) : (
          <Calendar
            date={date}
            onChange={(newValue: DateType) => setDate(newValue)}
            taskDates={calendarTasks}
          />
        )}
        <TaskAddForm
          value={taskNewValue}
          onChange={(value) => setTaskNewValue(value.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        {isTasksLoading ? <CircularProgress /> : <TaskList list={taskList} />}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
