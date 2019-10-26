import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SellItem from './buyItem';

import { round } from '../../Helpers/Methods/FilterValues.js';


const ShopItems = ({ history, items = [], updatePersonal, token }) => {
  const [open, setOpen] = React.useState(false);
  const [currItem, setCurrItem] = React.useState({ name: '' });

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };


  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell >Stock Name</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell align="right">Balance: {round(token.assets)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => (
            <TableRow key={row.id}>
              <TableCell className="csr" align="left"
                onClick={() => history.push(`/stocks/${row.name}`)}
              >&#128065;</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={ { padding: '1px' } }
                  onClick={() => { setCurrItem(row); handleClickOpen(); }}
                >
                  Buy
                </Button>
                <SellItem
                  open={open}
                  handleClose={handleClose}
                  item={currItem}
                  token={token}
                  updatePersonal={updatePersonal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ShopItems;