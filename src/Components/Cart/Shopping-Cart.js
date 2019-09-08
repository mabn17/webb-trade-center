import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import {
  getItems
} from '../../Helpers/Methods/ShoppingItems';

// const defaultToken = { id: 0, assets: 0, email: '' };
// const defaultItems = { "items": [] };

const useStyles = makeStyles(theme => ({
  number: {
    fontSize: '12px',
    fontStyle: 'itallic'
  }
}));

const ShoppingCart = (props) => {
  const classes = useStyles();
  // const token = props.token ? props.token : defaultToken;
  const [shopItems, setShopItems] = React.useState(getItems());

  React.useEffect(() => {
    setShopItems(getItems());
  }, [props.newItem]);

  // const generateId = () => (`'_'${Math.random().toString(36).substr(2, 9)}`);

  // const DisplayItems = () => (
  //   shopItems === defaultItems ? '.' : (
  //     <ul>
  //       {shopItems.items.map((item) => (
  //         <li key={`shopItem${item.id}${generateId()}`}>
  //           { item.name }
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // );

  return (
    <>
      <IconButton>
        <ShoppingCartIcon />
        <span className={classes.number} >{ shopItems.items.length }</span>
      </IconButton>
    </>
  );
};

export default ShoppingCart;
