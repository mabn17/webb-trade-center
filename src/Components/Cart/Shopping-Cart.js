import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import SubtractIcon from '@material-ui/icons/Minimize';
import backgroundC from './css/backgound';
import { makeStyles } from '@material-ui/core/styles';
import {
  getItems
} from '../../Helpers/Methods/ShoppingItems';

// const defaultToken = { id: 0, assets: 0, email: '' };
const defaultItems = { "items": [] };

const useStyles = makeStyles(theme => ({
  number: {
    fontSize: '12px',
    fontStyle: 'itallic'
  },
  appBar: {
    position: 'relative',
    background: 'red'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  gradient: {
    background: backgroundC,
    color: theme.palette.common.black,
  },
  negative: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShoppingCart = (props) => {
  const classes = useStyles();
  // const token = props.token ? props.token : defaultToken;
  const [shopItems, setShopItems] = React.useState(getItems());
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setShopItems(getItems());
  }, [props.newItem]);

  const DisplayItems = () => {
    if (shopItems.items.length === defaultItems.items.length) {
      setDisabled(true);
      return null;
    }

    setDisabled(false);
    let keyId = 0;
    return shopItems.items.map((item) => {
      keyId += 1;
      return (
        <ListItem button key={`${keyId}${item.price}`} className={classes.negative} >
          <ListItemText primary={item.name} secondary={`${item.price} kr.`} />
          <IconButton><SubtractIcon /></IconButton>
        </ListItem>
      );
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const CartDialog = () => (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={`${classes.appBar} ${classes.gradient}`}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopping Cart
          </Typography>
          <Button color="inherit" onClick={handleClose} disabled={disabled}>
            checkout
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <DisplayItems />
      </List>
    </Dialog>
  );

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ShoppingCartIcon />
        <span className={classes.number} >{ shopItems.items.length }</span>
      </IconButton>
      <CartDialog />
    </>
  );
};

export default ShoppingCart;
