import { AxiosError } from "axios";
import axiosInstance from "@/utils/request";

export const getTasks = async (date: string) => {
  try {
    const response = await axiosInstance.get("/tasks", {
      params: { date },
    });
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error getting tasks:", err.message);
    return [];
  }
};

export const addTasks = async (date: string, title: string) => {
  try {
    const response = await axiosInstance.post("/tasks", {
      date,
      title,
    });
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error posting task:", err.message);
    return [];
  }
};

export const getCalendarTasks = async () => {
  try {
    const response = await axiosInstance.get("/calendar");
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error posting task:", err.message);
    return [];
  }
};

export const updateTask = async (id: number) => {
  try {
    const response = await axiosInstance.post(`/task-toggle/${id}`);
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error posting task:", err.message);
    return [];
  }
};
