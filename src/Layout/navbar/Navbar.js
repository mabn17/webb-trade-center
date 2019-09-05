import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as LinkTwo } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LoginIcon from '@material-ui/icons/Wifi';
import SignIcon from '@material-ui/icons/LocalPostOffice';
import LogoutIcon from '@material-ui/icons/WifiOff';
import HomeIcon from '@material-ui/icons/Home';

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
  }
});

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const CreateLink = (item) => (
    <Link noWrap key={item.name} className={classes.link} color="inherit">
      <LinkTwo className={classes.link} to={item.url}>
        { item.name }
      </LinkTwo>
    </Link>
  );

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <ListItemIcon> <LoginIcon /> </ListItemIcon>
          { CreateLink(NavConfig.buttons.Login) }
        </ListItem>
        <ListItem>
          <ListItemIcon> <SignIcon /> </ListItemIcon>
          { CreateLink(NavConfig.buttons.Sign) }
        </ListItem>
        <ListItem>
          <ListItemIcon> <LogoutIcon /> </ListItemIcon>
          { CreateLink(NavConfig.buttons.Logout) }
        </ListItem>
      </List>
      <Divider />
      <List>
        {NavConfig.defaults.map((url) => (
          <ListItem button key={url.name}>
            <ListItemIcon></ListItemIcon>
            { CreateLink(url) }
          </ListItem>
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

export default SwipeableTemporaryDrawer;

