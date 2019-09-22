import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { round } from '../../Helpers/Methods/FilterValues';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  top: {
    marginTop: '10px',
  }
});


const Deposits = ({ token, stocks }) => {
  const classes = useStyles();
  const months = ["jan", "feb", "mar","apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const currentDatetime = new Date();
  const formattedDate = currentDatetime.getDate() + " " + months[currentDatetime.getMonth()] + ", " + currentDatetime.getFullYear();

  const calcTotal = (list) => {
    let total = 0;

    list.forEach((item) => {
      total += item.price * item.amount;
    });

    return total;
  }

  const RenderTotal = () => (
    stocks.length > 0
      ? (
        <span>
          { round(calcTotal(stocks)) }
        </span>
      )
      : null
  );

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Available Balance
      </Typography>
      <Typography component="p" variant="h4">
        { token.assets ? `${round(token.assets)} kr.`  : '...' }
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {formattedDate}
      </Typography>
      <Typography component="h2" variant="h6" gutterBottom>
        Stock worth
      </Typography>
      <Typography component="p" variant="body2" className={classes.depositContext}>
        <RenderTotal />
      </Typography>
      <div>
        <Link color="primary" to="#">
          Add more balance
        </Link>
      </div>
    </>
  );
}

export default Deposits;