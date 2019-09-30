import React from 'react';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import SellItem from './Popup/Sell-Item';


const Orders = ({ items = [], getNewInfo, updatePersonal }) => {
  const [open, setOpen] = React.useState(false);
  const [currItem, setCurrItem] = React.useState({ item_name: '' });

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };


  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Active Investments
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bought</TableCell>
            <TableCell>Stock Name</TableCell>
            <TableCell>Buy-in Price</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.buy_in_date}</TableCell>
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.buy_in_price}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={ { padding: '1px' } }
                  onClick={() => { setCurrItem(row); handleClickOpen(); }}
                >
                  Sell
                </Button>
                <SellItem
                  open={open}
                  handleClose={handleClose}
                  item={currItem}
                  getNewInfo={getNewInfo}
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

export default Orders;
