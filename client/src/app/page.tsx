"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./page.module.css";
import { Calendar, TaskAddForm, TaskList } from "../features";
import { getTasks, getCalendarTasks } from "./api/task";
import { DateType } from "@/utils/types";
import { DATE_FORMAT, NO_SERVER_CONNECTION } from "@/utils/constants";
import { Alert, Box, Snackbar } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [calendarTasks, setCalendarTasks] = useState({});
  const [taskList, setTaskList] = useState([]);

  const [isCalendarLoading, setCalendarLoading] = useState<boolean>(false);
  const [isTasksLoading, setTasksLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("error");

  const showAlert = (error: Error | unknown) => {
    let errorMessage = NO_SERVER_CONNECTION;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    setMessage(errorMessage);
    setSeverity("error");
    setOpen(true);
  };

  useEffect(() => {
    if (date) {
      setTasksLoading(true);
      const loadData = async () => {
        try {
          const fetchedData = await getTasks(date.format(DATE_FORMAT));
          setTaskList(fetchedData);
        } catch (error) {
          showAlert(error);
        } finally {
          setTasksLoading(false);
        }
      };

      loadData();
    }
  }, [date]);

  useEffect(() => {
    setCalendarLoading(true);
    const loadData = async () => {
      try {
        const fetchedData = await getCalendarTasks();
        setCalendarTasks(fetchedData);
      } catch (error) {
        showAlert(error);
      } finally {
        setCalendarLoading(false);
      }
    };
    loadData();
  }, [taskList]);

  const closeAlert = () => {
    setOpen(false);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            setTaskList={setTaskList}
            date={date}
            showAlert={showAlert}
          />
        </LocalizationProvider>
        <TaskList
          list={taskList}
          date={date.format(DATE_FORMAT)}
          setTaskList={setTaskList}
          isLoading={isTasksLoading}
          showAlert={showAlert}
        />
        <Snackbar open={open} autoHideDuration={3000} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
