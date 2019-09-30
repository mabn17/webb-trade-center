import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import SubtractIcon from '@material-ui/icons/Minimize';
import AdditionIcon from '@material-ui/icons/Add';
import backgroundC from './css/backgound';
import { makeStyles } from '@material-ui/core/styles';
import {
  getItems,
  removeItem,
  sumArr,
  addItem,
  removeItems
} from '../../Helpers/Methods/ShoppingItems';
import { execBuyStocks } from '../../Helpers/Requests/stocks/stocks';
import { getToken } from '../../Helpers/Methods/TokenHandeler';

function countArray(arr, what) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === what) {
      count++;
    }
  }

  return count;
};

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
  },
  remove: {
    fontSize: '12px',
    float: 'right',
    margin: '10px 20px',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'rgba(255, 26, 66, 0.1)'
  },
  link: {
    margin: '5px',
    textDecorationColor: 'red',
  }
}));

const ShoppingCart = (props) => {
  const classes = useStyles();
  const token = props.token ? props.token : defaultToken;
  const [shopItems, setShopItems] = React.useState(getItems());
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [message, setMessage] = React.useState(null);
  const [messageTwo, setMessageTwo] = React.useState('');

  React.useEffect(() => {
    setShopItems(getItems());
  }, [props.newItem]);

  const handleRemoveItem = (item) => {
    removeItem(item);
    props.updateAll();
    setMessageTwo('');

    return null;
  };
  const handleAddItem = (item) => {
    addItem(item);
    props.updateAll();

    return null;
  };
  const handleRemoveAll = () => {
    removeItems();
    props.updateAll();

    return null;
  }

  const DisplayItems = () => {
    if (shopItems.items.length === defaultItems.items.length) {
      setDisabled(true);
      return null;
    }

    setDisabled(false);
    setMessage(null);

    if (token.id === 0) {
      setDisabled(true);
      setMessage('Login to continue');
    }

    let keyId = 0;
    let arrId = [];
    
    return shopItems.items.map((item) => {
      if (arrId.indexOf(item.id) === -1) {
        keyId += 1;
        const accurences = countArray(shopItems.items, item.id);
        arrId.push(item.id);
        return (
          <ListItem button key={`${keyId}${item.price}`} className={classes.negative} >
            <ListItemText primary={item.name} secondary={`${item.price} kr/st.`} />
            <IconButton onClick={() => handleAddItem(item)}><AdditionIcon /></IconButton>
              <span style={{ margin: '0 5px' }}>{accurences}</span>
            <IconButton style={ { marginTop: '-15px' } } onClick={() => handleRemoveItem(item)}><SubtractIcon /></IconButton>
          </ListItem>
        );
      }
      return null;
    });
  };

  const RenderBalance = () => (
    <>
      {!token.id ? null : (<><b style={{ marginRight: '20px' }}>Current Balance:</b> {token.assets} kr<br /></>) }
      <b style={{ marginRight: '94px' }}>Cost:</b>{' -' + sumArr(shopItems.items, 'price') + ' kr'}
      { !token.id ? null : (
        <React.Fragment>
          <hr />
          <div className={ (token.assets - sumArr(shopItems.items, 'price')) < 0 ? classes.warning : classes.ok }>
            <b style={{ marginRight: '102px' }}>Left:</b> { Math.round((token.assets - sumArr(shopItems.items, 'price')) * 100) / 100 } kr.
          </div>
        </React.Fragment>
      )}
    </>
  );

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCheckout = () => {
    let holder = [];
    let real = [];
    let total = 0;
    setDisabled(true);

    shopItems.items.forEach((item) => {
      if (holder.indexOf(item.id) === -1) {
        const accurences = countArray(shopItems.items, item.id);
        holder.push(item.id);
        real.push({ stockToBuy: item.name, amountToBuy: accurences });
        total += (item.price * accurences);
      }
    });


    if (token.id === 0) {
      console.log('noo');
      return;
    }

    console.log(total > token.assets);

    setMessageTwo('');
    if(total > token.assets) {
      setMessageTwo('Not enought assets to buy your stocks');
      return;
    }

    // buyStocks()
    // if negative abort
    // else sell stocks and update token.assets med parrent hook?
    real.forEach(stock => {
      execBuyStocks(getToken(), stock).catch(e => console.log(e));
    });

    handleRemoveAll();
    return;
  }

  const CartDialog = () => (
    <Dialog disableBackdropClick fullScreen open={open} onClose={handleClose} transitionDuration={0}>
      <AppBar className={`${classes.appBar} ${classes.gradient}`}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Shopping Cart
          </Typography>
          <Button color="inherit" onClick={handleCheckout} disabled={disabled}>
            checkout
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <DisplayItems />
        { message ? (<ListItem><Link to="/login" className={classes.link}>
        <span className={`${classes.warning} ${classes.right}`}>{message}</span>
      </Link></ListItem>) : null }
      <ListItem>
        <span className={classes.warning} >{ messageTwo }</span>
      </ListItem>
      </List>
      <Typography component={'span'} variant={'body2'} className={classes.right} >
        { shopItems.items.length === 0 ? <b>No items in cart</b> : <RenderBalance /> }
      </Typography>
      { shopItems.items.length === 0 ? null :
        <Grid item md={12} sm={12}>
          <Button onClick={handleRemoveAll} className={classes.remove}>
            Remove all items
          </Button>
        </Grid>
      }
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
