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
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {list.map(({ completed, title, id }: ListItemType) => {
        const labelId = `checkbox-list-label-${id}`;

        return (
          <ListItem key={id} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={completed}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
