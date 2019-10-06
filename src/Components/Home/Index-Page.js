import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Jumbo from '../../Layout/jumbotron/jumbotron';

const useStyles = makeStyles(theme => ({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const PreText = "Our award-winning investing experience";
const SubText = `Announcing $0 commissions on online stock, ETF and option
trades, starting on Thursday, October 3.
Get our best-in-class platforms and extensive branch network,
now with commission-free trading.`;

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
    <Jumbo
      title={PreText}
      text={SubText}
      noRadius={true}
      link={'Open New Account'}
      linkURL={'/register'}
      maxWidth="90%"
      center={true}
    />
    <div className={classes.toolbar} />
    <Grid item xs={12} md={12}>
        <Typography component="h2" variant="h4" className={classes.center} gutterBottom>
          Welcome
        </Typography>
        <Divider />
    </Grid>
  </>
  );
}

export default HomePage;