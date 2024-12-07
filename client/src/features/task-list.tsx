"use client";

import { Dispatch, SetStateAction } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemType } from "@/utils/types";
import { deleteTask, getTasks, updateTask } from "@/app/api/task";
import { CircularProgress } from "@mui/material";

interface TaskListProps {
  date: string;
  isLoading: boolean;
  list: ListItemType[];
  setTaskList: Dispatch<SetStateAction<never[]>>;
  showAlert: (error: Error | unknown) => void;
}

export const TaskList = ({
  date,
  isLoading,
  list,
  setTaskList,
  showAlert,
}: TaskListProps) => {
  const onTaskClick = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const id = parseInt(target.getAttribute("data-toggle-id") as string);

    if (!id) {
      return;
    }
    try {
      await updateTask(id);
      const fetchedData = await getTasks(date);
      setTaskList(fetchedData);
    } catch (error) {
      showAlert(error);
    }
  };

  const onTaskDelete = async (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const id = parseInt(target.getAttribute("data-delete-id") as string);

    if (!id) {
      return;
    }

    try {
      await deleteTask(id);
      const fetchedData = await getTasks(date);
      setTaskList(fetchedData);
    } catch (error) {
      showAlert(error);
    }
  };

  if (!list.length) {
    return <div>No tasks for the selected date</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <List
      sx={{
        minWidth: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {list.map(({ completed, title, id }: ListItemType) => {
        return (
          <ListItem
            disablePadding
            key={id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemButton
              role={undefined}
              onClick={onTaskClick}
              data-toggle-id={id}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": `checkbox-list-label-${id}`,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={`checkbox-list-label-${id}`} primary={title} />
            </ListItemButton>
            <ListItemButton
              sx={{ maxWidth: "60px" }}
              data-delete-id={id}
              onClick={onTaskDelete}
            >
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
