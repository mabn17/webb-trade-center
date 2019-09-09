import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TablePagination from '@material-ui/core/TablePagination';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingCart from '../Cart/Shopping-Cart';
import { makeStyles } from '@material-ui/core/styles';
import {
  getToken,
  decodeToken
} from '../../Helpers/Methods/TokenHandeler';

import Items from '../../mock/allItems.json';
import Clock from './item';

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
  }
}));


const AllItemsPage = (props) => {
  const rowsPerPage = 4;
  const classes = useStyles();
  const encoded = getToken();
  const [token, setToken] = React.useState({});
  const [clocks, setClocks] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [newItem, setNewItem] = React.useState(false);
  const [totalShown, setTotalShown] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [error, setError] = React.useState(0);
  const [lastIndex, setLastIndex] = React.useState(0);

  React.useEffect(() => {
    setClocks(Items.items);

    if (!encoded) {
      setToken({ id: 0, assets: 0, email: '' });
    } else {
      setToken(decodeToken(encoded));
    }
  }, [encoded, props]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const RenderChildren = () => {
    let arr = [];
    let totalHolder = 0;

    clocks.forEach((item, i) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(i);
        totalHolder += 1;
      }
    });

    const first = (page * rowsPerPage || 0);
    const second = ((page * 4) + rowsPerPage);

    const ph = arr.slice(first, second);

    setTotalShown(totalHolder);
    if (!totalHolder) {
      setError('No matching clocks');
      return null;
    }

    setError(null);
    return ph.map((index) => {
      const item = clocks[index];
      setLastIndex(index);

      return (<Clock token={token} item={item} key={item.id} newItem={addNewItem} />);
    });
  }

  const RenderPagination = () => (
    error
      ? null
      : <TablePagination
          component="div"
          count={totalShown}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handlePage}
          ref={this}
        />
  );

  const addNewItem = () => {
    setNewItem(!newItem);
  }

  const handlePage = (e, nextPage) => {
    e.preventDefault();
    setPage(nextPage);
  }

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <ShoppingCart token={token} newItem={newItem} />
      <div className={classes.container} >
        <TextField
          id="standard-full-width"
          label="Search"
          style={{ margin: 8 }}
          helperText="Type the name of the clock"
          fullWidth
          onChange={updateSearch}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="start" ><SearchIcon /></InputAdornment>
          }}
        />
      </div>
      <RenderPagination />
      <b className={classes.center}>{ error }</b>
      <Container className={classes.cardGridTwo} maxWidth="md">
        <Grid container spacing={4}>
          <RenderChildren />
        </Grid>
        { lastIndex === totalShown - 1 ? null : <RenderPagination /> }
      </Container>
    </Container>
  );
};

export default AllItemsPage;
