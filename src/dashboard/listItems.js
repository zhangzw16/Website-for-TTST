import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import { mainListRoutes } from './routes/drawerRoutes';

export const mainListItems = (
  <div>
    {mainListRoutes.map((prop, key) => {
      return (
        <ListItem component={Link} to={prop.path} key={key} button>
          <ListItemIcon>
            <prop.icon />
          </ListItemIcon>
          <ListItemText primary={prop.sidebarName} />
        </ListItem>
      )
    })}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>其他</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
