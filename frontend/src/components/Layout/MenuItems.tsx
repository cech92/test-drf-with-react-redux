import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { history } from '../../helpers';

const handleClick = (event: any, path: string) => {
  event.preventDefault();
  history.push(path);
}

export const mainListItems = (
  <div>
    <ListItem button onClick={(e) => handleClick(e, "/")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={(e) => handleClick(e, "/usages")}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Usages" />
    </ListItem>
  </div>
);