import { AxiosError } from "axios";
import axiosInstance from "@/utils/request";

export const getTasks = async (date: string) => {
  try {
    const response = await axiosInstance.get("/tasks", { params: { date } });
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error getting tasks:", err.message);
    return [];
  }
};

export const addTasks = async (date: string, title: string) => {
  try {
    const response = await axiosInstance.post("/tasks", { date, title });
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error posting task:", err.message);
    return [];
  }
};
