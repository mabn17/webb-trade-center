import React from 'react';import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {
  getToken,
  decodeToken,
  hasAuth
} from '../../Helpers/Methods/TokenHandeler';
import {
  getPersonalStocks,
  getUpdatedInfo
} from '../../Helpers/Requests/stocks/stocks';
// import MyStocks from '../../mock/stocks.json';

import Deposits from './balance';
import Chart from './chart';
import Orders from './orders';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  marginTop: {
    marginTop: theme.spacing(8),
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const MyAccount = (props) => {
  const classes = useStyles();
  const encoded = getToken();
  const [token, setToken] = React.useState({});
  const [stocks, setStocks] = React.useState({ stocks: [] });
  const [updatedInfo, setUpdatedInfo] = React.useState({});
  const [personalError, setPersonalError] = React.useState(null);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleStocks = () => {
    setPersonalError(null);
    getPersonalStocks(encoded)
      .then((res) => {
        setStocks({ stocks: res });
      })
      .catch(() => setPersonalError('Problems loading your stocks'));
  };

  const handleGetUpdatedPersonalInfo = () => {
    setUpdatedInfo({});
    getUpdatedInfo(encoded)
      .then((res) => {
        setUpdatedInfo(res);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    if (!encoded) setToken({ exp: 1 });
    else setToken(decodeToken(encoded));
    hasAuth(token, props);
    
    handleStocks();
    handleGetUpdatedPersonalInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded, props]);

  return (
    <Grid item xs={12} md={12} className={classes.cardGrid}>
      <Typography component="h1" variant="h4" className="caps-dad" gutterBottom>
        Hello there, <span className="caps">
        { token.first_name ? token.first_name : '' }
      </span>!
      </Typography>
      <Divider />
      <Typography component="h2" variant="h5" gutterBottom className={classes.marginTop}>
        Overview
      </Typography>
      <Divider />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={classes.paper}>
                <Orders items={stocks.stocks} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits token={updatedInfo} />
              </Paper>
            </Grid>
            { personalError }
            {
              stocks.stocks ? stocks.stocks.map((stock) => (
                <Grid item xs={12} md={12} lg={12} key={`paper-${stock.id}`}>
                  <Paper className={fixedHeightPaper}>
                    <Chart stock={stock} />
                  </Paper>
                </Grid>
              )) :
              null
            }
          </Grid>
        </Container>
    </Grid>
  );
};

export default MyAccount;
