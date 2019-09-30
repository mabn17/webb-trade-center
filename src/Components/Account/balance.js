import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormDialog from './Popup/Add-Balance';
import { round } from '../../Helpers/Methods/FilterValues';

const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  top: {
    marginTop: '10px',
  },
  avatar: {
    marginLeft: '-10px',
    color: '#3f51b5',
  },
}));


const Deposits = ({ token, stocks, update }) => {
  const classes = useStyles();
  const months = ["jan", "feb", "mar","apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const currentDatetime = new Date();
  const formattedDate = currentDatetime.getDate() + " " + months[currentDatetime.getMonth()] + ", " + currentDatetime.getFullYear();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const calcTotal = (list) => {
    let total = 0;

    list.forEach((item) => { total += item.price * item.amount; });
    return total;
  }

  const RenderTotal = () => (stocks.length > 0 ? (<span>{ round(calcTotal(stocks)) } kr. </span>) : null);
  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Available Balance
      </Typography>
      <Typography component="p" variant="h4">
        { token.assets ? `${round(token.assets)} kr.`  : '...' }
      </Typography>
      <div>
        <Button className={classes.avatar} color="primary" onClick={handleClickOpen}>
          Add more balance
        </Button>
      </div>
      <FormDialog open={open} handleClose={handleClose} update={update} />
      <Typography component="h2" variant="h6" gutterBottom>
        Stock worth
      </Typography>
      <Typography component="p" variant="body2" className={classes.depositContext}>
        <RenderTotal />
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {formattedDate}
      </Typography>
    </>
  );
}

export default Deposits;