import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});


const Deposits = (props) => {
  const classes = useStyles();
  const months = ["jan", "feb", "mar","apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const currentDatetime = new Date();
  const formattedDate = currentDatetime.getDate() + " " + months[currentDatetime.getMonth()] + ", " + currentDatetime.getFullYear();


  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Current Balance
      </Typography>
      <Typography component="p" variant="h4">
        { props.token.assets } kr.
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {formattedDate}
      </Typography>
      <div>
        <Link color="primary" to="#">
          Add more
        </Link>
      </div>
    </>
  );
}

export default Deposits;