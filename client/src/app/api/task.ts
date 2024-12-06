import { AxiosError } from "axios";
import axiosInstance from "@/utils/request";

export const getTasks = async (date: string) => {
  try {
    const response = await axiosInstance.get("/tasks", { params: { date } });
    return response.data || [];
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching tasks:", err.message);
    return [];
  }
};
