import React from 'react';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Orders = ({ items = [] }) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default Orders;
