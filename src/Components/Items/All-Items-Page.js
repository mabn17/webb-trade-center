import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

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
}));


const MyAccount = (props) => {
  const classes = useStyles();
  const encoded = getToken();
  const [token, setToken] = React.useState({});
  const [clocks, setClocks] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setClocks(Items.items);

    if (!encoded) {
      setToken({ id: 0, assets: 0, email: '' });
    } else {
      setToken(decodeToken(encoded));
    }
  }, [encoded, props]);

  const updateSearch = (e) => (setSearch(e.target.value));

  const RenderChildren = () => {
    let arr = [];

    clocks.forEach((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        arr.push(<Clock token={token} item={item} key={item.id} />);
      }
    });

    return arr.length === 0 ? (<b>No matching clocks.</b>) : clocks.map((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return <Clock token={token} item={item} key={item.id} />;
      }
    });
  }

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <form className={classes.container} noValidate autoComplete="off">
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
      </form>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          <RenderChildren />
        </Grid>
      </Container>
    </Container>
  );
};

export default MyAccount;
