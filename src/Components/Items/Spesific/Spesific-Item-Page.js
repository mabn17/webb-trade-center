import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/icons/ArrowLeft'

import Chart from './chart';
import {
  getAllStocks,
  getStockHistory
} from '../../../Helpers/Requests/stocks/stocks';
import {
  socket
} from '../../../Helpers/Sockets/Sockets';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  link: {
    display: "block",
    color: 'rgba(5, 5, 5, 0.87)',
  },
  linkItems: {
    display: "block",
    color: '#3f51b5',
  },
  black: {
    position: 'relative',
    top: '7px',
    color: '#3f51b5'
  }
}));

const CurrentItem = (props) => {
  const classes = useStyles();
  const [product, setProduct] = React.useState({ });
  const [err, setErr] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  const handleUpdate = () => {
    socket.on('stock update', (change) => {
      handleGetCurrentItem();
    });
  };

  // const scrollToTop = () => {
  //   const progress = document.documentElement.scrollTop || document.body.scrollTop;
  //   if (progress > 10) {
  //     window.requestAnimationFrame(scrollToTop);
  //     window.scrollTo(0, progress - progress / 20);
  //   }
  // };

  React.useEffect(() => {
    handleUpdate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    handleGetCurrentItem();
    // scrollToTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match]);

  const handleGetCurrentItem = () => {
    setErr('');
    setProduct({  });

    const name = props.match.params.name || '';
    getAllStocks({}).then((res) => {
      if (typeof res === typeof '   ') {
        setErr(res);
        return;
      }
      setItems(res.items);

      let element = {};

      for (let index = 0; index < res.items.length; index++) {
        const element = res.items[index];
        // eslint-disable-next-line no-cond-assign
        if (element.name === name) {
          setProduct(element);
          break;
        }
      }

      if (element === {}) return;

      getStockHistory().then((resp) => {
        if (typeof resp === typeof '   ') {
          setErr(resp);
          return;
        }
  
        const holder = resp.filter((stock) => stock.item_name === name);

        if (holder[0]) {
          holder.push({ item_name: holder[0].item_name, old_price: holder[0].price, when_time: 'now' });
        } else {
          holder.push({ item_name: product.name, old_price: product.price, when_time: 'now' })
        }
  
        setHistory(holder);
      }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

  return (
    <>
      <Grid container spacing={5} className={classes.mainGrid}>
        {/* Main content */}
        <Grid item xs={12} md={8}>
          <input type="hidden" autoFocus value="" />
          <Typography variant="h6" gutterBottom>
            { !product.name ? 'No matching stock' : `${product.name} - Overview` }
          </Typography>
          <Divider />
          { err }
          { history.length !== 0 ? <Chart history={history} /> : null }
        </Grid>
        {/* End main content */}
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Link to="/shop" className={classes.link}>
            <Icon className={classes.black} />
            Back to the shop
          </Link>
          { product.description ?
            <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography>
                { product.description }
              </Typography>
            </Paper>
          : null }
          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
            Other Stocks
          </Typography>
          <Typography variant="body1">
            {items.map(stock => (
              stock.name !== product.name ?
                <Link
                  className={classes.linkItems}
                  to={`/stocks/${stock.name}`}
                  key={stock.name}
                >
                  {stock.name}
                </Link>
              : null
            ))}
          </Typography>
        </Grid>
        {/* End sidebar */}
      </Grid>
    </>
  );
}

export default CurrentItem;
