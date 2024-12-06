"use client";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

type ListItemType = {
  title: string;
  date: string;
  isChecked?: boolean;
};

interface TaskListProps {
  list: ListItemType[];
  // handleToggle: MouseEventHandler<HTMLDivElement>;
}

export const TaskList = ({ list }: TaskListProps) => {
  const handleToggle = () => {};
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {list.map(({ isChecked, title }: ListItemType) => {
        const labelId = `checkbox-list-label-${title}`;

        return (
          <ListItem key={title} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isChecked}
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
