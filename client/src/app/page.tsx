"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./page.module.css";
import { Calendar, TaskAddForm, TaskList } from "../features";
import { addTasks, getTasks } from "./api/task";
import { DateType } from "@/utils/types";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [taskList, setTaskList] = useState([]);
  const [taskNewValue, setTaskNewValue] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (date) {
      setLoading(true);
      const loadData = async () => {
        const fetchedData = await getTasks(date.format("DD.MM.YYYY"));
        setTaskList(fetchedData);
        setLoading(false);
      };
      loadData();
    }
  }, [date]);

  const onKeyDown = async (value: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.key === "Enter") {
      await addTasks(date.format("DD.MM.YYYY"), taskNewValue);
      const fetchedData = await getTasks(date.format("DD.MM.YYYY"));
      setTaskList(fetchedData);
      setTaskNewValue("");
    }
  };

  let taskListBlock = <TaskList list={taskList} />;

  if (isLoading) {
    taskListBlock = <CircularProgress />;
  }

  if (!taskList.length) {
    taskListBlock = <div>No tasks for the selected date</div>;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Calendar
          date={date}
          onChange={(newValue: DateType) => setDate(newValue)}
        />
        <TaskAddForm
          value={taskNewValue}
          onChange={(value) => setTaskNewValue(value.currentTarget.value)}
          onKeyDown={onKeyDown}
        />
        {taskListBlock}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
