import React from 'react';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ShopTable from './table';
import { makeStyles } from '@material-ui/core/styles';
import {
  getToken
} from '../../Helpers/Methods/TokenHandeler';
import {
  getUpdatedInfo
} from '../../Helpers/Requests/stocks/stocks';
import {
  socket
} from '../../Helpers/Sockets/Sockets';


import { getAllStocks } from '../../Helpers/Requests/stocks/stocks';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardGridTwo: {
    paddingBottom: theme.spacing(8),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '25px'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


const AllItemsPage = (props) => {
  const classes = useStyles();
  const encoded = getToken();
  const [token, setToken] = React.useState({});
  const [stocks, setStocks] = React.useState([]);
  const [socketNr, setSoketNr] = React.useState(0);

  const handleUpdate = () => {
    socket.on('stock update', (change) => {
      console.log(socketNr);
      setSoketNr((socketNr) => socketNr += 1);
      getAllStocks().then(res => setStocks(res.items));
    });
  };

  React.useEffect(() => {
    handleUpdate();

    // return () => {
    //   socket.off();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getAllStocks().then(res => setStocks(res.items));

    if (!encoded) {
      setToken({ id: 0, assets: 0, email: '' });
    } else {
      handleGetUpdatedPersonalInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encoded, props]);

  const handleGetUpdatedPersonalInfo = () => {
    setToken({});
    getUpdatedInfo(encoded)
      .then((res) => {
        if(typeof res === typeof ' ') {
          setToken({ id: 0, assets: 0,  });
          return;
        }

        setToken(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Link to="/stocks">Change to shopping view</Link>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid item xs={12} md={12} lg={12}>
          <Typography component="h2" variant="h6" gutterBottom>
            Available Stocks
          </Typography>
          <Paper className={classes.paper}>
            <ShopTable items={stocks} token={token}
              updatePersonal={handleGetUpdatedPersonalInfo}
              history={props.history}
              updateMe={socketNr}
            />
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default AllItemsPage;
