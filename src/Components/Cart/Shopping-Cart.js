import React from 'react';
import IconButton from '@material-ui/core/IconButton';
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
  getItems,
  removeItem,
  sumArr
} from '../../Helpers/Methods/ShoppingItems';


const defaultToken = { id: 0, assets: 0, email: '' };
const defaultItems = { "items": [] };

const useStyles = makeStyles(theme => ({
  number: {
    fontSize: '12px',
    fontStyle: 'itallic'
  },
  appBar: {
    position: 'relative',
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
  right: {
    margin: '40px',
  },
  warning: {
    color: 'red',
  },
  ok: {
    color: 'green',
  }
}));

const ShoppingCart = (props) => {
  const classes = useStyles();
  // const token = props.token ? props.token : defaultToken;
  const token = defaultToken;
  const [shopItems, setShopItems] = React.useState(getItems());
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setShopItems(getItems());
  }, [props.newItem]);

  const handleRemoveItem = (item) => {
    removeItem(item);
    props.updateAll();
  };

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
          <IconButton onClick={() => handleRemoveItem(item)}><SubtractIcon /></IconButton>
        </ListItem>
      );
    });
  };

  const RenderBalance = () => (
    <>
      {!token.id ? null : (<><b style={{ marginRight: '10px' }}>Current Balance:</b> {token.assets} kr<br /></>) }
      <b style={{ marginRight: '94px' }}>Cost:</b>{' -' + sumArr(shopItems.items, 'price') + ' kr'}
      { !token.id ? null : (
        <>
          <hr />
          <div className={ (token.assets - sumArr(shopItems.items, 'price')) < 0 ? classes.warning : classes.ok }>
            <b style={{ marginRight: '102px' }}>Left:</b> { Math.round((token.assets - sumArr(shopItems.items, 'price')) * 100) / 100 } kr.
          </div>
        </>
      )}
    </>
  );

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const CartDialog = () => (
    <Dialog disableBackdropClick fullScreen open={open} onClose={handleClose} transitionDuration={0}>
      <AppBar className={`${classes.appBar} ${classes.gradient}`}>
        <Toolbar disableTriggerFocus={true}>
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
      <Typography className={classes.right} >
        { shopItems.items.length === 0 ? <b>No items in cart</b> : <RenderBalance /> }
      </Typography>
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
