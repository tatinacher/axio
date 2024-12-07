"use client";

import { MouseEventHandler } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemType } from "@/utils/types";

interface TaskListProps {
  list: ListItemType[];
  onTaskClick: MouseEventHandler<HTMLDivElement>;
}

export const TaskList = ({ list, onTaskClick }: TaskListProps) => {
  if (!list.length) {
    <div>No tasks for the selected date</div>;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
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
              data-id={id}
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
            <ListItemButton sx={{ maxWidth: "60px" }}>
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
