import axiosInstance from "@/utils/request";

export const getTasks = async (date: string) => {
  try {
    const response = await axiosInstance.get("/tasks", {
      params: { date },
    });
    return response.data || [];
  } catch {
    throw new Error("Failed to get tasks");
  }
};

export const addTasks = async (date: string, title: string) => {
  try {
    const response = await axiosInstance.post("/tasks", {
      date,
      title,
    });
    return response.data || [];
  } catch {
    throw new Error("Failed to add task");
  }
};

export const getCalendarTasks = async () => {
  try {
    const response = await axiosInstance.get("/calendar");
    return response.data || [];
  } catch {
    throw new Error("Failed to fetch calendar tasks");
  }
};

export const updateTask = async (id: number) => {
  try {
    const response = await axiosInstance.post(`/task-toggle/${id}`);
    return response.data || [];
  } catch {
    throw new Error("Failed to update task");
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${id}`);
    return response.data || [];
  } catch {
    throw new Error("Failed to delete task");
  }
};
