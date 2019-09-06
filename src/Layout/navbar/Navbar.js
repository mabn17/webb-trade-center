import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink as LinkTwo } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LoginIcon from '@material-ui/icons/Wifi';
import SignIcon from '@material-ui/icons/LocalPostOffice';
import LogoutIcon from '@material-ui/icons/WifiOff';

import NavConfig from './NavConfig';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    margin: '15px',
  },
  topLinks: {
    marginTop: '20px',
  }
});

const ResponsiveNav = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const CreateLink = (item, IconComponent = null) => (
    <LinkTwo key={item.name} exact activeClassName="activeR" className={classes.link} to={item.url}>
      <ListItem>
        { IconComponent ? (<ListItemIcon><IconComponent /></ListItemIcon>) : null }
        { item.name }
      </ListItem>
    </LinkTwo>
  );

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      id="nav-res"
    >
      <List className={classes.topLinks}>
        { CreateLink(NavConfig.buttons.Login, LoginIcon) }
        { CreateLink(NavConfig.buttons.Sign, SignIcon) }
        { CreateLink(NavConfig.buttons.Logout, LogoutIcon) }
      </List>
      <Divider />
      <List>
        {NavConfig.defaults.map((url) => (
          CreateLink(url)
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.icon}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={toggleDrawer('left', true)}
        className={`${classes.icon} show-me-sm`}
      >
        <MoreVertIcon className={classes.icon} />
      </IconButton>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}

export default ResponsiveNav;

