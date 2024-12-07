"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

type ListItemType = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
};

interface TaskListProps {
  list: ListItemType[];
}

export const TaskList = ({ list }: TaskListProps) => {
  const handleToggle = () => {};

  if (!list.length) {
    <div>No tasks for the selected date</div>;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {list.map(({ completed, title, id }: ListItemType) => {
        return (
          <ListItem disablePadding key={id}>
            <ListItemButton role={undefined} onClick={handleToggle} dense>
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
          </ListItem>
        );
      })}
    </List>
  );
};
